import { supabase } from '$lib/supabase';

async function signInWithGitHub() {
	try {
		const { error } = await supabase.auth.signInWithOAuth({
			provider: 'github',
			options: {
				redirectTo: window.location.href
			}
		});

		if (error) throw error;
	} catch (error) {
		if (error instanceof Error) {
			alert(error.message);
		}
	}
}

async function signInWithGoogle() {
	try {
		const { error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: window.location.href
			}
		});

		if (error) throw error;
	} catch (error) {
		if (error instanceof Error) {
			alert(error.message);
		}
	}
}

async function signOut() {
	await supabase.auth.signOut();
}

export { signInWithGitHub, signInWithGoogle, signOut };
