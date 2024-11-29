// src/lib/functions/extension-auth.ts

import { supabase } from '$lib/supabase';

export async function initializeExtensionAuth(provider: 'github' | 'google') {
	try {
		// Get the extension ID
		const extensionId = chrome?.runtime.id;
		console.log('Extension ID:', extensionId);

		// Construct redirect URL
		const redirectUrl = `chrome-extension://${extensionId}/index.html`;
		console.log('Redirect URL:', redirectUrl);

		// Generate OAuth URL with Supabase
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

		if (error) {
			console.error('Supabase OAuth error:', error);
			throw error;
		}

		const authUrl = data.url;
		if (!authUrl) {
			console.error('No auth URL generated');
			throw new Error('Failed to generate auth URL');
		}

		console.log('Auth URL:', authUrl);

		// Use chrome.identity API for auth flow
		const responseUrl = await new Promise<string>((resolve, reject) => {
			chrome.identity.launchWebAuthFlow(
				{
					url: authUrl,
					interactive: true
				},
				(response) => {
					if (chrome.runtime.lastError) {
						console.error('Chrome identity error:', chrome.runtime.lastError);
						reject(chrome.runtime.lastError);
					} else if (!response) {
						console.error('No response from auth flow');
						reject(new Error('No response URL'));
					} else {
						console.log('Auth response URL:', response);
						resolve(response);
					}
				}
			);
		});

		// Parse the response URL
		const url = new URL(responseUrl);
		const code = url.searchParams.get('code');

		if (!code) {
			console.error('No code in response URL');
			throw new Error('No code found in response');
		}

		console.log('Got auth code');

		// Exchange code for session
		const { data: session, error: sessionError } = await supabase.auth.exchangeCodeForSession(code);

		if (sessionError) {
			console.error('Session exchange error:', sessionError);
			throw sessionError;
		}

		console.log('Auth successful');
		return session;
	} catch (error) {
		console.error('Auth error:', error);
		throw error;
	}
}
