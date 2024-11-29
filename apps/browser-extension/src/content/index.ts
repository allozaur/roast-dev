function injectRoastButton() {
	const reviewButton = document.querySelector('.js-reviews-toggle');

	if (!reviewButton) {
		console.log('Review button not found');
		return;
	}

	// Check if button already exists to prevent duplicates
	if (document.querySelector('.js-roast-button')) {
		return;
	}

	const roastButton = document.createElement('button');

	roastButton.className = 'btn-secondary btn btn-sm js-roast-button';
	roastButton.innerHTML = 'Roast this PR 🔥';
	roastButton.setAttribute('data-view-component', 'true');
	roastButton.style.marginRight = '8px';

	reviewButton.parentNode?.insertBefore(roastButton, reviewButton);

	roastButton.addEventListener('click', (e) => {
		e.preventDefault();
		chrome.runtime.sendMessage({ action: 'openPopup' });
	});
}

function checkAndInjectButton() {
	if (location.href.includes('/pull/') && location.href.includes('/files')) {
		const reviewButton = document.querySelector('.js-reviews-toggle');
		const roastButton = document.querySelector('.js-roast-button');

		if (reviewButton && !roastButton) {
			injectRoastButton();
		}
	}
}

// Enhanced observer to handle GitHub's dynamic loading
function createObserver() {
	return new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (mutation.addedNodes.length) {
				checkAndInjectButton();
			}
		}
	});
}

// Initial check
checkAndInjectButton();

// Set up observer for dynamic changes
const observer = createObserver();
observer.observe(document.body, { childList: true, subtree: true });

// Clean up observer when the content script is unloaded
window.addEventListener('unload', () => {
	observer.disconnect();
});
