// @ts-expect-error - This is a Chrome extension API
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'openPopup') {
    // @ts-expect-error - This is a Chrome extension API
    chrome.action.openPopup();
  }
});