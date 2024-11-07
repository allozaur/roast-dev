<script>
	import '@roast-dev/ui/styles/index.css';
	import { Button, Icon } from '@roast-dev/ui';
</script>

<svelte:head>
	<style>
		body {
			min-width: 40rem;
		}
	</style>
</svelte:head>

<header>
	<div class="logo">
		🧯 roast<span>.dev</span>
	</div>

	<button>
		<Icon name="settings" --stroke="var(--c-text-light)" />
	</button>
</header>

<Button>Roast this Pull Request 🔥</Button>

<style>
	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.logo {
		color: inherit;
		text-decoration: none;
		font-size: 1.75rem;
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

	button {
		appearance: none;
		background: none;
		border: none;
		display: flex;
	}
</style>
