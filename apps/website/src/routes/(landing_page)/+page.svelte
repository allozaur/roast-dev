<script>
	import '$lib/styles/index.css';
	import FaqSection from './FaqSection.svelte';
	import Hero from './Hero.svelte';
	import PricingSection from './PricingSection.svelte';
	import SupportedBrowsersSection from './SupportedBrowsersSection.svelte';
	import TestimonialsSection from './TestimonialsSection.svelte';
	import UspSection from './UspSection.svelte';
	import FeaturesSection from './FeaturesSection.svelte';
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

	<FeaturesSection />

	<UspSection />

	<!-- <SupportedBrowsersSection /> -->

	<PricingSection />

	<FaqSection />

	<!-- <TestimonialsSection /> -->
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
</style>
