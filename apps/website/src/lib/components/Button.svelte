<script lang="ts">
	import type { Snippet } from 'svelte';

	interface ButtonProps {
		children: Snippet;
		href?: string;
	}

	let { children, href }: ButtonProps = $props();
</script>

{#snippet inner()}
	{@render children()}
{/snippet}

{#if href}
	<a class="button" {href}>
		{@render inner()}
	</a>
{:else}
	<button class="button">
		{@render inner()}
	</button>
{/if}

<style>
	.button {
		background: var(--c-accent);
		border-radius: 0.5rem;
		border: none;
		color: white;
		cursor: pointer;
		font-size: 1rem;
		font-weight: 600;
		padding: 0.875rem 1.125rem;
		position: relative;
		transition: all 0.2s ease-out;

		&:hover {
			background: var(--c-accent-95);

			&::before {
				filter: brightness(1.25);
			}
		}

		&::before {
			content: '';
			position: absolute;
			left: -0.125rem;
			top: -0.125rem;
			right: -0.125rem;
			bottom: -0.125rem;
			border-radius: 0.5rem;
			background-image: linear-gradient(27.5deg, #a51900, #ff8b77);
			transition: all 0.2s ease-out;
			z-index: -1;
		}
	}
</style>
