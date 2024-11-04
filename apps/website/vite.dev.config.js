import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { existsSync, readFileSync } from 'fs';

/**
 * @type {{ cert: Buffer | undefined; key: Buffer | undefined }}
 */
const serverOptions = {
	cert: undefined,
	key: undefined
};

const certPath = '../../certs/roast-dev.dev.pem';
const keyPath = '../../certs/roast-dev.dev-key.pem';

if (existsSync(certPath) && existsSync(keyPath)) {
	serverOptions.cert = readFileSync(certPath);
	serverOptions.key = readFileSync(keyPath);
}

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		https: existsSync(certPath) && existsSync(keyPath) ? serverOptions : undefined,
	},
	test: {
		include: ['src/**/*.spec.js']
	}
});
