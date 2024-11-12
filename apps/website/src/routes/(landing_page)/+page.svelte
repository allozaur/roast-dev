<script>
	import '$lib/styles/index.css';
	import FaqSection from './FaqSection.svelte';
	import Hero from './Hero.svelte';
	import PricingSection from './PricingSection.svelte';
	// import SupportedBrowsersSection from './SupportedBrowsersSection.svelte';
	// import TestimonialsSection from './TestimonialsSection.svelte';
	import UspSection from './UspSection.svelte';
	import FeaturesSection from './FeaturesSection.svelte';
</script>

<svelte:head>
	<title>roast.dev — Helps you Fix Bad Code 🧯🔥 Before It Hits Code Review 😮‍💨</title>
	<meta
		name="description"
		content="Save your team's time and your ego. Our AI catches code issues before humans do, making PR reviews quick and actually productive. Works with GitHub, GitLab support coming soon 🚀"
	/>

	<style>
		html {
			scroll-padding-top: 5.75rem;
		}
	</style>

	{#await Promise.resolve(setTimeout(() => {}, 1000)).then(() => true) then ready}
		<style>
			html {
				scroll-behavior: smooth;
			}
		</style>
	{/await}
</svelte:head>

<main>
	<Hero />

	<FeaturesSection />

	<UspSection />

	<!-- <SupportedBrowsersSection /> -->

	<PricingSection />

	<!-- <TestimonialsSection /> -->

	<FaqSection />
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
</style>
