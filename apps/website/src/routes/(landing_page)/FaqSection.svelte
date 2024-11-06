<script>
	import Accordion from '$lib/components/Accordion.svelte';
	import AccordionItem from '$lib/components/AccordionItem.svelte';
	import SectionHeadline from '$lib/components/SectionHeadline.svelte';
	import faqQuestions from './faq-questions';
</script>

<section id="faq-section">
	<div class="inner">
		<SectionHeadline heading="Frequently Asked Questions" />

		<Accordion>
			{#each faqQuestions as { question, answer }}
				<AccordionItem title={question}>
					<p>
						{@html answer}
					</p>
				</AccordionItem>
			{/each}
		</Accordion>
	</div>
</section>

<style>
	section {
		background: white;
		@media (prefers-color-scheme: dark) {
			background: #0a0a0a;
		}
		padding: 4rem 2rem;

		.inner {
			display: grid;
			gap: 3rem;
			max-width: 48rem;
			width: 100%;
			margin: auto;
		}
	}
</style>
