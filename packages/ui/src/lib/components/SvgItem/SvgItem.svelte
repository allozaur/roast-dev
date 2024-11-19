<script lang="ts">
	interface SvgItemProps {
		assets: Record<string, unknown>;
		assetsPath?: string;
		name?: string;
	}

	let { assets, assetsPath, name }: SvgItemProps = $props();
</script>

<div class="svg-item">
	{@html assets[`${assetsPath}${name}.svg`]}
</div>

<style lang="postcss">
	.svg-item {
		display: contents;
		font-size: var(--size, 2rem);
	}

	.svg-item :global(svg) {
		height: 1em;
		width: auto;
	}
</style>
