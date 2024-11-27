<script lang="ts">
	import { page } from '$app/stores';
	import availableModels from '$lib/config/available-models';
	import chargeId from '$lib/stores/charge-id';
	import llmApiKey from '$lib/stores/llm-api-key';
	import llmChoice from '$lib/stores/llm-choice';
	import { supabase } from '$lib/supabase';
	import { browser } from '$app/environment';

	import { Icon } from '@roast-dev/ui';
	import '@roast-dev/ui/styles/index.css';
	import { onMount } from 'svelte';

	import isAuthenticated from '$lib/stores/is-authenticated';
	import session from '$lib/stores/session';

	let { children } = $props();

	async function handleSupabaseOAuth() {
		if (!browser) return;

		// Use Chrome's identity API for OAuth flow
		const {
			data: { url: authURL }
		} = await supabase.auth.signInWithOAuth({
			provider: 'github',
			options: {
				// @ts-expect-error - Chrome API
				redirectTo: chrome?.identity.getRedirectURL()
			}
		});

		// Launch the OAuth flow using Chrome's identity API
		const responseUrl = await new Promise((resolve) => {
			// @ts-expect-error - Chrome API
			chrome?.identity.launchWebAuthFlow(
				{
					url: authURL,
					interactive: true
				},
				(redirectUrl: unknown) => {
					resolve(redirectUrl);
				}
			);
		});

		// Handle the OAuth response
		if (responseUrl && typeof responseUrl === 'string') {
			const hashParams = new URLSearchParams(responseUrl.split('#')[1]);
			const accessToken = hashParams.get('access_token');
			const refreshToken = hashParams.get('refresh_token');

			if (accessToken && refreshToken) {
				const { data, error } = await supabase.auth.setSession({
					access_token: accessToken,
					refresh_token: refreshToken
				});

				if (error) {
					console.error('Error setting session:', error);
				} else {
					$session = data.session;
					$isAuthenticated = true;
				}
			}
		}
	}

	onMount(async () => {
		const { data } = await supabase.auth.getSession();

		$session = data.session;

		supabase.auth.onAuthStateChange((_event, _session) => {
			$session = _session;
			$isAuthenticated = typeof _session !== undefined && _session !== null;
		});

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

	// Expose the OAuth handler to the window object
	if (browser) {
		(window as any).handleSupabaseOAuth = handleSupabaseOAuth;
	}
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
</style>
