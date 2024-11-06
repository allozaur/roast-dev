const faqQuestions = [
	{
		question: 'How exactly does Roast work?',
		answer: `Install our browser extension, connect your preferred LLM API key, and get instant code reviews for any PR. One click to analyze your code changes and get detailed feedback about quality, security, and potential improvements.`
	},
	{
		question: 'Can I try it before buying?',
		answer: `Yes! Start with 5 free roasts monthly – no credit card required. Get a feel for the tool before deciding to upgrade.`
	},
	{
		question: 'Do you offer refunds?',
		answer: `Yes, we offer a no-questions-asked refund within 7 days of purchase.`
	},
	{
		question: 'Is the lifetime license really lifetime?',
		answer: `Yes! You just need this one purchase to have a lifetime access to Roast including version updates and technical support via e-mail.`
	},
	{
		question: 'Which LLM models can I use with Roast?',
		answer: `All major AI models are supported, including ChatGPT, Claude, and Gemini. You'll need your own API key, giving you full control over which model reviews your code and associated costs.`
	},
	{
		question: 'Is my code private and secure?',
		answer: `Your code processing happens through your chosen LLM provider (like OpenAI or Anthropic) using your own API key – the same way as if you were pasting code into their chat. Roast itself never stores or processes your code on any servers. We're just the messenger connecting your PR to your chosen AI service.`
	},
	{
		question: 'How does the code processing work?',
		answer: `<ol>
    <li>Roast extracts your PR's diff directly in your browser</li>
    <li>Sends it to your chosen LLM using your API key</li>
    <li>Displays the results back in your browser</li>
</ol>
Think of it like copying code into ChatGPT, but automated and optimized for code review.`
	},
	{
		question: 'Do you store any code?',
		answer: `No. Roast is just a browser extension that helps you get AI code reviews. We don't have servers that store or process your code. The only data transmission happens between your browser and your chosen LLM provider using your own API key.`
	},
	{
		question: 'Can I use Roast with private repositories?',
		answer: `Yes! Since Roast works directly in your browser with your credentials, it works with both private and public repositories. The code is only shared with your chosen LLM provider through your own API key.`
	},
	{
		question: 'Why is it so cheap?',
		answer: `We believe good developer tools should be accessible. The early-bird price of $9 is our way of building a strong user base.`
	},
	{
		question: 'What about API costs?',
		answer: `You'll need your own LLM API key and will be responsible for any API usage costs. This typically costs a few cents per code review.`
	},
	{
		question: 'Which Git platforms work with Roast?',
		answer: `We currently support GitHub and GitLab support is in development.`
	},
	{
		question: 'How large of a PR can Roast handle?',
		answer: `The size limit depends on your chosen LLM's context window. For best results, we recommend keeping PRs under 2000 lines of code.`
	},
	{
		question: 'What languages and frameworks do you support?',
		answer: `Roast can review code in any programming language. The quality of feedback might vary depending on the LLM model you're using.`
	}
];

export default faqQuestions;
