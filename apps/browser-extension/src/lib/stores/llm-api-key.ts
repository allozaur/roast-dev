import { writable, type Writable } from 'svelte/store';

const llmApiKey: Writable<string | null> = writable(null);

export default llmApiKey;
