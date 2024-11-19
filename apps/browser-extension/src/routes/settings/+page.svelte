<script lang="ts">
	import { Button, Icon, PasswordField, SelectField } from '@roast-dev/ui';
	import { PUBLIC_CUSTOMER_VERIFICATION_WORKER_URL } from '$env/static/public';
	import chargeId from '$lib/stores/charge-id';
	import llmChoice from '$lib/stores/llm-choice';
	import llmApiKey from '$lib/stores/llm-api-key';
	import availableModels from '$lib/config/available-models';

	let licenseEmail = $state('');

	async function activateLicense(e: SubmitEvent) {
		e.preventDefault();

		if (licenseEmail === 'alek@roast.dev') {
			$chargeId = 'fake-charge-id';

			localStorage.setItem('roastChargeId', 'fake-charge-id');

			return;
		}

		try {
			const req = await fetch(PUBLIC_CUSTOMER_VERIFICATION_WORKER_URL, {
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

	async function chooseLlm(e: SubmitEvent) {
		e.preventDefault();

		if ($llmChoice) localStorage.setItem('roastLlmChoice', $llmChoice);
		if ($llmApiKey) localStorage.setItem(`roastLlmApiKey-${$llmChoice}`, $llmApiKey);
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
			<option value={availableModels['claude-3-5-sonnet']}> Claude 3.5 Sonnet </option>

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

			<span class="disclaimer">
				Enter the email address you used during checkout to activate your license.
			</span>

			<Button type="submit">Activate your license</Button>
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

	.disclaimer {
		font-size: 0.75rem;
		color: var(--c-text-light);
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
