<script>
	let { children } = $props();
	import '$lib/styles/index.css';
</script>

<svelte:head>
	<title>roast.dev</title>
</svelte:head>

<div class="landing-page">
	{@render children()}
</div>

<style>
	.landing-page {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
	}

	.landing-page :global(h1) {
		line-height: 1;
	}

	.landing-page :global(h1 strong) {
		font-weight: inherit;
		line-height: 1;
		color: var(--c-accent);
	}
</style>
