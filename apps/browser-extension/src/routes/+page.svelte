<script lang="ts">
	import { Button } from '@roast-dev/ui';
	import freeLimitUsedHeadlines from '$lib/config/free-limit-used-headlines';
	import preRoastPlaceholders from '$lib/config/pre-roast-placeholders';
	import { onMount } from 'svelte';
	import chargeId from '$lib/stores/charge-id';
	import generateRoast from '$lib/functions/generate-roast';
	import { marked } from 'marked';
	import devPrCode from '$lib/fixtures/dev-pr-code';
	import { PUBLIC_FREE_USAGE_COUNTER_WORKER_URL } from '$env/static/public';

	let preRoastPlaceholderText = $state('');
	let status = $state('');
	let freeLimitIsUsed = $state(false);
	let freeLimitIsUsedHeadline = $state('');
	let loading = $state(false);
	let roastResponse = $state('');

	onMount(() => {
		preRoastPlaceholderText =
			freeLimitUsedHeadlines[Math.floor(Math.random() * preRoastPlaceholders.length)];
	});

	async function triggerRoast() {
		if (!$chargeId) {
			const freeUsageReq = await fetch(PUBLIC_FREE_USAGE_COUNTER_WORKER_URL, {
				method: 'GET'
			});
			const freeUsageRes = await freeUsageReq.json();
			const { status: freeUsageResStatus } = freeUsageRes;

			freeLimitIsUsed = freeUsageResStatus !== 201;

			if (freeLimitIsUsed) {
				loading = false;

				freeLimitIsUsedHeadline =
					freeLimitUsedHeadlines[Math.floor(Math.random() * freeLimitUsedHeadlines.length)];

				return;
			}
		}

		status = 'Extracting changes...';
		loading = true;
		roastResponse = '';

		let formattedDiff = '';

		try {
			if (import.meta.env.PROD) {
				// @ts-expect-error - Chrome API
				const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

				// @ts-expect-error - Chrome API
				const results = await chrome.scripting.executeScript({
					target: { tabId: tab.id! },
					func: () => {
						const prTitle =
							document.querySelector('.js-issue-title')?.textContent?.trim() || 'Untitled PR';
						const prUrl = window.location.href;

						const files = document.querySelectorAll('copilot-diff-entry');
						const changes: Array<{ fileName: string; content: string }> = [];

						files.forEach((file) => {
							const fileHeader = file.querySelector('.file-header');
							const fileName = fileHeader?.getAttribute('data-path') || 'unknown file';
							const lines = file.querySelectorAll('.blob-code');
							let fileContent = '';

							lines.forEach((line) => {
								const codeContent = line.querySelector('.blob-code-inner')?.textContent || '';
								if (line.classList.contains('blob-code-addition')) {
									fileContent += `+ ${codeContent}\n`;
								} else if (line.classList.contains('blob-code-deletion')) {
									fileContent += `- ${codeContent}\n`;
								} else {
									fileContent += `  ${codeContent}\n`;
								}
							});

							if (fileContent.trim()) {
								changes.push({
									fileName,
									content: fileContent
								});
							}
						});

						return {
							changes,
							title: prTitle,
							url: prUrl
						};
					}
				});

				if (!results?.[0]?.result) {
					throw new Error('No changes found. Are you on a PR "Files changed" page?');
				}

				const { changes, title, url } = results[0].result;

				formattedDiff = changes
					.map(
						(file: { fileName: any; content: any }) => `
File: ${file.fileName}
${file.content}
`
					)
					.join('\n---\n\n');
			} else {
				formattedDiff = devPrCode;
			}

			status = 'Roasting your code 🔥...';

			const response = await generateRoast(formattedDiff);

			marked.setOptions({
				gfm: true,
				breaks: true
			});

			roastResponse = await marked.parse(response);

			status = 'Roast delivered! 🔥';
		} catch (error) {
			console.error('Roast error:', error);
			status = `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`;
		} finally {
			loading = false;
		}
	}
</script>

<Button onClick={triggerRoast}>Roast this Pull Request 🔥</Button>

{#if freeLimitIsUsed}
	<div class="free-usage-limit">
		<h3>
			{freeLimitIsUsedHeadline}
		</h3>

		<p>Pay once, get unlimited roasts forever. No subscriptions, just pure value.</p>

		<Button href="https://roast.dev/#pricing" target="_blank">Unlock Unlimited Roasts 🚀</Button>

		<span> You can generate 10 roasts in 30 days for free. </span>
	</div>
{:else if status}
	<div class="status">
		{status}
	</div>
{/if}

{#if loading}
	<div class="loading">
		<div class="spinner" />
	</div>
{:else if roastResponse}
	<div class="roast-content">
		{@html roastResponse}
	</div>
{:else}
	<span class="placeholder">
		{preRoastPlaceholderText}
	</span>
{/if}

<style>
	.placeholder {
		display: grid;
		place-items: center;
		text-align: center;
		background: #222;
		font-size: 1.25rem;
		color: var(--c-text-light);
		font-weight: 500;
		@media (prefers-color-scheme: light) {
			background: #eaeaea;
		}
		border-radius: 1rem;
		min-height: 20rem;
	}

	.status {
		font-size: 0.875rem;
		color: var(--c-text-light);
		text-align: center;
		margin-top: 0.5rem;
	}

	.loading {
		display: grid;
		place-items: center;
		padding: 2rem;
	}

	.spinner {
		width: 2rem;
		height: 2rem;
		border: 0.25rem solid var(--c-text-light);
		border-top-color: var(--c-accent);
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.roast-content {
		display: grid;
		padding: 0.75rem 1.25rem;
		background: #f0f0f0;
		border-radius: 1rem;

		@media (prefers-color-scheme: dark) {
			background: #1a1a1a;
		}

		:global(h3) {
			font-size: 1.625rem;
		}

		:global(ol) {
			padding-inline-start: 1rem;
		}

		:global(pre) {
			background: #444;
			padding: 1rem;
			border-radius: 0.5rem;
			overflow-x: auto;
			max-width: 37.75rem;
		}

		:global(code) {
			font-family: ui-monospace, monospace;
			font-size: 0.875em;
		}
	}

	.free-usage-limit {
		display: inline-grid;
		gap: 1.5rem;
		padding: 2rem;
		border: 2px dashed var(--c-text-light);
		border-radius: 1rem;
		text-align: center;

		h3,
		p {
			margin: 0;
		}

		span {
			color: var(--c-text-light);
			font-size: 0.75rem;
		}
	}
</style>
