<script lang="ts">
	import { Button, Icon, PasswordField, SelectField } from '@roast-dev/ui';
	import { PUBLIC_STRIPE_CUSTOMER_VERIFICATION_WORKER_URL } from '$env/static/public';
	import { onMount } from 'svelte';
	import chargeId from '$lib/stores/charge-id';
	import llmChoice from '$lib/stores/llm-choice';
	import llmApiKey from '$lib/stores/llm-api-key';

	let licenseEmail = $state('');

	async function activateLicense(e: SubmitEvent) {
		e.preventDefault();

		try {
			const req = await fetch(PUBLIC_STRIPE_CUSTOMER_VERIFICATION_WORKER_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email: licenseEmail })
			});

			const { chargeId: resChargeId, success } = await req.json();

			if (success && resChargeId) {
				$chargeId = resChargeId;

				localStorage.setItem('roastChargeId', resChargeId);
			} else {
				alert('License activation failed. Please try again.');
			}
		} catch (error) {
			console.error(error);
		}
	}

	async function chooseLanguageModel(e: SubmitEvent) {
		e.preventDefault();

		if ($llmChoice) localStorage.setItem('roastLlmChoice', $llmChoice);
		if ($llmApiKey) localStorage.setItem('roastLlmApiKey', $llmApiKey);
	}

	onMount(() => {
		$chargeId = localStorage.getItem('roastChargeId');
		$llmApiKey = localStorage.getItem('roastLlmApiKey');
		$llmChoice = localStorage.getItem('roastLlmChoice') ?? 'claude-3.5-sonnet';
	});
</script>

<form onsubmit={chooseLanguageModel}>
	<fieldset>
		<legend>Language Model</legend>

		<SelectField id="llm-choice" label="Selected model" name="llm-choice" bind:value={$llmChoice}>
			<option value="claude-3.5-sonnet"> Claude 3.5 Sonnet </option>

			<option value="gpt-4o"> GPT-4o </option>

			<option value="gemini-1.5"> Gemini 1.5 </option>
		</SelectField>

		<div class="api-key-field">
			<PasswordField
				name="api_key"
				label="{$llmChoice === 'claude-3.5-sonnet'
					? 'Anthropic'
					: $llmChoice === 'gemini-1.5'
						? 'Google'
						: 'OpenAI'}
				API Key"
				placeholder="Enter your API key here"
				bind:value={$llmApiKey}
			/>

			<Button --background="var(--c-success)" size="sm" type="submit">Save key</Button>

			<span>
				Your API key is stored locally and only used to communicate directly with the LLM’s API
				endpoint
			</span>
		</div>
	</fieldset>
</form>

<form id="check-license-form" onsubmit={activateLicense}>
	<fieldset>
		<legend>Billing & License</legend>

		{#if $chargeId}
			<div class="active-license">
				<span>
					<Icon name="check-circle" --stroke="var(--c-success)" --size="1.5rem" />

					Your license is active!. You have full access to Roast.
				</span>

				<Button
					size="sm"
					onClick={() => {
						$chargeId = null;
						localStorage.removeItem('roastChargeId');
					}}
				>
					Deactivate license
				</Button>
			</div>
		{:else}
			<label>
				Your Email Address

				<input
					type="text"
					name="license_email"
					placeholder="Enter email address that you used for purchase"
					bind:value={licenseEmail}
				/>
			</label>

			<Button type="submit">Save license</Button>
		{/if}
	</fieldset>
</form>

<style>
	form {
		display: grid;
		gap: 1.25rem;
	}

	:is(fieldset, legend) {
		padding: 0;
		margin: 0;
	}

	fieldset {
		display: grid;
		gap: 1rem;
		border: 0;
	}

	legend {
		font-size: 1.25rem;
		font-weight: 500;
		margin-bottom: 1rem;
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

	.api-key-field {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 0.5rem;
		align-items: end;

		span {
			grid-column: 1 / -1;
		}
	}

	.active-license {
		align-items: center;
		display: flex;
		justify-content: space-between;
		padding: 1rem;
		border: 2px solid var(--c-text-light);
		border-radius: 1rem;

		span {
			font-size: 1.125rem;
			font-weight: 500;
			display: inline-flex;
			align-items: center;
			gap: 0.625rem;
		}
	}
</style>
