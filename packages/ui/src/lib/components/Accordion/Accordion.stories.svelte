<script>
	import { Story } from '@storybook/addon-svelte-csf';
	import Accordion from './Accordion.svelte';
	import AccordionItem from './AccordionItem.svelte';

	export const meta = {
		title: 'Accordion',
		components: [Accordion, AccordionItem],
		argTypes: {
			items: { control: 'array' }
		}
	};
</script>

<Story
	name="Primary"
	let:args
	args={{
		items: [
			{
				title: 'What is your return policy?',
				text: 'You can return any item within 30 days of purchase.'
			},
			{
				title: 'Do you ship internationally?',
				text: 'Yes, we ship to over 50 countries worldwide.'
			},
			{
				title: 'How can I track my order?',
				text: 'You will receive a tracking link via email once your order ships.'
			},
			{
				title: 'What payment methods do you accept?',
				text: 'We accept Visa, MasterCard, American Express, and PayPal.'
			}
		]
	}}
>
	<Accordion>
		{#each args.items as { title, text }}
			<AccordionItem {title}>
				{text}
			</AccordionItem>
		{/each}
		{args.label}
	</Accordion>
</Story>
