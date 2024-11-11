<script lang="ts">
	import type { Snippet } from 'svelte';

	interface AccordionProps {
		children: Snippet;
	}

	let { children }: AccordionProps = $props();
</script>

<div class="accordion">
	{@render children?.()}
</div>
