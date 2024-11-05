<script lang="ts">
	interface IconProps {
		name: string;
	}

	const icons = import.meta.glob('../assets/svg/icons/*.svg', {
		query: '?raw',
		import: 'default',
		eager: true
	});

	let { name }: IconProps = $props();
</script>

<div class="icon" data-testid="icon" role="none">
	{@html icons[`../assets/svg/icons/${name}.svg`]}
</div>

<style lang="postcss">
	.icon {
		display: contents;
		font-size: var(--size, 1rem);
		color: inherit;
	}

	.icon :global(svg) {
		height: 1em;
		width: auto;
	}

	.icon :global(svg path) {
		stroke: var(--stroke, currentColor);
		stroke-width: var(--stroke-width, 2);
	}
</style>
