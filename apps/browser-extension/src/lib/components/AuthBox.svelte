<script>
	import { signInWithGitHub, signInWithGoogle } from '$lib/functions/auth';
	import { Button, Logo } from '@roast-dev/ui';
</script>

<nav class="auth-box">
	<h1>Sign in to start roasting 🔥</h1>

	<Button kind="secondary" onClick={signInWithGitHub}>
		Sign in with GitHub

		<Logo customFill name="github" --size="1.5rem" --fill="var(--c-text)" />
	</Button>

	<Button kind="secondary" onClick={signInWithGoogle}>
		Sign in with Google

		<Logo name="google" --size="1.5rem" />
	</Button>
</nav>

<style>
	.auth-box {
		display: grid;
		gap: 1.5rem;
		place-content: center;
		display: grid;
		text-align: center;
		background: #222;
		font-size: 1.25rem;
		color: var(--c-text-light);
		font-weight: 500;
		border-radius: 1rem;
		padding: 3rem;

		h1 {
			margin-bottom: 1rem;
		}
	}
</style>
