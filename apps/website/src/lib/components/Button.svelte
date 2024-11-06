<script lang="ts">
	import type { Snippet } from 'svelte';

	interface ButtonProps {
		children?: Snippet;
		href?: string;
		image?: Snippet;
		onClick?: () => void;
		type?: 'button' | 'submit' | 'reset' | null | undefined;
	}

	let { children, href, image, onClick, type }: ButtonProps = $props();
</script>

{#snippet inner()}
	{#if children}
		{@render children()}
	{:else if image}
		{@render image()}
	{/if}
{/snippet}

{#if href}
	<a class="button" class:image {href} onclick={onClick}>
		{@render inner()}
	</a>
{:else}
	<button class="button" class:image onclick={onClick} {type}>
		{@render inner()}
	</button>
{/if}

<style>
	.button {
		cursor: pointer;
		font-size: 1rem;
		font-weight: 600;
		position: relative;
		transition: all 0.2s ease-out;

		&:not(.image) {
			background: var(--c-accent);
			border-radius: 0.5rem;
			border: none;
			color: white;
			padding: 0.875rem 1.125rem;

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

			&:hover {
				background: var(--c-accent-95);

				&::before {
					filter: brightness(1.25);
				}
			}
		}

		&:is(.image) {
			background: transparent;
			padding: 0;
			border: none;
		}
	}
</style>
