import { get } from 'svelte/store';
import llmApiKey from '$lib/stores/llm-api-key';
import llmChoice from '$lib/stores/llm-choice';
import llmConfigs from '$lib/config/llm-configs';
import type { LLMProvider } from '$lib/types';

export default async function generateRoast(
	messages: { role?: string; content?: string }[]
): Promise<{ content?: string; role?: string }> {
	const apiKey = get(llmApiKey);
	const model = get(llmChoice) as LLMProvider;

	if (!apiKey) {
		throw new Error(`Please enter your ${model} API key`);
	}

	if (!llmConfigs[model]) {
		throw new Error('Invalid LLM model selected');
	}

	const config = llmConfigs[model];
	let endpoint = config.endpoint;

	if (model === 'gemini-1.5-pro') {
		endpoint = `${endpoint}?key=${apiKey}`;
	}

	try {
		const response = await fetch(endpoint, {
			method: 'POST',
			headers: config.headers(apiKey),
			body: JSON.stringify(config.buildBody(messages))
		});

		if (!response.ok) {
			const errorData = await response.text();

			console.error('API Error:', errorData);

			if (response.status === 401) {
				throw new Error(`Invalid ${model} API key. Please check your API key and try again.`);
			}

			throw new Error(`${model} API request failed: ${errorData}`);
		}

		const data = await response.json();

		return config.extractResponse(data);
	} catch (error) {
		console.error('Request Error:', error);

		if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
			throw new Error(`Failed to connect to ${model} API. Please check your internet connection.`);
		}

		throw error;
	}
}
