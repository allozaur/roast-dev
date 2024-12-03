import Stripe from 'stripe';

interface Env {
	CORS_ORIGIN: string;
	STRIPE_SECRET_KEY: string;
}

interface RequestBody {
	email: string;
}

const corsHeaders = (env: Env) => ({
	'Access-Control-Allow-Origin': env.CORS_ORIGIN,
	'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
	'Access-Control-Max-Age': '86400',
});

async function handleOptions(request: Request, env: Env): Promise<Response> {
	if (
		// @ts-ignore
		request.headers.get('Origin') &&
		// @ts-ignore
		request.headers.get('Access-Control-Request-Method') &&
		// @ts-ignore
		request.headers.get('Access-Control-Request-Headers')
	) {
		return new Response(null, {
			headers: {
				...corsHeaders(env),
				// @ts-ignore
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

			if (!body.email) {
				return new Response('Email is required', {
					status: 400,
					headers: { 'Content-Type': 'application/json', ...corsHeaders(env) },
				});
			}

			const stripe = new Stripe(env.STRIPE_SECRET_KEY);

			let customer: Stripe.Customer | undefined;

			const customerRes = await stripe.customers.list({
				email: body.email,
				limit: 1,
			});

			if (!customerRes?.data.length) {
				customer = await stripe.customers.create({
					email: body.email,
				});
			} else {
				customer = customerRes.data[0];
			}

			const charges = await stripe.charges.list({
				customer: customer.id,
				limit: 100,
			});

			const invoices = await stripe.invoices.list({
				customer: customer.id,
				limit: 100,
			});

			const products = [];

			for (const invoice of invoices.data) {
				const invoiceItems = await stripe.invoiceItems.list({
					invoice: invoice.id,
				});

				for (const item of invoiceItems.data) {
					products.push({
						description: item.description,
						amount: item.amount,
						currency: item.currency,
					});
				}
			}

			return new Response(JSON.stringify({ success: true, customer, charges, products }), {
				headers: {
					'Content-Type': 'application/json',
					...corsHeaders(env),
				},
			});
		} catch (error) {
			console.error('Error:', error);

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
};
