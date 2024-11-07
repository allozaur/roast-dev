<script lang="ts">
	import Cta from './Cta.svelte';

	interface PriceCardProps {
		title: string;
		price: string;
		discountPrice: string;
		description: string;
		isHighlighted?: boolean;
		ctaHref: string;
		ctaLabel: string;
		ctaSubtitle: string;
	}

	let {
		isHighlighted,
		title,
		price,
		discountPrice,
		description,
		ctaHref,
		ctaLabel,
		ctaSubtitle
	}: PriceCardProps = $props();
</script>

<div class="price-card" class:is-highlighted={isHighlighted}>
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

	<Cta href={ctaHref} label={ctaLabel} subtitle={ctaSubtitle} />
</div>

<style>
	@keyframes gradient {
		0% {
			box-shadow: 0 0 1rem var(--c-accent-50);
		}
		50% {
			box-shadow: 0 0 2rem var(--c-accent-95);
		}
		100% {
			box-shadow: 0 0 1rem var(--c-accent-50);
		}
	}
	.price-card {
		background: white;
		color: #0a0a0a;
		display: grid;
		place-items: center;
		gap: 2.5rem;
		padding: 4rem 3rem;
		border-radius: 1rem;
		border: 2px solid #888;
		text-align: center;

		@media (width <= 1024px) {
			gap: 1.5rem;
			padding: 2.5rem 2rem;
		}

		&.is-highlighted {
			animation: gradient 2.5s infinite;
			border-color: var(--c-accent);
			box-shadow: 0 0 1rem var(--c-accent-50);
		}
	}

	h3 {
		font-size: 2rem;
		font-weight: 700;
		line-height: 1;
		margin: 0;
	}

	.price {
		display: flex;
		gap: 0.375rem;
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
	}

	p {
		color: #238636;
		font:
			600 1.125rem/1.5 'SF UI Display',
			-apple-system,
			sans-serif;
		letter-spacing: 0;
		margin: 0;
	}
</style>
