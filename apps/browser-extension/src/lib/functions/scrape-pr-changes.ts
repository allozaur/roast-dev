interface Change {
	fileName: string;
	content: string;
}

export default function scrapePRChanges() {
	const files = document.querySelectorAll('copilot-diff-entry');
	const changes: Change[] = [];

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

	return changes
		.map(
			(file) => `
File: ${file.fileName}
${file.content}
`
		)
		.join('\n---\n\n');
}
