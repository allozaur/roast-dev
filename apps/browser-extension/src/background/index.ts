import { supabase } from '$lib/supabase';

chrome.runtime.onMessage.addListener((request) => {
	if (request.action === 'openPopup') {
		chrome.action.openPopup();
	}
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
	if (changeInfo.url?.startsWith('chrome-extension://')) {
		const { data } = supabase.auth.onAuthStateChange(async (_event) => {
			setTimeout(async () => {
				if (_event === 'INITIAL_SESSION' && tabId) {
					const { roastLastViewedPr } = await chrome.storage.local.get('roastLastViewedPr');
					chrome.tabs.remove(tabId);

					const tabs = await chrome.tabs.query({});
					const existingTab = tabs.find((tab) => tab.url === roastLastViewedPr);

					if (existingTab) {
						await chrome.tabs.update(existingTab.id!, { active: true });
					} else if (roastLastViewedPr) {
						await chrome.tabs.create({ url: roastLastViewedPr });
					} else {
						await chrome.tabs.create({ url: 'https://github.com/pulls' });
					}

					chrome.action.openPopup();
				}

				data.subscription.unsubscribe();
			}, 500);
		});
	}
});
