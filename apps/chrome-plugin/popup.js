// popup.js
const CONFIG_PROMPT = `Here's my PR diff — roast this code in any way you find applicable.

I want you to be funny, edgy and smart, but organized & structured in your response. Point out exact lines of code that are bad, and explain why. Be picky about security, DRY, style, scalability, good practices & naming. Be particularly brutal about security and scalability.

Highlight obvious issues like typos, bad syntax or anti-patterns.

At the same time I want you to be constructive - point out issues and provide real solutions.

Also, if you see that the code is well-written, point it out just at the end, but do this in a funny way.

Overall, try not to be too verbose, but take your time with the roasting.`;

const ROASTS_STORAGE_KEY = 'savedRoasts';

async function saveRoast(prTitle, roastContent) {
  const roasts = await loadRoasts();
  const newRoast = {
    id: Date.now(),
    title: prTitle || 'Untitled PR',
    content: roastContent,
    date: new Date().toISOString()
  };

  roasts.unshift(newRoast);
  await chrome.storage.local.set({ [ROASTS_STORAGE_KEY]: roasts });
  return newRoast;
}

async function loadRoasts() {
  const result = await chrome.storage.local.get([ROASTS_STORAGE_KEY]);
  return result[ROASTS_STORAGE_KEY] || [];
}

async function deleteRoast(id) {
  const roasts = await loadRoasts();
  const updatedRoasts = roasts.filter(roast => roast.id !== id);
  await chrome.storage.local.set({ [ROASTS_STORAGE_KEY]: updatedRoasts });
}

