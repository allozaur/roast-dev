<script lang="ts">
	interface SectionHeadlineProps {
		heading?: string;
		description?: string;
	}

	let { heading, description }: SectionHeadlineProps = $props();
</script>

<div class="section-headline">
	<h2>
		{@html heading}
	</h2>

	{#if description}
		<p>
			{@html description}
		</p>
	{/if}
</div>

<style>
	.section-headline {
		display: grid;
		gap: 1rem;
		place-items: center;
		text-align: center;
	}

	:is(h2, p) {
		margin: 0;
	}

	h2 {
		font:
			600 1.25rem/1.5 'SF UI Display',
			-apple-system,
			sans-serif;
		@media (width > 1024px) {
			font:
				600 3rem/1 'SF UI Display',
				-apple-system,
				sans-serif;
		}
	}

	p {
		font:
			400 1.25rem/1.5 'SF UI Display',
			-apple-system,
			sans-serif;
	}
</style>
