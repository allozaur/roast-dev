<script lang="ts">
	import type { Snippet } from 'svelte';

	interface JumbotronProps {
		children: Snippet;
	}

	let { children }: JumbotronProps = $props();
</script>

<div class="jumbotron">
	{@render children()}
</div>

<style>
	.jumbotron {
		background: white;
		color: #0a0a0a;
		border-radius: 1rem;
		border: 2px solid var(--c-accent);
		display: grid;
		place-items: center;
		gap: 1.25rem;
		text-align: center;
		max-width: var(--ui-boxed-width);

		padding: 1.5rem;
		@media (width > 1024px) {
			padding: 4rem;
			gap: 2rem;
		}

		:global(h3) {
			font:
				500 1.375rem/1.5 'SF UI Display',
				sans-serif;
			margin: 0;

			@media (width > 1024px) {
				font:
					600 2rem/1.5 'SF UI Display',
					sans-serif;
			}

			:global(strong) {
				font-weight: inherit;
				color: var(--c-accent);
			}
		}
	}
</style>
