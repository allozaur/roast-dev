<script>
	import LlmConfigForm from '$lib/components/LlmConfigForm.svelte';
	import { Button } from '@roast-dev/ui';
</script>

<h1>Welcome</h1>

<section>
	<h2>Choose a LLM & configure your API key</h2>

	<LlmConfigForm />
</section>

<Button href="/">Start roasting your code! 🔥</Button>
