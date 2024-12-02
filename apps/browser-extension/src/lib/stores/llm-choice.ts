import availableModels from '$lib/config/available-models';
import { writable, type Writable } from 'svelte/store';

const llmChoice: Writable<string | null> = writable(availableModels['claude-3.5-sonnet']);

export default llmChoice;
