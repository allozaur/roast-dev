<script lang="ts">
	import { SvgItem } from '@roast-dev/ui';

	interface LogoProps {
		name?: string;
	}

	const assetsPath = '../assets/svg/logos';

	const assets = import.meta.glob('../assets/svg/logos/*.svg', {
		query: '?raw',
		import: 'default',
		eager: true
	});

	let { name }: LogoProps = $props();
</script>

<div class="logo">
	<SvgItem {assets} {assetsPath} {name} />
</div>

<style lang="postcss">
	.logo {
		display: contents;
	}
</style>
