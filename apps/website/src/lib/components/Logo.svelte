<script lang="ts">
	interface LogoProps {
		name?: string;
	}

	const icons = import.meta.glob('../assets/svg/logos/*.svg', {
		query: '?raw',
		import: 'default',
		eager: true
	});

	let { name = 'moovboard' }: LogoProps = $props();
</script>

<div class="logo" data-testid="icon" role="none">
	{@html icons[`../assets/svg/logos/${name}.svg`]}
</div>

<style lang="postcss">
	.logo {
		display: contents;
		font-size: var(--size, 2rem);
	}

	.logo :global(svg) {
		height: 1em;
		width: auto;
	}
</style>
