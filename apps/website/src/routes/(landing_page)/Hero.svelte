<script>
	import Button from '$lib/components/Button.svelte';
</script>

<div class="hero">
	<h1>Get your code <strong>roasted</strong> 🔥 by AI <br /> before real human does it 😵</h1>

	<br />

	<p>
		Submit better Pull Requests with instant, actionable feedback that teaches you something – and
		might actually make you chuckle 😁
	</p>

	<div class="cta">
		<Button>Get it for $5</Button>

		<span>Pay once. Use forever.</span>
	</div>
</div>

<style>
	.hero {
		display: grid;
		place-items: center;
		padding-block: 4rem;
	}

	h1 {
		font-family:
			'SF UI Display',
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			'Helvetica Neue',
			Arial,
			sans-serif;
		font-size: 4rem;
		text-align: center;
		margin-block: 0 2rem;
	}

	p {
		font-family:
			'SF UI Display',
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			'Helvetica Neue',
			Arial,
			sans-serif;
		font-size: 1.5rem;
		line-height: 1.5;
		max-width: 48rem;
		text-align: center;
		margin: 0;
	}

	.cta {
		display: grid;
		gap: 1rem;
		place-items: center;
		margin-top: 3rem;

		span {
			color: #888;
			font-size: 0.875rem;
			letter-spacing: -0.03em;
		}
	}
</style>
