export interface LLMConfig {
	endpoint: string;
	headers: (apiKey: string) => Record<string, string>;
	buildBody: (prompt: string, code: string) => unknown;
	extractResponse: (data: {
		content?: { text: string }[];
		choices?: { message: { content: string | undefined } }[];
		candidates?: { content: { parts: { text: string }[] } }[];
	}) => string;
}
