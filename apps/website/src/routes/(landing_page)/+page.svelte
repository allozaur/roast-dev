<script>
	import '$lib/styles/index.css';
	import FaqSection from './FaqSection.svelte';
	import Hero from './Hero.svelte';
	import PricingSection from './PricingSection.svelte';
	import SupportedBrowsersSection from './SupportedBrowsersSection.svelte';
	import UspSection from './UspSection.svelte';
	import VideoSection from './VideoSection.svelte';
</script>

<svelte:head>
	<title>roast.dev — Helps you Fix Bad Code 🧯🔥 Before It Hits Code Review 😮‍💨</title>
	<meta
		name="description"
		content="Save your team's time and your ego. Our AI catches code issues before humans do, making PR reviews quick and actually productive. For GitHub & GitLab 🚀"
	/>
</svelte:head>

<main>
	<Hero />

	<VideoSection />

	<UspSection />

	<FaqSection />

	<SupportedBrowsersSection />

	<PricingSection />
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main :global(section) {
		padding-inline: 2rem;
	}

	.landing-page :global(h1 strong) {
		font-weight: inherit;
		line-height: 1;
		color: var(--c-accent);
	}
</style>
