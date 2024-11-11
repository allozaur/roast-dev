import { writable, type Writable } from 'svelte/store';

const chargeId: Writable<string | null> = writable(null);

export default chargeId;
