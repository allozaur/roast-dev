<script lang="ts">
	import Button from './Button.svelte';

	interface CtaWithSubtitleProps {
		label: string;
		onClick?: () => void;
		href?: string;
		subtitle: string;
	}

	let { href, label, onClick, subtitle }: CtaWithSubtitleProps = $props();
</script>

<div class="cta">
	<Button {onClick} {href}>
		{label}
	</Button>

	<span>{@html subtitle}</span>
</div>

<style>
	.cta {
		display: grid;
		gap: 1rem;
		place-items: center;

		span {
			color: #888;
			font-size: 0.875rem;
		}
	}
</style>
