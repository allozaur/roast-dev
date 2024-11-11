<script lang="ts">
	interface TextFieldProps {
		id?: string;
		name: string;
		placeholder: string;
		value: string | null;
	}

	let { id, name, placeholder, value = $bindable() }: TextFieldProps = $props();
</script>

<label>
	<input {id} {name} {placeholder} type="text" bind:value />
</label>

<style>
	label {
		display: grid;
		gap: 0.5rem;
		font-size: 1rem;
	}

	input {
		padding: 0.625rem;
		font-size: 1rem;
		border-radius: 0.375rem;
		border: #444 1px solid;
		line-height: 1;
	}
</style>
