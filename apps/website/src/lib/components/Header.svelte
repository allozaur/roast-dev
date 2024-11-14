<script>
	import { env as envPublic } from '$env/dynamic/public';
	import { Button } from '@roast-dev/ui';
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

		<div class="download-cta">
			<!-- <Button
				href={envPublic.PUBLIC_CHROME_WEB_STORE_EXTENSION_URL}
				image={badgeChromeWebStore}
				target="_blank"
			/> -->

			<Button download href="/downloads/roast-chrome-extension.zip">Download Beta version 🔥</Button
			>
		</div>
	</div>
</header>

<style>
	header {
		background: var(--bg-body);
		z-index: 999;
		padding: 1rem 2rem;
		margin-block: 1rem;
		@media (width < 768px) {
			padding: 1rem;
		}

		@media (width >= 768px) {
			position: sticky;
			top: 0;
		}
	}

	.inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		max-width: 79rem;
		margin: auto;

		@media (width < 768px) {
			flex-direction: column;
			gap: 3rem;
		}
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

		@media (width < 768px) {
			font-size: 1.5rem;
		}

		span {
			color: var(--c-accent);
		}
	}

	.download-cta {
		@media (width < 768px) {
			box-shadow: 0 0 1rem #00000050;
			position: fixed;
			bottom: 1rem;
			left: 50%;
			transform: translateX(-50%);
			z-index: 9999;
		}
	}
</style>
