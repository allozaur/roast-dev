<script lang="ts">
	import { SvgItem } from '@roast-dev/ui';

	interface IconProps {
		name?: string;
		originalFill?: boolean;
	}

	const assetsPath = '../../assets/svg/logos/';

	const assets = import.meta.glob('../../assets/svg/logos/*.svg', {
		query: '?raw',
		import: 'default',
		eager: true
	});

	let { name, originalFill }: IconProps = $props();
</script>

<div class="logo" class:original-fill={originalFill}>
	<SvgItem {assets} {assetsPath} {name} />
</div>

<style lang="postcss">
	.logo {
		display: contents;
	}

	.logo:not(.original-fill) :global(svg path) {
		fill: var(--fill, currentColor);
	}
</style>
