<script>
	import { env as envPublic } from '$env/dynamic/public';
	import { Cta, PriceCard } from '@roast-dev/ui';
	import SectionHeadline from '$lib/components/SectionHeadline.svelte';
</script>

<section id="pricing">
	<SectionHeadline heading="Buy it once and get roasted for good" />

	<div class="prices">
		<PriceCard
			ctaHref={envPublic.PUBLIC_STRIPE_CHECKOUT_LINK_1_YEAR}
			title="One-year access"
			price="$39"
			discountPrice="$9"
			description="Early-bird special offer:<br /> 77% off 🤑"
			ctaLabel="Get 1-year access now"
			ctaSubtitle="Pay once for 365 days of full access."
		/>

		<PriceCard
			ctaHref={envPublic.PUBLIC_STRIPE_CHECKOUT_LINK_LIFETIME}
			isHighlighted
			title="Lifetime access"
			price="$99"
			discountPrice="$29"
			description="Early-bird special offer:<br /> 71% off 🤑"
			ctaLabel="Get lifetime access now"
			ctaSubtitle="Pay once to use it forever ∞."
		/>
	</div>

	<p>
		Want to see Roast in action? Add the plugin to your browser and generate <strong
			>5 roasts monthly for free
		</strong>. <br /> Try it on your next PRs, and when ready, unlock unlimited access to perfect every
		PR you submit!
	</p>

	<Cta
		href={envPublic.PUBLIC_CHROME_WEB_STORE_EXTENSION_URL}
		target="_blank"
		label="Try Roast for free"
		subtitle="Try it out immediately by installing the plugin"
	/>
</section>

<style>
	section {
		padding-block: 4rem;
		padding-inline: 2rem;
		display: grid;
		gap: 3rem;
		@media (width <= 1024px) {
			padding-block: 2rem 4rem;
			gap: 2rem;
		}

		p {
			font:
				1.125rem/1.5 'SF UI Display',
				-apple-system,
				sans-serif;
			margin: auto;
			@media (width > 1024px) {
				font:
					1.25rem/1.5 'SF UI Display',
					-apple-system,
					sans-serif;
				text-align: center;
			}

			strong {
				color: var(--c-accent);
			}

			br {
				@media (width <= 1024px) {
					display: none;
				}
			}
		}
	}
	.prices {
		display: flex;
		flex-wrap: wrap;
		gap: 3rem;
		justify-content: center;
	}
</style>
