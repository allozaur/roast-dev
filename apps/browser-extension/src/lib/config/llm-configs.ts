import type { LLMConfig, LLMProvider } from '$lib/types';
import availableModels from '$lib/config/available-models';

const llmConfigs: Record<LLMProvider, LLMConfig> = {
	[availableModels['claude-3-5-sonnet']]: {
		endpoint: 'https://api.anthropic.com/v1/messages',
		headers: (apiKey) => ({
			'Content-Type': 'application/json',
			'x-api-key': apiKey,
			'anthropic-version': '2023-06-01',
			'anthropic-dangerous-direct-browser-access': 'true'
		}),
		buildBody: (messages) => ({
			max_tokens: 4096,
			messages,
			model: availableModels['claude-3-5-sonnet']
		}),
		extractResponse: (data) => {
			return { content: data.content?.[0].text, role: data?.role };
		}
	},

	[availableModels['gpt-4o']]: {
		endpoint: 'https://api.openai.com/v1/chat/completions',
		headers: (apiKey) => ({
			'Content-Type': 'application/json',
			Authorization: `Bearer ${apiKey}`
		}),
		buildBody: (messages) => ({
			max_tokens: 4000,
			messages,
			model: availableModels['gpt-4o'],
			temperature: 0.7
		}),
		extractResponse: (data) => {
			return {
				content: data?.choices?.[0]?.message.content ?? '',
				role: data?.choices?.[0]?.message.role
			};
		}
	},

	[availableModels['gemini-1.5-pro']]: {
		endpoint: `https://generativelanguage.googleapis.com/v1beta/openai/chat/completions`,
		headers: (apiKey) => ({
			'Content-Type': 'application/json',
			Authorization: `Bearer ${apiKey}`
		}),
		buildBody: (messages) => ({
			max_tokens: 4000,
			messages,
			model: availableModels['gemini-1.5-pro'],
			temperature: 0.7
		}),
		extractResponse: (data) => {
			return {
				content: data?.choices?.[0]?.message.content ?? '',
				role: data?.choices?.[0]?.message.role
			};
		}
	}
};

export default llmConfigs;
