import { supabase } from '$lib/supabase';

chrome.runtime.onMessage.addListener((request) => {
	if (request.action === 'openPopup') {
		chrome.action.openPopup();
	}
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
	const { data } = supabase.auth.onAuthStateChange(async (_event) => {
		setTimeout(async () => {
			if (changeInfo.url?.startsWith('chrome-extension://')) {
				if (_event === 'INITIAL_SESSION') {
					const { roastLastViewedPr } = await chrome.storage.local.get('roastLastViewedPr');
					const [{ id: lastViewedPrTabId }] = await chrome.tabs.query({ url: roastLastViewedPr });

					if (lastViewedPrTabId) {
						await chrome.tabs.update(lastViewedPrTabId, { active: true });
					}

					if (typeof tabId === 'number') {
						chrome.tabs.get(tabId, async (tab) => {
							if (chrome.runtime.lastError || !tab) {
								console.log('Tab does not exist.');
								return;
							}

							await chrome.tabs.remove(tabId);
							await chrome.action.openPopup();
						});
					}
				}

				data.subscription.unsubscribe();
			}
		}, 500);
	});
});
