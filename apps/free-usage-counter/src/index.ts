interface Env {
	ROAST_FREE_USAGE_COUNTER: KVNamespace;
}

interface ResponseBody {
	message: string;
	status: number;
}

const MAX_DAILY_ROASTS = 5;

const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
	'Access-Control-Max-Age': '86400',
};

async function handleOptions(request: Request): Promise<Response> {
	if (
		request.headers.get('Origin') !== null &&
		request.headers.get('Access-Control-Request-Method') !== null &&
		request.headers.get('Access-Control-Request-Headers') !== null
	) {
		return new Response(null, {
			headers: {
				...corsHeaders,
				'Access-Control-Allow-Headers': request.headers.get('Access-Control-Request-Headers')!,
			},
		});
	} else {
		return new Response(null, {
			headers: {
				Allow: 'GET, HEAD, POST, OPTIONS',
			},
		});
	}
}

async function generateClientId(ip: string): Promise<string> {
	// Create a unique daily identifier by combining IP with current date
	const today = new Date().toISOString().split('T')[0];
	const data = `${ip}-${today}-roast-salt`;

	// Convert the string to an ArrayBuffer
	const encoder = new TextEncoder();
	const buffer = encoder.encode(data);

	// Generate SHA-256 hash
	const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);

	// Convert to hex string
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

	return hashHex;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		if (request.method === 'OPTIONS') {
			return handleOptions(request);
		}

		if (request.method !== 'GET') {
			return new Response(
				JSON.stringify({
					message: 'Method not allowed',
					status: 405,
				}),
				{
					status: 405,
					headers: {
						'Content-Type': 'application/json',
						...corsHeaders,
					},
				},
			);
		}

		try {
			// Get client IP from Cloudflare headers
			const clientIp = request.headers.get('cf-connecting-ip') || request.headers.get('x-real-ip') || '0.0.0.0';

			// Generate a unique client ID based on IP and current date
			const key = await generateClientId(clientIp);

			const currentCount = parseInt((await env.ROAST_FREE_USAGE_COUNTER.get(key)) || '0');

			if (currentCount >= MAX_DAILY_ROASTS) {
				const response: ResponseBody = {
					message: 'Limit reached',
					status: 423,
				};
				return new Response(JSON.stringify(response), {
					status: 423,
					headers: {
						'Content-Type': 'application/json',
						...corsHeaders,
					},
				});
			}

			// Set expiration to end of current UTC day
			const midnight = new Date();
			midnight.setUTCHours(24, 0, 0, 0);
			const expirationTtl = Math.max(1, Math.floor((midnight.getTime() - Date.now()) / 1000));

			await env.ROAST_FREE_USAGE_COUNTER.put(key, (currentCount + 1).toString(), {
				expirationTtl,
			});

			const response: ResponseBody = {
				message: 'Entry added',
				status: 201,
			};

			return new Response(JSON.stringify(response), {
				status: 201,
				headers: {
					'Content-Type': 'application/json',
					...corsHeaders,
				},
			});
		} catch (error) {
			console.error('Error processing request:', error);
			return new Response(
				JSON.stringify({
					message: 'Internal server error',
					status: 500,
					error: error instanceof Error ? error.message : 'Unknown error',
				}),
				{
					status: 500,
					headers: {
						'Content-Type': 'application/json',
						...corsHeaders,
					},
				},
			);
		}
	},
};