async function getRoast(diffText) {
  const apiKey = document.getElementById('apiKey').value.trim();

  if (!apiKey) {
    throw new Error('Please enter your Claude API key');
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 4096,
        messages: [{
          role: 'user',
          content: `${CONFIG_PROMPT}\n\nHere's the code:\n\n${diffText}`
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('API Error:', errorData);

      if (response.status === 401) {
        throw new Error('Invalid API key. Please check your API key and try again.');
      }
      throw new Error(`API request failed: ${errorData}`);
    }

    const data = await response.json();
    return data.content[0].text;
  } catch (error) {
    console.error('Request Error:', error);
    throw error;
  }
}

function scrapePRChanges() {
  const files = document.querySelectorAll('copilot-diff-entry');
  const changes = [];

  files.forEach(file => {
    const fileHeader = file.querySelector('.file-header');
    const fileName = fileHeader?.getAttribute('data-path') || 'unknown file';

    const lines = file.querySelectorAll('.blob-code');
    let fileContent = '';

    lines.forEach(line => {
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

  return changes.map(file => `
File: ${file.fileName}
${file.content}
`).join('\n---\n\n');
}

async function saveRoast(prTitle, roastContent, prUrl) {
  const roasts = await loadRoasts();
  const newRoast = {
    id: Date.now(),
    title: prTitle || 'Untitled PR',
    content: roastContent,
    date: new Date().toISOString(),
    url: prUrl
  };

  roasts.unshift(newRoast);
  await chrome.storage.local.set({ [ROASTS_STORAGE_KEY]: roasts });
  return newRoast;
}

// Update displayRoastsList function to show content and PR link
async function displayRoastsList() {
  const roastsList = document.getElementById('roastsList');
  const roasts = await loadRoasts();

  roastsList.innerHTML = roasts.map(roast => `
    <div class="roast-item" data-id="${roast.id}">
      <div class="roast-header">
        <div class="roast-title-section">
          <span class="expand-indicator">▶</span>
          <div class="roast-title">${escapeHtml(roast.title)}</div>
          <div class="roast-meta">${new Date(roast.date).toLocaleDateString()}</div>
        </div>
        <div class="roast-actions">
          ${roast.url ? `
            <a href="${escapeHtml(roast.url)}" target="_blank" class="pr-link">
              <button class="action-button">Go to PR</button>
            </a>
          ` : ''}
          <button class="action-button delete-roast" data-id="${roast.id}">Delete</button>
        </div>
      </div>
      <div class="roast-content markdown-body">
        ${marked.parse(roast.content)}
      </div>
    </div>
  `).join('');

  // Add click handlers for collapsible content
  roastsList.querySelectorAll('.roast-header').forEach(header => {
    header.addEventListener('click', (e) => {
      // Don't toggle if clicking action buttons
      if (e.target.closest('.roast-actions')) {
        return;
      }

      const roastItem = header.closest('.roast-item');
      const content = roastItem.querySelector('.roast-content');
      const indicator = roastItem.querySelector('.expand-indicator');

      content.classList.toggle('expanded');
      indicator.classList.toggle('expanded');
    });
  });

  // Prevent PR link clicks from toggling expansion
  roastsList.querySelectorAll('.pr-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  });

  // Prevent delete button clicks from toggling expansion
  roastsList.querySelectorAll('.delete-roast').forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(button.dataset.id);
      deleteRoast(id).then(() => displayRoastsList());
    });
  });
}
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function switchTab(tabId) {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.tab === tabId);
  });

  document.getElementById('newRoastTab').style.display = tabId === 'new' ? 'block' : 'none';
  document.getElementById('historyTab').style.display = tabId === 'history' ? 'block' : 'none';

  if (tabId === 'history') {
    displayRoastsList();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const roastButton = document.getElementById('roastButton');
  const apiKeyInput = document.getElementById('apiKey');
  const toggleVisibility = document.getElementById('toggleVisibility');

  // Load saved API key
  chrome.storage.local.get(['claudeApiKey'], (result) => {
    if (result.claudeApiKey) {
      apiKeyInput.value = result.claudeApiKey;
      roastButton.disabled = false;
    }
  });

  // Handle tabs
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      switchTab(tab.dataset.tab);
    });
  });

  // API key input handler
  apiKeyInput.addEventListener('input', () => {
    const apiKey = apiKeyInput.value.trim();
    roastButton.disabled = !apiKey;

    if (apiKey) {
      chrome.storage.local.set({ claudeApiKey: apiKey });
    }
  });

  // Toggle visibility handler
  toggleVisibility.addEventListener('click', () => {
    const type = apiKeyInput.type === 'password' ? 'text' : 'password';
    apiKeyInput.type = type;
    toggleVisibility.textContent = type === 'password' ? '👁️' : '🔒';
  });

  // Load initial roasts list
  displayRoastsList();

  // Roast button click handler
  document.getElementById('roastButton').addEventListener('click', async () => {
    const statusEl = document.getElementById('status');
    const loadingEl = document.getElementById('loading');
    const responseEl = document.getElementById('response');
    const roastButton = document.getElementById('roastButton');

    statusEl.textContent = 'Extracting changes...';
    responseEl.style.display = 'none';
    loadingEl.style.display = 'flex';
    roastButton.disabled = true;

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      const results = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: async () => {
          // This function runs in the context of the GitHub page
          const prTitle = document.querySelector('.js-issue-title')?.textContent.trim() || 'Untitled PR';

          const files = document.querySelectorAll('copilot-diff-entry');
          const changes = [];

          files.forEach(file => {
            const fileHeader = file.querySelector('.file-header');
            const fileName = fileHeader?.getAttribute('data-path') || 'unknown file';
            const lines = file.querySelectorAll('.blob-code');
            let fileContent = '';

            lines.forEach(line => {
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

          const formattedChanges = changes.map(file => `
File: ${file.fileName}
${file.content}
`).join('\n---\n\n');

          return { changes: formattedChanges, title: prTitle };
        }
      });

      if (results && results[0]?.result) {
        const { changes, title } = results[0].result;
        statusEl.textContent = 'Getting roast from Claude...';

        marked.setOptions({
          gfm: true,
          breaks: true,
          sanitize: true,
          smartLists: true,
          smartypants: true,
          highlight: function (code, lang) {
            return code;
          }
        });

        const roastResponse = await getRoast(changes);

        // Save the roast
        await saveRoast(title, roastResponse);

        // Display the roast
        responseEl.innerHTML = marked.parse(roastResponse);
        responseEl.style.display = 'block';
        statusEl.textContent = 'Roast delivered! 🔥';

        // Update history if visible
        if (document.getElementById('historyTab').style.display !== 'none') {
          await displayRoastsList();
        }
      } else {
        statusEl.textContent = 'No changes found. Are you on a PR "Files changed" page?';
      }
    } catch (error) {
      statusEl.textContent = `Error: ${error.message}`;
      console.error('Error:', error);
    } finally {
      loadingEl.style.display = 'none';
      roastButton.disabled = false;
    }

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      const results = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: async () => {
          const prTitle = document.querySelector('.js-issue-title')?.textContent.trim() || 'Untitled PR';
          const prUrl = window.location.href;
          // ... rest of the scraping code ...
          return { changes: formattedChanges, title: prTitle, url: prUrl };
        }
      });

      if (results && results[0]?.result) {
        const { changes, title, url } = results[0].result;
        statusEl.textContent = 'Getting roast from Claude...';

        const roastResponse = await getRoast(changes);

        // Save the roast with URL
        await saveRoast(title, roastResponse, url);

        // Switch to history tab after generation
        switchTab('history');
        await displayRoastsList();
      }
    } catch (error) {
      statusEl.textContent = `Error: ${error.message}`;
      console.error('Error:', error);
    } finally {
      loadingEl.style.display = 'none';
      roastButton.disabled = false;
    }
  });
});