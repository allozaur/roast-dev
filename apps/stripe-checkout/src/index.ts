import Stripe from 'stripe';

interface Env {
	STRIPE_SECRET_KEY: string;
	CORS_ORIGIN: string;
}

interface RequestBody {
	customerId: string;
	priceId: string;
	promotionCode?: string;
}

const corsHeaders = (env: Env) => ({
	'Access-Control-Allow-Origin': env.CORS_ORIGIN,
	'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
	'Access-Control-Max-Age': '86400',
});

async function handleOptions(request: Request, env: Env): Promise<Response> {
	const headers = new Headers(request.headers);

	if (headers.get('Origin') && headers.get('Access-Control-Request-Method') && headers.get('Access-Control-Request-Headers')) {
		return new Response(null, {
			headers: {
				...corsHeaders(env),
				'Access-Control-Allow-Headers': headers.get('Access-Control-Request-Headers')!,
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

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		if (request.method === 'OPTIONS') {
			return handleOptions(request, env);
		}

		if (request.method !== 'POST') {
			return new Response('Method not allowed', {
				status: 405,
				headers: corsHeaders,
			});
		}

		try {
			const body: RequestBody = await request.json();

			const requiredFields = ['customerId', 'priceId'];
			for (const field of requiredFields) {
				if (!body[field as keyof RequestBody]) {
					return new Response(`${field} is required`, {
						status: 400,
						headers: { 'Content-Type': 'application/json', ...corsHeaders(env) },
					});
				}
			}

			const stripe = new Stripe(env.STRIPE_SECRET_KEY);

			const { url } = await stripe.checkout.sessions.create({
				customer: body.customerId,
				discounts: body.promotionCode ? [{ promotion_code: body.promotionCode }] : undefined,
				success_url: 'https://roast.dev/checkout-success',
				line_items: [
					{
						price: body.priceId,
						quantity: 1,
					},
				],
				mode: 'payment',
			});

			return new Response(
				JSON.stringify({
					success: true,
					url,
				}),
				{
					status: 200,
					headers: {
						'Content-Type': 'application/json',
						...corsHeaders(env),
					},
				},
			);
		} catch (error) {
			return new Response(
				JSON.stringify({
					success: false,
					message: 'Internal server error',
					error: error instanceof Error ? error.message : 'Unknown error',
				}),
				{
					status: 500,
					headers: {
						'Content-Type': 'application/json',
						...corsHeaders(env),
					},
				},
			);
		}
	},
} satisfies ExportedHandler<Env>;
