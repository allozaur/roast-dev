import { writable, type Writable } from 'svelte/store';

interface RoastEntry {
	date: string;
	id: string;
	messages: { role: string; content: string }[];
	prTitle: string;
	prUrl: string;
}

const roasts: Writable<RoastEntry[]> = writable([]);

export default roasts;
