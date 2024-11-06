<script>
	import Cta from '$lib/components/Cta.svelte';
	import PriceCard from '$lib/components/PriceCard.svelte';
	import SectionHeadline from '$lib/components/SectionHeadline.svelte';
</script>

<section id="pricing">
	<SectionHeadline heading="Buy it once and get roasted for good" />

	<div class="prices">
		<PriceCard
			title="One-year access"
			price="$39"
			discountPrice="$9"
			description="Early-bird special: 52% off 🤑"
			ctaLabel="Get 1-year access now"
			ctaSubtitle="Pay once. Have full access for a 365 days."
		/>

		<PriceCard
			isHighlighted
			title="Lifetime access"
			price="$99"
			discountPrice="$29"
			description="Early-bird special: 61% off 🤑"
			ctaLabel="Get lifetime access now"
			ctaSubtitle="Pay once. Use forever ∞."
		/>
	</div>

	<p>
		Want to see Roast in action? Add the plugin to your browser and generate <strong
			>5 roasts monthly for free
		</strong>. <br /> Try it on your next PRs, and when ready, unlock unlimited access to perfect every
		PR you submit!
	</p>

	<Cta label="Try Roast for free" subtitle="Try it out immediately by installing the plugin" />
</section>

<style>
	section {
		padding-block: 4rem;
		padding-inline: 2rem;
		display: grid;
		gap: 3rem;

		p {
			font:
				1.125rem/1.5 'SF UI Display',
				sans-serif;
			margin: auto;
			@media (width > 1024px) {
			font:
				1.25rem/1.5 'SF UI Display',
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
