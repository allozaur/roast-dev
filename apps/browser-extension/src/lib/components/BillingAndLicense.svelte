<script lang="ts">
	import { Button, Cta, Icon, PriceCard } from '@roast-dev/ui';
	import {
		PUBLIC_STRIPE_CHECKOUT_WORKER_URL,
		PUBLIC_STRIPE_LIFETIME_LICENSE_PRICE_ID,
		PUBLIC_STRIPE_1_YEAR_LICENSE_PRICE_ID
	} from '$env/static/public';
	import chargeId from '$lib/stores/charge-id';
	import hasActiveLicense from '$lib/stores/has-active-license';
	import customer from '$lib/stores/customer';
</script>

<section>
	<h2>Billing & License</h2>

	{#if $hasActiveLicense}
		<div class="active-license">
			<span>
				<Icon name="check-circle" --stroke="var(--c-success)" --size="1.5rem" />

				Your license is active!. You have full access to Roast.
			</span>
		</div>
	{:else}
		<div class="prices" id="pricing">
			{#snippet yearlyPriceCta()}
				<Cta
					onClick={async () => {
						try {
							const { url } = await fetch(PUBLIC_STRIPE_CHECKOUT_WORKER_URL, {
								method: 'POST',
								headers: {
									'Content-Type': 'application/json'
								},
								body: JSON.stringify({
									customerId: $customer?.id,
									priceId: PUBLIC_STRIPE_1_YEAR_LICENSE_PRICE_ID,
									promotionCode: 'promo_1QISAwGuaYvAy5SAvpRoVyDp'
								})
							}).then((res) => res.json());

							window.open(url, '_blank');
						} catch (error) {
							console.error(error);
						}
					}}
					label="Get 1-year access now"
					subtitle="Pay once for 365 days of full access."
				/>
			{/snippet}

			<PriceCard
				title="One-year access"
				price="$39"
				discountPrice="$9"
				description="Early-bird special offer:<br /> 77% off 🤑"
				ctaSnippet={yearlyPriceCta}
			/>

			{#snippet lifetimePriceCta()}
				<Cta
					onClick={async () => {
						try {
							const { url } = await fetch(PUBLIC_STRIPE_CHECKOUT_WORKER_URL, {
								method: 'POST',
								headers: {
									'Content-Type': 'application/json'
								},
								body: JSON.stringify({
									customerId: $customer?.id,
									priceId: PUBLIC_STRIPE_LIFETIME_LICENSE_PRICE_ID,
									promotionCode: 'promo_1QISC3GuaYvAy5SAmgZ2sQ8H'
								})
							}).then((res) => res.json());

							window.open(url, '_blank');
						} catch (error) {
							console.error(error);
						}
					}}
					label="Get lifetime access now"
					subtitle="Pay once to use it forever ∞."
				/>
			{/snippet}

			<PriceCard
				ctaSnippet={lifetimePriceCta}
				isHighlighted
				title="Lifetime access"
				price="$99"
				discountPrice="$29"
				description="Early-bird special offer:<br /> 71% off 🤑"
			/>
		</div>
	{/if}
</section>

<style>
	.prices {
		display: flex;
		gap: 2rem;
		justify-content: center;
	}

	.active-license {
		align-items: center;
		display: flex;
		justify-content: space-between;
		padding: 1rem;
		border: 2px solid var(--c-text-light);
		border-radius: 1rem;

		span {
			font-size: 1.125rem;
			font-weight: 500;
			display: inline-flex;
			align-items: center;
			gap: 0.625rem;
		}
	}
</style>
