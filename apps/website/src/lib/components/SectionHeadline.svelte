<script lang="ts">
	interface SectionHeadlineProps {
		heading?: string;
		description?: string;
	}

	let { heading, description }: SectionHeadlineProps = $props();
</script>

<div>
	<h2>
		{heading}
	</h2>

	<p>
		{description}
	</p>
</div>

<style>
	div {
		display: grid;
		gap: 1rem;
		place-items: center;
	}

	h2,
	p {
		margin: 0;
	}

	h2 {
		font:
			600 3rem/1.5 'SF UI Display',
			-apple-system,
			sans-serif;
	}

	p {
		font:
			400 1.25rem/1.5 'SF UI Display',
			-apple-system,
			sans-serif;
	}
</style>
