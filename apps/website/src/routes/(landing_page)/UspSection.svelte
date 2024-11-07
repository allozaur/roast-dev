<script>
	import { env as envPublic } from '$env/dynamic/public';
	import Cta from '$lib/components/Cta.svelte';
	import Jumbotron from '$lib/components/Jumbotron.svelte';
	import SectionHeadline from '$lib/components/SectionHeadline.svelte';
</script>

<section id="usp">
	<SectionHeadline
		heading="Have Code Reviews That Don't Suck"
		description="Four ways Roast helps you ship better code and make your team happier 👇"
	/>

	<div class="row">
		<img src="/jpg/catch_issues_early.jpg" alt="" />

		<div class="text">
			<h3>Catch Issues Early 😮‍💨</h3>

			<p>
				Save yourself from embarrassing code reviews. Spot security vulnerabilities, performance
				issues, and questionable code choices before your reviewer has to point them out.
				<strong>Ship better code from the start, not after three review rounds.</strong>
			</p>
		</div>
	</div>

	<div class="row">
		<div class="text">
			<h3>Grow With Every Roast 🤓</h3>

			<p>
				Make every PR your stepping stone to better code. Get actionable insights about patterns,
				performance, and best practices – explained in plain English with just the right amount of
				sass. <strong>Learn faster by getting roasted.</strong>
			</p>
		</div>

		<img src="/jpg/grow_with_every_roast.jpg" alt="" />
	</div>

	<div class="row">
		<img src="/jpg/ship_with_confidence.jpg" alt="" />

		<div class="text">
			<h3>Ship With Confidence 😎</h3>

			<p>
				Stop second-guessing your pull requests. Get comprehensive code analysis that checks for
				security issues, performance bottlenecks, and maintainability concerns. <strong
					>When your code's been pre-roasted, code reviews made by humans actually become a breeze.</strong
				>
			</p>
		</div>
	</div>

	<div class="row">
		<div class="text">
			<h3>Everyone Wins 🎉</h3>

			<p>
				Transform code reviews from time sinks into productive discussions. Developers get instant
				feedback and ship with confidence, while reviewers get pre-improved code that's actually
				worth their time. <strong>It's a win-win that makes everyone's day better.</strong>
			</p>
		</div>

		<img src="/jpg/everyone_wins.jpg" alt="" />
	</div>

	<div class="row">
		<Jumbotron>
			<h3>
				Turn Pull Request reviews into learning opportunities, not therapy sessions.
				<br />
				Get instant, witty feedback
				<strong>that actually makes you a better software engineer</strong>.
			</h3>

			<Cta
				href={envPublic.PUBLIC_STRIPE_CHECKOUT_LINK_LIFETIME}
				label="Add extension to your browser"
				subtitle="Improve your PR game with AI roasts."
			/>
		</Jumbotron>
	</div>
</section>

<style>
	section {
		padding-block: 5rem 3rem;
		padding-inline: 2rem;

		:global(.section-headline) {
			gap: 1.5rem;
			padding-bottom: 4rem;
			@media (width > 1024px) {
				padding-bottom: 2rem;
			}
		}

		:global(.section-headline h2) {
			color: var(--c-accent);
			font:
				700 1.875rem/1.25 'SF UI Display',
				-apple-system,
				sans-serif !important;

			@media (width > 1024px) {
				font:
					700 3rem/1.25 'SF UI Display',
					-apple-system,
					sans-serif !important;
			}
		}

		:global(.section-headline p) {
			font:
				400 1.125rem/1.5 'SF UI Display',
				-apple-system,
				sans-serif;
			@media (width > 1024px) {
				font:
					500 1.5rem/1.25 'SF UI Display',
					-apple-system,
					sans-serif !important;
			}
		}
	}

	.row {
		display: grid;
		align-items: center;
		max-width: var(--ui-boxed-width);
		margin: auto;
		padding-block: 1rem;
		@media (width > 1024px) {
			grid-template-columns: 1fr 1fr;
			padding-block: 3rem;
		}

		img {
			width: 100%;

			@media (prefers-color-scheme: dark) {
				filter: brightness(0.9) contrast(1.1);
			}

			@media (width <= 1024px) {
				order: 0;
			}
		}

		.text {
			text-align: left;
			padding-block: 2rem;

			@media (width > 1024px) {
				padding: 5rem;
			}

			@media (width <= 1024px) {
				order: 1;
			}

			h3 {
				font:
					700 1.625rem/1.25 'SF UI Display',
					-apple-system,
					sans-serif;
				@media (width > 1024px) {
					font:
						700 2.5rem/1.25 'SF UI Display',
						-apple-system,
						sans-serif;
				}

				margin: 0;
			}

			p {
				font-size: 1.125rem;
				font-weight: 500;
				line-height: 1.5;

				strong {
					color: var(--c-accent);
				}
			}
		}

		:global(.jumbotron) {
			grid-column: 1 / -1;
		}
	}
</style>
