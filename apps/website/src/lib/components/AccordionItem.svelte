<script lang="ts">
	import clickOutside from '$lib/utils/click-outside';
	import type { Snippet } from 'svelte';

	interface AccordionItemProps {
		children: Snippet;
		onlyOneOpen?: undefined | boolean;
		open?: undefined | boolean;
		title: string;
	}

	let { children, onlyOneOpen, open, title }: AccordionItemProps = $props();

	let detailsEl: HTMLDetailsElement;
</script>

<details
	{open}
	bind:this={detailsEl}
	use:clickOutside={() => {
		if (onlyOneOpen) {
			detailsEl.open = false;
		}
	}}
>
	<summary>
		<h3>{@html title}</h3>
	</summary>

	{@render children()}
</details>

<style>
	details {
		margin-bottom: 2rem;

		@media (width <= 768px) {
			margin-bottom: 1.75rem;
		}
	}

	summary {
		color: var(--c-text-light);
		display: inline-flex;
		cursor: pointer;
		list-style: none;
		user-select: none;
		transition: all 0.2s ease-out;

		&,
		h3 {
			font-size: 2rem;
			font-weight: 600;

			@media (width <= 768px) {
				font-size: 1.375rem;
			}
		}

		h3 {
			font-weight: 400;
			margin: 0;
			text-align: left;
			width: 100%;
		}

		details:hover & {
			color: var(--c-text);
		}
		details[open] & {
			color: var(--c-accent);
		}
	}

	summary::before {
		content: '+' !important;
		display: inline-block;
		width: 2rem;
	}

	details[open] summary::before {
		content: '-' !important;
	}

	details :global(p) {
		font-size: 1.25rem;
		line-height: 1.5;
		margin-block: 2rem;
		padding-left: 2rem;

		@media (width <= 768px) {
			margin-block: 1rem;
			font-size: 1rem;
		}
	}
</style>
