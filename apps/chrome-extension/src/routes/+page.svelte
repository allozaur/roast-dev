<script>
	import { Button, Icon } from '@roast-dev/ui';
	import preRoastPlaceholders from '$lib/pre-roast-placeholders';
	import { onMount } from 'svelte';

	let preRoastPlaceholderText = $state('');

	onMount(() => {
		preRoastPlaceholderText =
			preRoastPlaceholders[Math.floor(Math.random() * preRoastPlaceholders.length)];
	});
</script>

<Button>Roast this Pull Request 🔥</Button>

<div class="roast-content">
	<span class="placeholder">
		{preRoastPlaceholderText}
	</span>
</div>

<style>
	.roast-content {
		display: grid;

		.placeholder {
			display: grid;
			place-items: center;
			text-align: center;
			background: #222;
			font-size: 1.25rem;
			color: var(--c-text-light);
			font-weight: 500;
			@media (prefers-color-scheme: light) {
				background: #eaeaea;
			}
			border-radius: 1rem;
			min-height: 20rem;
		}
	}
</style>
