// @ts-expect-error - Chrome specific
chrome.runtime.onMessage.addListener((request) => {
	if (request.action === 'openPopup') {
		// @ts-expect-error - Chrome specific
		chrome.action.openPopup();
	}
});
