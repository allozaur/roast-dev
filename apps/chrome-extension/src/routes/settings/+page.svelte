<script lang="ts">
	import { Button } from '@roast-dev/ui';
	import { PUBLIC_STRIPE_CUSTOMER_VERIFICATION_WORKER_URL } from '$env/static/public';
	import { onMount } from 'svelte';
	import chargeId from '$lib/stores/charge-id';

	let licenseEmail = $state('');
	let llmChoice = $state('claude-3.5-sonnet');

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

	onMount(() => {
		$chargeId = localStorage.getItem('roastChargeId');
	});
</script>

<form action="">
	<fieldset>
		<legend>Language Model</legend>

		<label>
			Selected model

			<select name="llm-choice" bind:value={llmChoice}>
				<option value="claude-3.5-sonnet"> Claude 3.5 Sonnet </option>

				<option value="gpt-4o"> GPT-4o </option>

				<option value="gemini"> Gemini </option>
			</select>
		</label>

		<label class="api-key-field">
			<span>
				{llmChoice === 'claude-3.5-sonnet'
					? 'Anthropic'
					: llmChoice === 'gemini'
						? 'Google'
						: 'OpenAI'}
				API Key
			</span>

			<input type="text" name="api_key" placeholder="Enter your API key here" />

			<Button --background="var(--c-success)" size="sm" type="submit">Save key</Button>

			<span>
				Your API key is stored locally and only used to communicate directly with the LLM’s API
				endpoint
			</span>
		</label>
	</fieldset>
</form>

{#if $chargeId}
	<div class="active-license">
		<p>Your license is active!. You have full access to Roast.</p>

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
	<form id="check-license-form" onsubmit={activateLicense}>
		<fieldset>
			<legend>Unlock Full Access</legend>

			<label>
				Your Email Address

				<input
					type="text"
					name="license_email"
					placeholder="Enter email address that you used for purchase"
					bind:value={licenseEmail}
				/>
			</label>
		</fieldset>

		<Button type="submit">Save license</Button>
	</form>
{/if}

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

	.api-key-field {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 0.5rem;
		align-items: center;

		span {
			grid-column: 1 / -1;
		}
	}

	.active-license {
		align-items: center;
		display: flex;
		justify-content: space-between;
		padding: 1.5rem;
		border: 2px solid var(--c-success);
		border-radius: 1rem;
	}
</style>
