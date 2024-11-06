<script>
	import Logo from '$lib/components/Logo.svelte';
	import SectionHeadline from '$lib/components/SectionHeadline.svelte';
</script>

<section id="supported-browsers">
	<SectionHeadline
		heading="Works in Chrome & Firefox"
		description="Install Roast plugin for your browser directly from an official store."
	/>

	<div class="logos">
		<Logo name="chrome" --size="5rem" />

		<Logo name="firefox" --size="5rem" />

		<Logo name="firefox-developer-edition" --size="5rem" />
	</div>

	<p>Support for more browsers coming soon.</p>
</section>

<style>
	.logos {
		display: flex;
		gap: 4rem;
	}
</style>
