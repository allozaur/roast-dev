<script lang="ts">
	import type { Snippet } from 'svelte';

	interface ButtonProps {
		children?: Snippet;
		disabled?: boolean;
		download?: string;
		href?: string;
		image?: Snippet;
		kind?: 'primary' | 'secondary' | 'tertiary' | 'danger';
		onClick?: () => void;
		size?: 'sm' | 'md' | 'lg';
		target?: string;
		type?: 'button' | 'submit' | 'reset' | null | undefined;
	}

	let {
		children,
		disabled,
		download,
		href,
		image,
		kind,
		onClick,
		size = 'md',
		target,
		type
	}: ButtonProps = $props();
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
	<a
		class="button {kind} {size}"
		class:disabled
		class:image
		{download}
		{href}
		onclick={onClick}
		{target}
	>
		{@render inner()}
	</a>
{:else}
	<button
		class="button {kind} {size}"
		class:disabled
		class:image
		{disabled}
		onclick={onClick}
		{type}
	>
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

		&:is(.image) {
			background: transparent;
			padding: 0;
			border: none;
		}
	}

	.secondary {
		--background: var(--c-text-light);
		--background-hover: var(--c-text-light);
	}

	.danger {
		--background: #ccc;
		--background-hover: #ccc;
		--color: var(--c-accent);
	}

	.gradient {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		border-radius: 0.625rem;
		background: var(--background, linear-gradient(45deg, #811e0b, #ff7f5b));
		transition: all 0.2s ease-out;

		.button:hover & {
			filter: brightness(1.25);
		}
	}

	.label {
		border-radius: 0.5rem;
		border: none;
		color: var(--color, white);
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		justify-content: center;
		background: var(--background, var(--c-accent));
		padding: var(--padding);
		z-index: 1;
		font:
			600 1rem/1 'SF UI Display',
			-apple-system,
			sans-serif;
		letter-spacing: 0;
		transition: all 0.2s ease-out;

		.button:hover & {
			background: var(--background-hover, var(--background, var(--c-accent-75)));
		}

		.sm & {
			--padding: 0.625rem 0.875rem;
		}

		.md & {
			--padding: 0.875rem 1.125rem;
		}

		.lg & {
			--padding: 1.125rem 1.375rem;
		}
	}

	.disabled {
		cursor: not-allowed;
		--background: #888;
		--background-hover: #888;
		--color: #333;

		.gradient {
			display: none;
		}
	}
</style>
