<script>
	import Cta from '$lib/components/Cta.svelte';
</script>

<section class="hero">
	<div class="inner">
		<h1>Get your code <strong>roasted</strong> 🔥 by AI <br /> before real human does it 😵</h1>

		<br />

		<p>
			Submit better Pull Requests with instant, actionable feedback that you can learn from 🧐 and
			might actually make you chuckle 😁
		</p>

		<Cta
			label="Get the earlybird lifetime access just for $19 🤯"
			subtitle="Pay once. Improve instantly. Use forever."
		/>
	</div>
</section>

<style>
	.hero .inner {
		max-width: var(--ui-boxed-width);
		margin: auto;
		display: grid;
		place-items: center;
		padding-block: 4rem 6rem;
	}

	h1 {
		font-family:
			'SF UI Display',
			-apple-system,
			sans-serif;
		letter-spacing: 0;
		font-size: 4rem;
		line-height: 4.5rem;
		text-align: center;
		margin-block: 0 2rem;
	}

	p {
		/* font-family:
			'SF UI Display',
			-apple-system,
			sans-serif;
		letter-spacing: 0; */
		font-size: 1.5rem;
		line-height: 1.5;
		max-width: 48rem;
		text-align: center;
		margin: 0 0 3rem 0;
	}

	.cta {
		display: grid;
		gap: 1rem;
		place-items: center;
		margin-top: 3rem;

		span {
			color: #888;
			font-size: 0.875rem;
		}
	}
</style>
