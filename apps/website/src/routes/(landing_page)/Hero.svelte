<script>
	import { env as envPublic } from '$env/dynamic/public';
	import { Cta } from '@roast-dev/ui';
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
			href="#pricing"
			label="Add extension to your browser 😎"
			subtitle="Roast your code and improve code reviews"
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
		padding-inline: 2rem;

		@media (width <= 1024px) {
			padding-block: 2rem 4rem;
		}
	}

	h1 {
		font:
			700 4rem/1.125 'SF UI Display',
			-apple-system,
			sans-serif;
		letter-spacing: 0;
		text-align: center;
		margin-block: 0 2rem;

		strong {
			color: var(--c-accent);
			font-weight: inherit;
		}
		@media (width <= 1024px) {
			font-size: min(min(3.75rem, 9vw));
			line-height: 1.25;
		}

		br {
			@media (width <= 1024px) {
				display: none;
			}
		}
	}

	p {
		font:
			400 1.25rem/1.5 'SF UI Display',
			-apple-system,
			sans-serif;
		letter-spacing: 0;
		font-size: 1.5rem;
		line-height: 1.5;
		max-width: 48rem;
		text-align: center;
		margin: 0 0 3rem 0;

		@media (width <= 1024px) {
			font-size: 1.25rem;
		}
	}
</style>
