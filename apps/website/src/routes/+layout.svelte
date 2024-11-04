<script>
	let { children } = $props();
	import Header from '$lib/components/Header.svelte';
	import '$lib/styles/index.css';
</script>

<Header />

{@render children()}
