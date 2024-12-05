<script lang="ts">
	import { Button, PasswordField, SelectField } from '@roast-dev/ui';
	import llmChoice from '$lib/stores/llm-choice';
	import llmApiKey from '$lib/stores/llm-api-key';
	import availableModels from '$lib/config/available-models';

	async function chooseLlm(e: SubmitEvent) {
		e.preventDefault();

		if (!$llmChoice) {
			alert('Please select a language model');

			return;
		}

		if (!$llmApiKey) {
			alert('Please enter your API key');

			return;
		}

		if ($llmChoice) localStorage.setItem('roastLlmChoice', $llmChoice);
		if ($llmApiKey) localStorage.setItem(`roastLlmApiKey-${$llmChoice}`, $llmApiKey);

		alert('API key saved');
	}

	function handleLlmChoiceChange(e: Event) {
		const target = e.target as HTMLSelectElement;

		$llmChoice = target.value;
		$llmApiKey = localStorage.getItem(`roastLlmApiKey-${$llmChoice}`) || '';
	}
</script>

<form onsubmit={chooseLlm}>
	<fieldset>
		<legend>Language Model</legend>

		<SelectField
			id="llm-choice"
			label="Selected model"
			name="llm-choice"
			bind:value={$llmChoice}
			onChange={handleLlmChoiceChange}
		>
			<option value={availableModels['claude-3.5-sonnet']}> Claude 3.5 Sonnet </option>

			<option value={availableModels['gpt-4o']}> GPT-4o </option>

			<option value={availableModels['gemini-1.5-pro']}> Gemini 1.5 Pro </option>
		</SelectField>

		<div class="api-key-field">
			<PasswordField
				name="api_key"
				label="Your {$llmChoice === 'gpt-4o'
					? 'OpenAI'
					: $llmChoice === 'gemini-1.5-pro'
						? 'Gemini'
						: 'Claude'} API Key"
				placeholder="Enter your API key here"
				bind:value={$llmApiKey}
			/>

			<Button --background="var(--c-success)" size="sm" type="submit">Save key</Button>

			<span class="disclaimer">
				Your API key is stored locally and only used to communicate directly with the LLM’s API
				endpoint
			</span>
		</div>
	</fieldset>
</form>

<style>
	fieldset {
		display: grid;
		gap: 1rem;
		padding: 1rem;
	}

	.api-key-field {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 0.5rem 1rem;
		flex-wrap: wrap;
		align-items: end;

		.disclaimer {
			width: 100%;
			font-size: 0.75rem;
			color: var(--c-text-light);
		}
	}
</style>
