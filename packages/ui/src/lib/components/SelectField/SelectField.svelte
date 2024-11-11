<script lang="ts">
	import type { Snippet } from 'svelte';

	interface SelectFieldProps {
		children: Snippet;
		id?: string;
		label: string;
		name: string;
		value: string | null;
	}

	let { children, id, label, name, value = $bindable() }: SelectFieldProps = $props();
</script>

<label>
	{label}
	<select {name} {id} bind:value>
		{@render children()}
	</select>
</label>

<style>
	label {
		display: grid;
		gap: 0.5rem;
		font-size: 1rem;
	}

	select {
		border-radius: 0.375rem;
		border: #444 1px solid;
		padding: 0.625rem;
		font-weight: 600;
		font-size: 1rem;
		line-height: 1;
	}
</style>
