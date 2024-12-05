import { writable, type Writable } from 'svelte/store';

const hasActiveLicense: Writable<boolean> = writable(false);

export default hasActiveLicense;
