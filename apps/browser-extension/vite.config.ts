import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import { resolve } from 'path';

export default defineConfig({
	plugins: [sveltekit()],

	envDir: resolve(__dirname, '../../'),

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
