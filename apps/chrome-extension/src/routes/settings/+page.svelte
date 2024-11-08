<script>
	import { Button } from '@roast-dev/ui';

	let llmChoice = $state('claude-3.5-sonnet');
</script>

<form action="">
	<fieldset>
		<legend>LLM Preferences</legend>

		<select name="llm-choice" bind:value={llmChoice}>
			<option value="claude-3.5-sonnet"> Claude 3.5 Sonnet </option>

			<option value="gpt-4o"> GPT-4o </option>

			<option value="gemini"> Gemini </option>
		</select>

		<label>
			{llmChoice === 'claude-3.5-sonnet'
				? 'Anthropic'
				: llmChoice === 'gemini'
					? 'Google'
					: 'OpenAI'}
			API Key

			<input type="text" name="api_key" placeholder="Add your own API key" />
		</label>
	</fieldset>

	<Button type="submit">Save preferences</Button>
</form>

<form action="" id="license-">
	<fieldset>
		<legend>Your License</legend>

		<label>
			Your Email Address

			<input
				type="text"
				name="license_email"
				placeholder="Add email that was used during checkout"
			/>
		</label>
	</fieldset>

	<Button type="submit">Save license</Button>
</form>

<style>
	form {
		display: grid;
		gap: 1.25rem;
	}

	fieldset {
		display: grid;
		gap: 1rem;
	}

	legend {
		font-size: 1.25rem;
		font-weight: 500;
		margin-bottom: 0.5rem;
	}

	label {
		display: grid;
		gap: 0.5rem;
		font-size: 0.875rem;

		input[type='text'] {
			font-size: 1rem;
			padding: 0.5rem;

			&::placeholder {
				color: #aaa;
			}
		}
	}
</style>
