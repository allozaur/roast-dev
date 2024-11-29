import { browser } from '$app/environment';
import { supabase } from '$lib/supabase';
import { initializeExtensionAuth } from './extension-auth';

export async function signInWithGitHub() {
	try {
		if (browser && chrome?.runtime?.id) {
			const session = await initializeExtensionAuth('github');
			if (!session) throw new Error('Authentication failed');
		} else {
			// Regular web app flow
			const { error } = await supabase.auth.signInWithOAuth({
				provider: 'github',
				options: {
					redirectTo: window.location.href
				}
			});
			if (error) throw error;
		}
	} catch (error) {
		console.error('GitHub auth error:', error);
		if (error instanceof Error) {
			alert(error.message);
		}
	}
}

export async function signInWithGoogle() {
	try {
		if (browser && chrome?.runtime?.id) {
			// Check if running as extension
			const session = await initializeExtensionAuth('google');
			if (!session) throw new Error('Authentication failed');
		} else {
			// Regular web app flow
			const { error } = await supabase.auth.signInWithOAuth({
				provider: 'google',
				options: {
					redirectTo: window.location.href
				}
			});
			if (error) throw error;
		}
	} catch (error) {
		console.error('Google auth error:', error);
		if (error instanceof Error) {
			alert(error.message);
		}
	}
}

export async function signOut() {
	await supabase.auth.signOut();
}
