<script>
	import Button from './Button.svelte';
</script>

<header>
	<div class="inner">
		<a class="logo" href="/"> 🧯 roast<span>.dev</span> </a>

		{#snippet badgeChromeWebStore()}
			<img
				src="/png/chrome-web-store-badge.png"
				height="56"
				alt="Available in the Chrome Web Store"
			/>
		{/snippet}

		<Button image={badgeChromeWebStore} />
	</div>
</header>

<style>
	header {
		padding: 2rem;
	}

	.inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		max-width: 79rem;
		margin: auto;
	}

	.logo {
		color: inherit;
		text-decoration: none;
		font-size: 2rem;
		font-weight: 700;
		line-height: 1;
		font-family:
			'SF UI Display',
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			'Helvetica Neue',
			Arial,
			sans-serif;

		span {
			color: var(--c-accent);
		}
	}
</style>
