function injectRoastButton() {
	// Find the Review button container
	const reviewButton = document.querySelector('.js-reviews-toggle');
	if (!reviewButton) {
		console.log('Review button not found');
		return;
	}

	// Create our button with GitHub's button styling
	const roastButton = document.createElement('button');
	roastButton.className = 'btn-primary btn btn-sm js-roast-button';
	roastButton.innerHTML = 'Roast this PR 🔥';
	roastButton.setAttribute('data-view-component', 'true');
	roastButton.style.marginRight = '8px';

	// Insert our button before the Review button within the same container
	reviewButton.parentNode?.insertBefore(roastButton, reviewButton);

	// Add click event listener
	roastButton.addEventListener('click', (e) => {
		e.preventDefault();

		// @ts-expect-error - Chrome specific
		chrome.runtime.sendMessage({ action: 'openPopup' });
	});
}

// Enhanced observer to handle GitHub's dynamic loading
function createObserver() {
	// Callback function to handle mutations
	const callback = function (mutations) {
		for (const mutation of mutations) {
			if (mutation.addedNodes.length) {
				// Check if we're on the PR files page
				if (location.href.includes('/pull/') && location.href.includes('/files')) {
					// Check if the review button exists and our button doesn't
					const reviewButton = document.querySelector('.js-reviews-toggle');
					const roastButton = document.querySelector('.js-roast-button');
					if (reviewButton && !roastButton) {
						injectRoastButton();
					}
				}
			}
		}
	};

	// Create and return the observer
	return new MutationObserver(callback);
}

// Initialize the observer
const observer = createObserver();
observer.observe(document.body, { childList: true, subtree: true });

// Initial check for the button
if (location.href.includes('/pull/') && location.href.includes('/files')) {
	// Try a few times to inject the button, as GitHub's UI might load async
	const attempts = [0, 500, 1000, 2000];
	attempts.forEach((delay) => {
		setTimeout(() => {
			if (!document.querySelector('.js-roast-button')) {
				injectRoastButton();
			}
		}, delay);
	});
}
