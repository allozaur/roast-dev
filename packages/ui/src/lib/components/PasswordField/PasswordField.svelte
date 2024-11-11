<script lang="ts">
	interface TextFieldProps {
		id?: string;
		label?: string;
		name: string;
		placeholder: string;
		value: string | null;
	}

	let { id, label, name, placeholder, value = $bindable() }: TextFieldProps = $props();
</script>

<label>
	{label}

	<input {id} {name} {placeholder} type="password" bind:value />
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
