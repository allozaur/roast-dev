<main>
	<slot />
</main>

<style>
	main {
		max-width: 56rem;
		margin: auto;

		:global(a) {
			color: var(--c-primary);
			background: var(--c-secondary);
		}
	}
</style>
