<script lang="ts">
	import Button from '../Button/Button.svelte';

	interface CtaWithSubtitleProps {
		download?: boolean;
		href?: string;
		label: string;
		onClick?: () => void;
		subtitle: string;
		target?: string;
	}

	let { download, href, label, onClick, subtitle, target }: CtaWithSubtitleProps = $props();
</script>

<div class="cta">
	<Button {download} {href} {onClick} {target}>
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
