<script lang="ts">
	import { marked } from 'marked';
	import { onMount } from 'svelte';
	import { PUBLIC_FREE_USAGE_COUNTER_WORKER_URL } from '$env/static/public';
	import { Button, Logo } from '@roast-dev/ui';
	import AuthBox from '$lib/components/AuthBox.svelte';
	import followUpPrompt from '$lib/config/prompts/follow-up-prompt';
	import freeLimitUsedHeadlines from '$lib/config/content/free-limit-used-headlines';
	import initialPromptClaude from '$lib/config/prompts/initial-prompt-claude';
	import initialPromptGemini from '$lib/config/prompts/initial-prompt-gemini';
	import initialPromptGpt from '$lib/config/prompts/initial-prompt-gpt';
	import preRoastPlaceholders from '$lib/config/content/pre-roast-placeholders';
	import devPrCode from '$lib/fixtures/dev-pr-code';
	import generateRoast from '$lib/functions/generate-roast';
	import chargeId from '$lib/stores/charge-id';
	import isAuthenticated from '$lib/stores/is-authenticated';
	import llmChoice from '$lib/stores/llm-choice';
	import getRandomItem from '$lib/utils/get-random-item';

	let freeLimitIsUsedHeadline = $state('');
	let hasReachedFreeLimit = $state(false);
	let loading = $state(false);
	let preRoastPlaceholderText = $state('');
	let roastConversation: {
		model?: string | null;
		messages: { role?: string; content?: string }[];
		metaData: {
			pullRequest: {
				title: string | null;
				url: string | null;
				status: string | null;
			};
		};
	} = $state({
		model: '',
		messages: [],
		metaData: { pullRequest: { title: null, url: null, status: null } }
	});
	let statusText = $state('');
	let isOnWrongPage = $state(false);
	let roastPrTitle = $state('');
	let roastPrUrl = $state('');
	let tabUrl = $state('');

	let db: IDBDatabase;

	async function loadRoastConversation() {
		await openDatabase();

		const transaction = db.transaction('conversations', 'readonly');
		const store = transaction.objectStore('conversations');
		const id = roastPrUrl.replace('https://', '').replace('/files', '');
		const request = store.get(id);

		request.onsuccess = () => {
			if (request.result) {
				roastConversation = request.result.data;
			}
		};

		request.onerror = (event) => {
			console.error('Error loading conversation:', event);
		};
	}

	function openDatabase(): Promise<void> {
		return new Promise((resolve, reject) => {
			const request = indexedDB.open('roastConversationsDB', 1);
			request.onerror = (event) => {
				console.error('Database error:', event);
				reject();
			};

			request.onsuccess = () => {
				db = request.result;
				resolve();
			};

			request.onupgradeneeded = () => {
				db = request.result;
				if (!db.objectStoreNames.contains('conversations')) {
					db.createObjectStore('conversations', { keyPath: 'id' });
				}
			};
		});
	}

	async function saveRoastConversation() {
		await openDatabase();
		const transaction = db.transaction('conversations', 'readwrite');
		const store = transaction.objectStore('conversations');
		const id = roastPrUrl.replace('https://', '').replace('/files', '');
		store.put({ id, data: $state.snapshot(roastConversation) });
	}

	async function triggerRoast() {
		if (!$chargeId) {
			const freeUsageReq = await fetch(PUBLIC_FREE_USAGE_COUNTER_WORKER_URL);

			hasReachedFreeLimit = freeUsageReq.status !== 201;

			if (hasReachedFreeLimit) {
				loading = false;

				freeLimitIsUsedHeadline = getRandomItem(freeLimitUsedHeadlines);

				return;
			}
		}

		let formattedDiff = '';

		loading = true;
		statusText = 'Extracting changes...';

		try {
			if (import.meta.env.PROD) {
				// @ts-expect-error - Chrome API
				const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

				const githubPullFilesUrlPattern =
					/^https:\/\/github\.com\/[^\/]+\/[^\/]+\/pull\/\d+\/files/;

				if (!tab.url || !githubPullFilesUrlPattern.test(tab.url)) {
					statusText =
						'Please navigate to the "Files changed" page of a Pull Request to use have you code roasted 🔥';
					isOnWrongPage = true;
					loading = false;
					return;
				}

				// @ts-expect-error - Chrome API
				const results = await chrome.scripting.executeScript({
					target: { tabId: tab.id! },
					func: () => {
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
							changes
						};
					}
				});

				if (!results?.[0]?.result) {
					throw new Error('No changes found. Are you on a PR "Files changed" page?');
				}

				const { changes } = results[0].result;

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
				roastPrTitle = 'Test PR';
				roastPrUrl = 'https://github.com/roast-dev/roast/pull/123';
			}

			const initialPrompt =
				$llmChoice === 'gemini-1.5-pro'
					? initialPromptGemini
					: $llmChoice === 'gpt-4o'
						? initialPromptGpt
						: initialPromptClaude;

			if (roastConversation.messages?.length === 0) {
				roastConversation.messages.push({
					role: 'user',
					content: `${initialPrompt}${formattedDiff}`
				});
			} else {
				roastConversation.messages.push({
					role: 'user',
					content: `${followUpPrompt}${formattedDiff}`
				});
			}

			statusText = `Roasting your code 🔥 Do not close the plugin window or I'll smack ya! 🥊`;

			const { content, role } = await generateRoast(roastConversation.messages ?? []);

			roastConversation.messages.push({ role, content });

			roastConversation.model = $llmChoice;

			roastConversation.metaData.pullRequest.title = roastPrTitle;

			roastConversation.metaData.pullRequest.url = roastPrUrl;

			await saveRoastConversation();

			statusText = 'Roast delivered! 🔥';
		} catch (error) {
			console.error('Roast error:', error);
			statusText = `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`;
		} finally {
			loading = false;
		}
	}

	onMount(async () => {
		marked.setOptions({
			gfm: true,
			breaks: true
		});

		preRoastPlaceholderText = getRandomItem(preRoastPlaceholders);

		if (import.meta.env.PROD) {
			try {
				// @ts-expect-error - Chrome API
				const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

				tabUrl = tab.url;

				// @ts-expect-error - Chrome API
				const results = await chrome.scripting.executeScript({
					target: { tabId: tab.id! },
					func: () => {
						const prTitle =
							document.querySelector('.js-issue-title')?.textContent?.trim() || 'Untitled PR';
						const prUrl = window.location.href;
						return { prTitle, prUrl };
					}
				});

				if (results?.[0]?.result) {
					roastPrTitle = results[0].result.prTitle;
					roastPrUrl = results[0].result.prUrl;
				}
			} catch (error) {
				console.error('Error extracting PR info:', error);
			}
		} else {
			roastPrTitle = 'Test PR';
			roastPrUrl = 'https://github.com/roast-dev/roast/pull/123';
		}

		await loadRoastConversation();
	});
