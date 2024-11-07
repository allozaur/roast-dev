<script lang="ts">
	import type { Snippet } from 'svelte';

	interface FeatureCardProps {
		children: Snippet;
		icon?: Snippet;
	}

	let { children, icon }: FeatureCardProps = $props();
</script>

<div class="feature-card">
	{#if icon}
		<div class="icon-wrapper">
			{@render icon()}
		</div>
	{/if}

	{@render children()}
</div>

<style>
	.feature-card {
		background-color: var(--bg-body);
		border-radius: 0.925rem;
		display: grid;
		gap: 1.5rem;
		padding: 1.5rem;
		place-content: start;
		place-items: start;
		position: relative;
		text-align: left;

		&::before {
			content: '';
			position: absolute;
			left: -0.125rem;
			top: -0.125rem;
			right: -0.125rem;
			bottom: -0.125rem;
			border-radius: 1rem;
			background-image: linear-gradient(27.5deg, #a51900, #ff8b77);
			transition: all 0.2s ease-out;
			z-index: -1;
		}
	}

	:global(.feature-card :is(h3, p)) {
		margin: 0;
	}

	:global(.feature-card h3) {
		font:
			600 1.625rem/1.25 'SF UI Display',
			-apple-system,
			sans-serif;
		font-weight: 600;
		letter-spacing: 0;
	}

	:global(.feature-card p) {
		font:
			400 1.125rem/1.5 'SF UI Display',
			-apple-system,
			sans-serif;
		letter-spacing: 0.01rem;

		:global(strong) {
			color: var(--c-accent);
		}
	}

	.icon-wrapper {
		background: white;
		display: grid;
		place-items: center;
		font-size: 1.75rem !important;
		padding: 0.75rem;
		border-radius: 2rem;
		border: 2px solid var(--c-accent);
	}
</style>
