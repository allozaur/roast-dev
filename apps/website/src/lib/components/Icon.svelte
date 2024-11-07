<script lang="ts">
	import { SvgItem } from '@roast-dev/ui';

	interface IconProps {
		name?: string;
	}

	const assetsPath = '../assets/svg/icons';

	const assets = import.meta.glob('../assets/svg/icons/*.svg', {
		query: '?raw',
		import: 'default',
		eager: true
	});

	let { name }: IconProps = $props();
</script>

<div class="icon">
	<SvgItem {assets} {assetsPath} {name} />
</div>

<style lang="postcss">
	.icon {
		display: contents;
	}

	.icon :global(svg path) {
		stroke: var(--stroke, currentColor);
		stroke-width: var(--stroke-width, 2);
	}
</style>
