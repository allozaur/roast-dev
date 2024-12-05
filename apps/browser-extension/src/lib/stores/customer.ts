import type Stripe from 'stripe';
import { writable, type Writable } from 'svelte/store';

const customer: Writable<Stripe.Customer | null> = writable(null);

export default customer;
