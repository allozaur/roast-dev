import Stripe from 'stripe';

interface Env {
	STRIPE_SECRET_KEY: string;
}

interface RequestBody {
	email: string;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		if (request.method !== 'POST') {
			return new Response('Method not allowed', { status: 405 });
		}

		try {
			const body: RequestBody = await request.json();

			if (!body.email) {
				return new Response('Email is required', {
					status: 400,
					headers: { 'Content-Type': 'application/json' },
				});
			}

			const stripe = new Stripe(env.STRIPE_SECRET_KEY);

			// First, list all payments using payment_intents.list()
			const paymentIntents = await stripe.paymentIntents.list({
				limit: 100,
			});

			const purchases = [
				...paymentIntents.data.map((payment) => ({
					id: payment.id,
					type: 'payment_intent',
					amount: payment.amount / 100,
					currency: payment.currency,
					status: payment.status,
					created: new Date(payment.created * 1000).toISOString(),
					description: payment.description,
					receipt_email: payment.receipt_email,
					metadata: payment.metadata,
				})),
			];

			// Sort purchases by date (newest first)
			purchases.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());

			if (purchases.length === 0) {
				return new Response(
					JSON.stringify({
						success: false,
						message: 'No purchases found for this email',
						purchases: [],
					}),
					{
						status: 404,
						headers: { 'Content-Type': 'application/json' },
					},
				);
			}

			return new Response(
				JSON.stringify({
					success: true,
					email: body.email,
					total_purchases: purchases.length,
					total_amount: purchases.reduce((sum, p) => sum + p.amount, 0),
					purchases,
				}),
				{
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*', // Configure as needed
					},
				},
			);
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
					headers: { 'Content-Type': 'application/json' },
				},
			);
		}
	},
};
