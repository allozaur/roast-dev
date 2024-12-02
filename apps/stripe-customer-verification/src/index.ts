import Stripe from 'stripe';

interface Env {
	STRIPE_SECRET_KEY: string;
}

interface RequestBody {
	email: string;
}

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

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		if (request.method === 'OPTIONS') {
			return handleOptions(request);
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
					headers: { 'Content-Type': 'application/json', ...corsHeaders },
				});
			}

			const stripe = new Stripe(env.STRIPE_SECRET_KEY);

			const customer = await stripe.customers.list({
				email: body.email,
				limit: 1,
			});

			if (customer.data.length === 0) {
				const customer = await stripe.customers.create({
					email: body.email,
				});

				return new Response(JSON.stringify({ success: true, customerId: customer.id }), {
					headers: {
						'Content-Type': 'application/json',
						...corsHeaders,
					},
				});
			} else {
				return new Response(JSON.stringify({ success: true, customerId: customer.data[0].id }), {
					headers: {
						'Content-Type': 'application/json',
						...corsHeaders,
					},
				});
			}
			// const { data } = await stripe.charges.list({
			// 	limit: 100,
			// });

			// const charge = data.find((charge) => charge.receipt_email === body.email && charge.paid);

			// if (charge) {
			// 	return new Response(JSON.stringify({ success: true, chargeId: charge.id }), {
			// 		headers: {
			// 			'Content-Type': 'application/json',
			// 			...corsHeaders,
			// 		},
			// 	});
			// } else {
			// 	return new Response(JSON.stringify({ success: false, message: 'No charge found' }), {
			// 		headers: {
			// 			'Content-Type': 'application/json',
			// 			...corsHeaders,
			// 		},
			// 	});
			// }
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
						...corsHeaders,
					},
				},
			);
		}
	},
};
