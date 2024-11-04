chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'openPopup') {
    // This will trigger the popup to open
    chrome.action.openPopup();
  }
});