import availableModels from '$lib/config/available-models';

export type LLMProvider =
	| (typeof availableModels)['claude-3-5-sonnet']
	| (typeof availableModels)['gpt-4o']
	| (typeof availableModels)['gemini-1.5-pro'];
