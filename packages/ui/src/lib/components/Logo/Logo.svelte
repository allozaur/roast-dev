<script lang="ts">
	import { SvgItem } from '@roast-dev/ui';

	interface IconProps {
		name?: string;
		customFill?: boolean;
	}

	const assetsPath = '../../assets/svg/logos/';

	const assets = import.meta.glob('../../assets/svg/logos/*.svg', {
		query: '?raw',
		import: 'default',
		eager: true
	});

	let { name, customFill }: IconProps = $props();
</script>

<div class="logo" class:custom-fill={customFill}>
	<SvgItem {assets} {assetsPath} {name} />
</div>

<style lang="postcss">
	.logo {
		display: contents;
	}

	.logo.custom-fill :global(svg path) {
		fill: var(--fill, currentColor);
	}
</style>
