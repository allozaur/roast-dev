<script lang="ts">
	import Button from '../Button/Button.svelte';

	interface CtaWithSubtitleProps {
		label: string;
		onClick?: () => void;
		href?: string;
		subtitle: string;
		target?: string;
	}

	let { href, label, onClick, subtitle, target }: CtaWithSubtitleProps = $props();
</script>

<div class="cta">
	<Button {onClick} {href} {target}>
		{label}
	</Button>

	<span>{@html subtitle}</span>
</div>

<style>
	.cta {
		display: grid;
		gap: 1rem;
		place-items: center;
		text-align: center;

		span {
			color: #888;
			font-size: 0.875rem;
			font-weight: 500;
		}
	}
</style>
