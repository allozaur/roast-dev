<script lang="ts">
	import { page } from '$app/stores';
	import availableModels from '$lib/config/available-models';
	import chargeId from '$lib/stores/charge-id';
	import llmApiKey from '$lib/stores/llm-api-key';
	import llmChoice from '$lib/stores/llm-choice';
	import { Icon } from '@roast-dev/ui';
	import '@roast-dev/ui/styles/index.css';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		$chargeId = localStorage.getItem('roastChargeId');
		$llmChoice = localStorage.getItem('roastLlmChoice') ?? availableModels['claude-3-5-sonnet'];

		if ($llmChoice === 'gpt-4o') {
			$llmApiKey = localStorage.getItem('roastLlmApiKey-gpt-4o') ?? '';
		} else if ($llmChoice === 'gemini-1.5-pro') {
			$llmApiKey = localStorage.getItem('roastLlmApiKey-gemini-1.5-pro') ?? '';
		} else {
			$llmApiKey =
				localStorage.getItem(`roastLlmApiKey-${availableModels['claude-3-5-sonnet']}`) ?? '';
		}
	});
</script>

<svelte:head>
	<style>
		body {
			font-size: 16px;
			min-width: 48rem;
		}
	</style>
</svelte:head>

<main>
	<header>
		{#if $page.url.pathname === '/settings'}
			<h1>Settings</h1>

			<a href="/"> <Icon name="xmark" --size="1.5rem" /></a>
		{:else}
			<h1>
				🔥 roast<strong>.dev</strong>
			</h1>

			<a href="/settings">
				<Icon name="settings" --stroke="var(--c-text-light)" --size="1.5rem" />
			</a>
		{/if}
	</header>

	{@render children()}
</main>

<style>
	main {
		display: grid;
		gap: 1.75rem;
		padding: 1.625rem 1.5rem;
	}

	header {
		display: flex;
		align-items: center;
		justify-content: space-between;

		h1 {
			font-size: 1.5rem;
			margin: 0;

			strong {
				color: var(--c-accent);
				font-weight: inherit;
			}
		}
	}

	.logo {
		color: inherit;
		text-decoration: none;
		font-size: 1.75rem;
		font-weight: 700;
		line-height: 1;
		font-family:
			'SF UI Display',
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			'Helvetica Neue',
			Arial,
			sans-serif;
	}
</style>
