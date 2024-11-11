import { writable, type Writable } from 'svelte/store';

const llmChoice: Writable<string | null> = writable('claude-3.5-sonnet');

export default llmChoice;
