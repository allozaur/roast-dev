<script lang="ts">
	import { Icon } from '@roast-dev/ui';
	import '@roast-dev/ui/styles/index.css';
	import type Stripe from 'stripe';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import availableModels from '$lib/config/available-models';
	import llmApiKey from '$lib/stores/llm-api-key';
	import llmChoice from '$lib/stores/llm-choice';
	import customer from '$lib/stores/customer';
	import isAuthenticated from '$lib/stores/is-authenticated';
	import { PUBLIC_STRIPE_CUSTOMER_VERIFICATION_WORKER_URL } from '$env/static/public';
	import hasActiveLicense from '$lib/stores/has-active-license';
	import session from '$lib/stores/session';
	import { supabase } from '$lib/supabase';

	let { children } = $props();

	onMount(async () => {
		const { data } = await supabase.auth.getSession();

		$session = data.session;

		supabase.auth.onAuthStateChange(async (_event, _session) => {
			$session = _session;
			$isAuthenticated = typeof _session !== undefined && _session !== null;

			if ($isAuthenticated && _event === 'INITIAL_SESSION') {
				const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
				if (tab?.url?.includes('https://github.com') && tab?.url.includes('/pull/')) {
					// localStorage.setItem('roastLastViewedPr', tab.url);
					chrome.storage.local.set({ roastLastViewedPr: tab.url });
				}

				if (_session?.user.id) {
					const req = await fetch(PUBLIC_STRIPE_CUSTOMER_VERIFICATION_WORKER_URL, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({ email: _session.user.email })
					});

					const { customer: customerData, charges } = await req.json();

					$customer = customerData;

					if (charges?.data?.some((charge: Stripe.Charge) => charge.paid === true)) {
						$hasActiveLicense = true;
					}
				}
			}

			if (!$isAuthenticated) {
				goto('/');
			}
		});

		$llmChoice = localStorage.getItem('roastLlmChoice') ?? availableModels['claude-3.5-sonnet'];

		if ($llmChoice === 'gpt-4o') {
			$llmApiKey = localStorage.getItem('roastLlmApiKey-gpt-4o') ?? '';
		} else if ($llmChoice === 'gemini-1.5-pro') {
			$llmApiKey = localStorage.getItem('roastLlmApiKey-gemini-1.5-pro') ?? '';
		} else {
			$llmApiKey =
				localStorage.getItem(`roastLlmApiKey-${availableModels['claude-3.5-sonnet']}`) ?? '';
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
		{#if $page.url.pathname === '/settings' && $isAuthenticated}
			<h1>Settings</h1>

			<a href="/"> <Icon name="xmark" --size="1.5rem" /></a>
		{:else}
			<h1>
				🔥 roast<strong>.dev</strong>
			</h1>

			{#if $isAuthenticated}
				<a href="/settings">
					<Icon name="settings" --stroke="var(--c-text-light)" --size="1.5rem" />
				</a>
			{/if}
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
</style>
