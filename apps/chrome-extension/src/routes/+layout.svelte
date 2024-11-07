<script>
	import { page } from '$app/stores';
	import { Icon } from '@roast-dev/ui';
	import '@roast-dev/ui/styles/index.css';

	let { children } = $props();
</script>

<svelte:head>
	<style>
		body {
			min-width: 40rem;
		}
	</style>
</svelte:head>

<main>
	<header>
		{#if $page.url.pathname === '/settings'}
			<h1>Settings</h1>

			<a href="/"> <Icon name="xmark" /></a>
		{:else}
			<h1>
				🧯 roast<strong>.dev</strong>
			</h1>

			<a href="/settings">
				<Icon name="settings" --stroke="var(--c-text-light)" />
			</a>
		{/if}
	</header>

	{@render children()}
</main>

<style>
	main {
		display: grid;
		gap: 2rem;
		padding: 1.625rem 1.5rem;
	}

	header {
		display: flex;
		align-items: center;
		justify-content: space-between;

		h1 {
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
