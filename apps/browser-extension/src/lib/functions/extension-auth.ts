import { supabase } from '$lib/supabase';

export async function initializeExtensionAuth(provider: 'github' | 'google') {
	try {
		// @ts-expect-error - Chrome specific
		const redirectUrl = chrome.identity.getRedirectURL();
		console.log('Extension redirect URL:', redirectUrl);

		// Generate Supabase OAuth URL but don't redirect automatically
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider,
			options: {
				skipBrowserRedirect: true,
				redirectTo: redirectUrl,
				queryParams: {
					access_type: 'offline',
					prompt: 'consent'
				}
			}
		});

		if (error) throw error;
		if (!data.url) throw new Error('No auth URL generated');

		// Open the auth URL in a new tab
		// @ts-expect-error - Chrome specific
		await chrome.tabs.create({ url: data.url });

		// The background script will handle the redirect and token storage
		// We'll return here since the popup might close
		return null;
	} catch (error) {
		console.error('Auth error:', error);
		throw error;
	}
}
