<script lang="ts">
	import type { Snippet } from 'svelte';

	interface FeatureCardProps {
		children: Snippet;
		icon: Snippet;
	}

	let { children, icon }: FeatureCardProps = $props();
</script>

<div class="feature-card">
	<div class="icon-wrapper">
		{@render icon()}
	</div>

	{@render children()}
</div>
