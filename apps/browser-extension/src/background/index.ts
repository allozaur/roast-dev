import { supabase } from '$lib/supabase';

chrome.runtime.onMessage.addListener((request) => {
	if (request.action === 'openPopup') {
		chrome.action.openPopup();
	}
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
	if (changeInfo.url?.startsWith(chrome.identity.getRedirectURL())) {
		try {
			const url = new URL(changeInfo.url);
			const hashParams = new URLSearchParams(url.hash.substring(1));
			const access_token = hashParams.get('access_token');
			const refresh_token = hashParams.get('refresh_token');

			if (!access_token || !refresh_token) {
				throw new Error('No auth tokens found in redirect URL');
			}

			const {
				data: { session },
				error
			} = await supabase.auth.setSession({
				access_token,
				refresh_token
			});

			if (error) throw error;

			await chrome.storage.local.set({
				session: {
					access_token: session?.access_token,
					refresh_token: session?.refresh_token,
					user: session?.user
				}
			});

			await chrome.tabs.remove(tabId);

			chrome.runtime.sendMessage({ type: 'AUTH_STATE_CHANGED', session });
		} catch (error) {
			console.error('Auth redirect error:', error);

			await chrome.tabs.remove(tabId);
		}
	}
});
