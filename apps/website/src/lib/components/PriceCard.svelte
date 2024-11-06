<script lang="ts">
	import Cta from './Cta.svelte';

	interface PriceCardProps {
		title: string;
		price: string;
		discountPrice: string;
		description: string;
		ctaLabel: string;
		ctaSubtitle: string;
	}

	let { title, price, discountPrice, description, ctaLabel, ctaSubtitle }: PriceCardProps =
		$props();
</script>

<div class="price-card">
	<h3>
		{title}
	</h3>

	<div class="price">
		<span class="price-regular">
			{price}
		</span>

		<span class="price-discount">
			{discountPrice}
		</span>
	</div>

	<p>
		{description}
	</p>

	<Cta label={ctaLabel} subtitle={ctaSubtitle} />
</div>

<style>
	.price-card {
		display: grid;
		place-items: center;
		gap: 2rem;
		padding: 4rem;
		border-radius: 1rem;
		border: 2px solid #888;
	}

	h3 {
		font-size: 2rem;
		font-weight: 700;
		line-height: 1;
		margin: 0;
	}

	.price {
		display: flex;
		gap: 0.75rem;
		align-items: flex-end;
	}

	.price-regular {
		font:
			800 2rem/1 'SF UI Display',
			-apple-system,
			sans-serif;
		font-weight: 700;
		color: #888;
		text-decoration: line-through;
	}

	.price-discount {
		font:
			800 3rem/1 'SF UI Display',
			-apple-system,
			sans-serif;
		color: var(--c-text);
	}

	p {
		color: #238636;
		font:
			700 1.25rem/1.5 'SF UI Display',
			-apple-system,
			sans-serif;
		margin: 0;
	}
</style>