</script>

{#if roastPrTitle}
	<div class="top">
		<Logo customFill name="github" --size="1.625rem" --fill="var(--c-text)" />

		<h1 class="pr-title">
			{@html roastPrTitle}

			<span class="pr-number">
				#{@html roastPrUrl.replace('/files', '').split('/').pop()}
			</span>
		</h1>
	</div>
{/if}

{#if !$isAuthenticated}
	<AuthBox />
{:else if isOnWrongPage && tabUrl.includes('/pull/')}
	<Button
		onClick={async () => {
			// @ts-expect-error - Chrome API
			const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
			// @ts-expect-error - Chrome API
			await chrome.tabs.update(tab.id!, { url: `${tabUrl}/files` });
		}}
	>
		Go to "Files changed" tab
	</Button>
{:else if !isOnWrongPage}
	<Button disabled={loading} onClick={triggerRoast}>
		{#if roastConversation.messages?.length > 0}
			Roast updates for this PR 🔥
		{:else}
			Roast this Pull Request 🔥
		{/if}
	</Button>
{/if}

{#if hasReachedFreeLimit}
	<div class="free-usage-limit">
		<h3>
			{freeLimitIsUsedHeadline}
		</h3>

		<p>Pay once, get unlimited roasts forever. No subscriptions, just pure value.</p>

		<Button href="https://roast.dev/#pricing" target="_blank">Unlock Unlimited Roasts 🚀</Button>

		<span> You can generate 10 roasts in 30 days for free. </span>
	</div>
{:else if statusText}
	<div class="status-text">
		{statusText}
	</div>
{/if}

{#if $isAuthenticated}
	{#if loading}
		<div class="loading">
			<div class="spinner"></div>
		</div>
	{:else if roastConversation?.messages?.some((message) => message.role === 'assistant' || message.role === 'model')}
		<div class="roast-content">
			{#if roastConversation.messages.filter((message) => message.role === 'assistant' || message.role === 'model')?.length > 0}
				{@const roastResponses = roastConversation.messages.filter(
					(message) => message.role === 'assistant' || message.role === 'model'
				)}

				{#await marked.parse(`${roastResponses[roastResponses.length - 1].content}`) then markdownContent}
					{@html markdownContent}
				{/await}
			{/if}
		</div>
	{:else}
		<span class="placeholder">
			{preRoastPlaceholderText}
		</span>
	{/if}
{/if}

<style>
	.top {
		align-items: start;
		display: inline-grid;
		gap: 0.5rem;
		grid-template-columns: auto 1fr;

		:global(.logo svg) {
			translate: 0 0.25rem;
		}
	}

	h1 {
		font-size: 1.75rem;
		line-height: 1.125;
		margin: 0;
	}

	.pr-number {
		color: var(--c-text-light);
		margin-left: 0.125rem;
	}

	.placeholder {
		display: grid;
		place-items: center;
		text-align: center;
		background: #222;
		font-size: 1.25rem;
		color: var(--c-text-light);
		font-weight: 500;
		border-radius: 1rem;
		min-height: 20rem;

		@media (prefers-color-scheme: light) {
			background: #eaeaea;
		}
	}

	.status-text {
		font-size: 0.875rem;
		color: var(--c-text-light);
		text-align: center;
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
			white-space: break-spaces;
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
