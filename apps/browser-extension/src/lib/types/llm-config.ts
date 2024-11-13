export interface LLMConfig {
	endpoint: string;
	headers: (apiKey: string) => Record<string, string>;
	buildBody: (messages: { content?: string; role?: string }[]) => unknown;
	extractResponse: (data: {
		content?: { text: string }[]; // Anthropic
		choices?: { message: { content?: string; role?: string } }[]; // OpenAI
		candidates?: { content: { parts: { text: string }[] } }[]; // Google
		role?: string; // Anthropic
	}) => { content?: string; role?: string };
}
