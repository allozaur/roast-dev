<script>
	import '$lib/styles/index.css';
	import Hero from './Hero.svelte';
</script>

<svelte:head>
	<title>roast.dev — Helps you Fix Bad Code 🧯🔥 Before It Hits Code Review 😮‍💨</title>
	<meta
		name="description"
		content="Save your team's time and your ego. Our AI catches code issues before humans do, making PR reviews quick and actually productive. For GitHub & GitLab 🚀"
	/>
</svelte:head>

<div class="landing-page">
	<Hero />
</div>

<style>
	.landing-page {
		display: flex;
		flex-direction: column;
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
