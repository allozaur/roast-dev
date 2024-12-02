import { PUBLIC_STRIPE_PUBLISHABLE_KEY } from '$env/static/public';
import Stripe from 'stripe';

const stripe = new Stripe(PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default stripe;
