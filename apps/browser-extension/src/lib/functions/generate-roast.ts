import { get } from 'svelte/store';
import llmApiKey from '$lib/stores/llm-api-key';
import llmChoice from '$lib/stores/llm-choice';
import initialPromptClaude from '$lib/config/initial-prompt-claude';
import initialPromptGemini from '$lib/config/initial-prompt-gemini';
import initialPromptGpt from '$lib/config/initial-prompt-gpt';
import type { LLMConfig } from '$lib/types/llm-config';

type LLMProvider = 'claude-3.5-sonnet' | 'gpt-4o' | 'gemini-1.5-pro';

const llmConfigs: Record<LLMProvider, LLMConfig> = {
	'claude-3.5-sonnet': {
		endpoint: 'https://api.anthropic.com/v1/messages',
		headers: (apiKey) => ({
			'Content-Type': 'application/json',
			'x-api-key': apiKey,
			'anthropic-version': '2023-06-01',
			'anthropic-dangerous-direct-browser-access': 'true'
		}),
		buildBody: (prompt, code) => ({
			model: 'claude-3-5-sonnet-20241022',
			max_tokens: 4096,
			messages: [
				{
					role: 'user',
					content: `${prompt}\n\nHere's the code:\n\n${code}`
				}
			]
		}),
		extractResponse: (data) => data?.content?.[0].text ?? ''
	},
	'gpt-4o': {
		endpoint: 'https://api.openai.com/v1/chat/completions',
		headers: (apiKey) => ({
			'Content-Type': 'application/json',
			Authorization: `Bearer ${apiKey}`
		}),
		buildBody: (prompt, code) => ({
			model: 'gpt-4o',
			messages: [
				{
					role: 'user',
					content: `${prompt}\n\nHere's the code:\n\n${code}`
				}
			],
			temperature: 1,
			max_tokens: 4000
		}),
		extractResponse: (data) => data?.choices?.[0]?.message.content ?? ''
	},
	'gemini-1.5-pro': {
		endpoint:
			'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent',
		headers: () => ({
			'Content-Type': 'application/json'
		}),
		buildBody: (prompt, code) => ({
			contents: [
				{
					parts: [
						{
							text: `${prompt}\n\nHere's the code:\n\n${code}`
						}
					]
				}
			],
			generationConfig: {
				temperature: 1,
				topK: 40,
				topP: 0.95,
				maxOutputTokens: 4000
			}
		}),
		extractResponse: (data) => {
			const text = data.candidates?.[0]?.content.parts?.[0].text ?? '';
			// Gemini sometimes includes unnecessary markdown code block syntax
			return text.replace(/```[a-z]*\n?|\n?```/g, '');
		}
	}
};

export default async function generateRoast(diffText: string): Promise<string> {
	const apiKey = get(llmApiKey);
	const provider = get(llmChoice) as LLMProvider;
	console.log('provider', provider);

	if (!apiKey) {
		throw new Error(`Please enter your ${provider} API key`);
	}

	if (!llmConfigs[provider]) {
		throw new Error('Invalid LLM provider selected');
	}

	const config = llmConfigs[provider];
	let endpoint = config.endpoint;

	if (provider === 'gemini-1.5-pro') {
		endpoint = `${endpoint}?key=${apiKey}`;
	}

	const initialPrompt =
		provider === 'gpt-4o'
			? initialPromptGpt
			: provider === 'gemini-1.5-pro'
				? initialPromptGemini
				: initialPromptClaude;

	try {
		const response = await fetch(endpoint, {
			method: 'POST',
			headers: config.headers(apiKey),
			body: JSON.stringify(config.buildBody(initialPrompt, diffText))
		});

		if (!response.ok) {
			const errorData = await response.text();

			console.error('API Error:', errorData);

			if (response.status === 401) {
				throw new Error(`Invalid ${provider} API key. Please check your API key and try again.`);
			}

			throw new Error(`${provider} API request failed: ${errorData}`);
		}

		const data = await response.json();

		return config.extractResponse(data);
	} catch (error) {
		console.error('Request Error:', error);

		// Enhance error message for common issues
		if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
			throw new Error(
				`Failed to connect to ${provider} API. Please check your internet connection.`
			);
		}

		throw error;
	}
}
