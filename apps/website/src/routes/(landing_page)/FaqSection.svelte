<script>
	import Accordion from '$lib/components/Accordion.svelte';
	import AccordionItem from '$lib/components/AccordionItem.svelte';
	import SectionHeadline from '$lib/components/SectionHeadline.svelte';
	import faqQuestions from './faq-questions';
</script>

<section id="faq-section">
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
</section>
