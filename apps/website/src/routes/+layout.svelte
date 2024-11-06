<script>
	let { children } = $props();
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import '$lib/styles/index.css';
</script>

<Header />

{@render children()}

<Footer />
