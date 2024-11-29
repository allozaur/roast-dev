import { supabase } from './supabase';

// Handle extension popup opening
chrome.runtime.onMessage.addListener((request) => {
	if (request.action === 'openPopup') {
		chrome.action.openPopup();
	}
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
	if (changeInfo.url?.startsWith(chrome.identity.getRedirectURL())) {
		try {
			// Parse the URL and extract tokens
			const url = new URL(changeInfo.url);
			const hashParams = new URLSearchParams(url.hash.substring(1));
			const access_token = hashParams.get('access_token');
			const refresh_token = hashParams.get('refresh_token');

			if (!access_token || !refresh_token) {
				throw new Error('No auth tokens found in redirect URL');
			}

			// Set the session with Supabase
			const {
				data: { session },
				error
			} = await supabase.auth.setSession({
				access_token,
				refresh_token
			});

			if (error) throw error;

			// Store the session in chrome.storage
			await chrome.storage.local.set({
				session: {
					access_token: session?.access_token,
					refresh_token: session?.refresh_token,
					user: session?.user
				}
			});

			// Close the auth tab and refresh the extension popup
			await chrome.tabs.remove(tabId);
			chrome.runtime.sendMessage({ type: 'AUTH_STATE_CHANGED', session });
		} catch (error) {
			console.error('Auth redirect error:', error);
			// Close the auth tab even if there's an error
			await chrome.tabs.remove(tabId);
		}
	}
});
