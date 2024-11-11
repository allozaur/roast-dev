function injectRoastButton() {
	const reviewButton = document.querySelector('.js-reviews-toggle');

	if (!reviewButton) {
		console.log('Review button not found');
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

		// @ts-expect-error - Chrome specific
		chrome.runtime.sendMessage({ action: 'openPopup' });
	});
}

// Enhanced observer to handle GitHub's dynamic loading
function createObserver() {
	const callback = function (mutations) {
		for (const mutation of mutations) {
			if (mutation.addedNodes.length) {
				if (location.href.includes('/pull/') && location.href.includes('/files')) {
					const reviewButton = document.querySelector('.js-reviews-toggle');
					const roastButton = document.querySelector('.js-roast-button');

					if (reviewButton && !roastButton) {
						injectRoastButton();
					}
				}
			}
		}
	};

	return new MutationObserver(callback);
}

const observer = createObserver();

observer.observe(document.body, { childList: true, subtree: true });

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
