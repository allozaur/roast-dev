<script>
	import SectionHeadline from '$lib/components/SectionHeadline.svelte';
	import { FeatureCard, Icon } from '@roast-dev/ui';
</script>

<section class="features-section">
	<div class="inner">
		<SectionHeadline heading="See <strong>Roast</strong> plugin in action" />

		<video src="" style="background: #000; width: 100%; aspect-ratio: 16/9;"></video>

		<div class="feature-cards">
			{#snippet prIcon()}
				<Icon name="pr" --stroke="#238636" --stroke-width="3" --size="2.25rem" />
			{/snippet}

			<FeatureCard icon={prIcon}>
				<h3>Easily access Roast from your Pull Requests</h3>

				<p>
					One click in GitHub or GitLab to analyze your code instantly. Roast integrates naturally
					with your PR interface – no extra tabs, no context switching, no workflow disruption. <strong
						>Review your PRs and get instant juicy feedback right where you work with the code.</strong
					>
				</p>
			</FeatureCard>

			{#snippet sparksIcon()}
				<Icon name="sparks" --stroke="#C340FF" --stroke-width="3" --size="2.25rem" />
			{/snippet}

			<FeatureCard icon={sparksIcon}>
				<h3>Choose your favourite LLM to roast your code</h3>

				<p>
					Connect any major AI model (ChatGPT, Claude, or Gemini) using your own API key. <strong
						>Have full control over your LLM usage and costs, while keeping your code private.</strong
					> No middleman, no hidden fees – just direct, secure interaction with your chosen AI via Roast
					UI.
				</p>
			</FeatureCard>

			{#snippet lockIcon()}
				<Icon name="lock" --size="2.25rem" --stroke="black" --stroke-width="3" />
			{/snippet}

			<FeatureCard icon={lockIcon}>
				<h3>Browser-Based Privacy Protection</h3>

				<p>
					Your code never leaves your browser. <strong
						>All code is processed locally and then passed to LLM using your own API credentials</strong
					> – no external servers, no data storage, no compromises.
				</p>
			</FeatureCard>

			{#snippet trackIcon()}
				<span style="display: flex; align-items: center; gap: 0.5rem;">
					🔥
					<Icon name="arrow-right" --size="1.5rem" --stroke="black" --stroke-width="3" />
					🧯
				</span>
			{/snippet}

			<FeatureCard icon={trackIcon}>
				<h3>Visually Track Your Roasted Pull Requests</h3>

				<p>
					Every roasted PR gets a fire icon (🔥) next to its title. Review findings, address issues,
					and mark them as fixed to earn the extinguisher icon (🧯). <strong
						>Track improvements right in your PR list without extra clicks or context switching.</strong
					>
				</p>
			</FeatureCard>
		</div>
	</div>
</section>

<style>
	.features-section {
		padding: 4rem 2rem;
		text-align: center;
		position: relative;
		@media (width <= 1024px) {
			padding-block: 3rem;
		}

		&::before {
			content: '';
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			background: white;
			z-index: -1;
		}

		@media (prefers-color-scheme: dark) {
			&::before {
				background: #0a0a0a;
			}
		}

		.inner {
			display: grid;
			gap: 4rem;

			@media (width <= 1024px) {
				gap: 3rem;
			}
			max-width: var(--ui-boxed-width);
			margin: auto;
		}
	}

	.feature-cards {
		display: grid;
		gap: 2rem;

		@media (width > 1024px) {
			grid-template-columns: repeat(auto-fit, minmax(28rem, 1fr));
		}
	}

	.features-section :global(h2 strong) {
		font-weight: inherit;
		color: var(--c-accent);
	}
</style>
