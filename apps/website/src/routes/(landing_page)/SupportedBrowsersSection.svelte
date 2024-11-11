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
	section {
		background: white;
		padding: 4rem 0;
		display: grid;
		gap: 2rem;
		text-align: center;
		@media (prefers-color-scheme: dark) {
			background: #0a0a0a;
		}
		@media (width <= 1024px) {
			padding-block: 2rem;
		}
	}

	.logos {
		display: flex;
		justify-content: center;
		gap: 4rem;
	}

	p {
		font:
			400 1.125rem/1.5 'SF UI Display',
			sans-serif;
		color: #888;
	}
</style>
