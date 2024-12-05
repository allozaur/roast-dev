import { browser } from '$app/environment';
import { page } from '$app/stores';
import { supabase } from '$lib/supabase';
import { get } from 'svelte/store';
import { initializeExtensionAuth } from './extension-auth';

export async function signInWithGitHub() {
	try {
		if (browser && chrome?.runtime?.id) {
			const session = await initializeExtensionAuth('github');

			if (!session) throw new Error('Authentication failed');
		} else {
			const { error } = await supabase.auth.signInWithOAuth({
				provider: 'github',
				options: {
					redirectTo: get(page).url.origin
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
			const { error } = await supabase.auth.signInWithOAuth({
				provider: 'google',
				options: {
					redirectTo: get(page).url.origin
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
	localStorage.removeItem('roastWelcomePageVisited');

	const { error } = await supabase.auth.signOut();

	if (error) {
		console.error('Sign out error:', error);
		if (error instanceof Error) {
			alert(error.message);
		}
	}
}
