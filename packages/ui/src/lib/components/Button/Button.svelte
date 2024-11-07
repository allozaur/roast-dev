<script lang="ts">
	import type { Snippet } from 'svelte';

	interface ButtonProps {
		children?: Snippet;
		href?: string;
		image?: Snippet;
		onClick?: () => void;
		target?: string;
		type?: 'button' | 'submit' | 'reset' | null | undefined;
	}

	let { children, href, image, onClick, target, type }: ButtonProps = $props();
</script>

{#snippet inner()}
	{#if children}
		<div class="gradient"></div>

		<span class="label">
			{@render children()}
		</span>
	{:else if image}
		{@render image()}
	{/if}
{/snippet}

{#if href}
	<a class="button" class:image {href} onclick={onClick} {target}>
		{@render inner()}
	</a>
{:else}
	<button class="button" class:image onclick={onClick} {type}>
		{@render inner()}
	</button>
{/if}

<style>
	.button {
		background: transparent;
		border: none;
		appearance: none;
		display: inline-grid;
		cursor: pointer;
		position: relative;
		text-decoration: none;
		padding: 0.125rem;

		.gradient {
			content: '';
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			border-radius: 0.625rem;
			background-image: linear-gradient(45deg, #b02600, #ff7f5b);
			transition: all 0.2s ease-out;
		}

		&:hover {
			.label {
				background: var(--c-accent-75);
			}

			.gradient {
				filter: brightness(1.25);
			}
		}

		.label {
			border-radius: 0.5rem;
			border: none;
			color: white;
			padding: 0.875rem 1.125rem;
			background: var(--c-accent);
			z-index: 1;
			font:
				500 1rem/1 'SF UI Display',
				-apple-system,
				sans-serif;
			letter-spacing: 0;
			transition: all 0.2s ease-out;
		}

		&:is(.image) {
			background: transparent;
			padding: 0;
			border: none;
		}
	}
</style>
