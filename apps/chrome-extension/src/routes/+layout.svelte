<script>
	let { children } = $props();
</script>

<main>
	{@render children()}
</main>

<style>
	main {
		display: grid;
		gap: 2rem;
		padding: 1.625rem 1.5rem;
	}
</style>
