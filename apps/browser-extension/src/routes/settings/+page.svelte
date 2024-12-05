<script lang="ts">
	import { Button } from '@roast-dev/ui';
	import { signOut } from '$lib/functions/auth';
	import isAuthenticated from '$lib/stores/is-authenticated';
	import AuthBox from '$lib/components/AuthBox.svelte';
	import LlmConfigForm from '$lib/components/LlmConfigForm.svelte';
	import BillingAndLicense from '$lib/components/BillingAndLicense.svelte';
</script>

<LlmConfigForm />

<BillingAndLicense />

{#if $isAuthenticated}
	<div class="auth">
		<Button kind="danger" onClick={signOut}>Sign out</Button>
	</div>
{:else}
	<AuthBox />
{/if}

<style>
	.auth {
		margin-top: 2rem;
		display: grid;
		place-items: center;
	}
</style>
