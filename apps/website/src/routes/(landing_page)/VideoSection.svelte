<script>
	import Icon from '$lib/components/Icon.svelte';
	import FeatureCard from './FeatureCard.svelte';
</script>

<section class="video-section">
	<div class="inner">
		<h2>See <strong>Roast</strong> plugin in action</h2>

		<video src="" style="background: #000; width: 100%; aspect-ratio: 16/9;"></video>

		<div class="feature-cards">
			{#snippet prIcon()}
				<Icon name="pr" --stroke="#238636" --size="2.25rem" />
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
				<Icon name="sparks" --stroke="#C340FF" --size="2.25rem" />
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
				<Icon name="lock" --size="2.25rem" />
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
				<span style="font-size: 2.25rem">
					🔥
					<Icon name="arrow-right" --size="1.625rem" --stroke-width="3" />
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
	.video-section {
		background: white;
		@media (prefers-color-scheme: dark) {
			background: #0a0a0a;
		}
		padding-block: 4rem;
		text-align: center;

		.inner {
			display: grid;
			gap: 4rem;
			max-width: var(--ui-boxed-width);
			margin: auto;
		}
	}

	h2 {
		font:
			600 2rem/1.5 'SF UI Display',
			-apple-system,
			sans-serif;
		margin: 0;

		strong {
			font-weight: inherit;
			color: var(--c-accent);
		}
	}
</style>
