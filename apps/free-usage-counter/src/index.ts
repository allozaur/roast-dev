interface Env {
	ROAST_FREE_USAGE_COUNTER: KVNamespace;
}

interface ResponseBody {
	message: string;
}

const MAX_MONTHLY_ROASTS = 10;

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
	// Create a unique monthly identifier by combining IP with current month
	const now = new Date();
	const month = `${now.getFullYear()}-${now.getMonth() + 1}`;
	const data = `${ip}-${month}-roast-salt`;

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
			const clientIp = request.headers.get('cf-connecting-ip') || request.headers.get('x-real-ip') || '0.0.0.0';
			const key = await generateClientId(clientIp);
			const currentCount = parseInt((await env.ROAST_FREE_USAGE_COUNTER.get(key)) || '0');

			if (currentCount >= MAX_MONTHLY_ROASTS) {
				const response: ResponseBody = {
					message: 'Limit reached',
				};
				return new Response(JSON.stringify(response), {
					status: 423,
					headers: {
						'Content-Type': 'application/json',
						...corsHeaders,
					},
				});
			}

			const expirationTtl = 60 * 60 * 24 * 30;

			await env.ROAST_FREE_USAGE_COUNTER.put(key, (currentCount + 1).toString(), {
				expirationTtl,
			});

			const response: ResponseBody = {
				message: 'Entry added',
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
