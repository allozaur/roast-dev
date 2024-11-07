<script>
	import { Accordion, AccordionItem } from '@roast-dev/ui';
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
		@media (width <= 1024px) {
			padding-block: 3rem;
		}

		.inner {
			display: grid;
			gap: 3rem;
			@media (width <= 1024px) {
				gap: 2rem;
			}
			max-width: 48rem;
			width: 100%;
			margin: auto;
		}
	}
</style>
