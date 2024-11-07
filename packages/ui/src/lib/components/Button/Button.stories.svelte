<script>
	import { Story } from '@storybook/addon-svelte-csf';
	import Button from './Button.svelte';

	export const meta = {
		title: 'Button',
		component: Button,
		argTypes: {
			label: { control: 'text' }
		}
	};
</script>

<Story name="Primary" let:args args={{ label: 'Button label' }}>
	<Button>
		{args.label}
	</Button>
</Story>
