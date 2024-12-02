import { supabase } from '$lib/supabase';
import { page } from '$app/stores';
import { get } from 'svelte/store';

export async function initializeExtensionAuth(provider: 'github' | 'google') {
	try {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider,
			options: {
				skipBrowserRedirect: true,
				redirectTo: `${get(page).url.origin}/index.html`,
				queryParams: {
					access_type: 'offline',
					prompt: 'consent'
				}
			}
		});

		if (error) throw error;

		if (!data.url) throw new Error('No auth URL generated');

		await chrome.tabs.create({ url: data.url });

		return null;
	} catch (error) {
		console.error('Auth error:', error);
		throw error;
	}
}
