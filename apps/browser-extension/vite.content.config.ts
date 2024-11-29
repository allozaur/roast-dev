// vite.content.config.ts
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
	build: {
		outDir: 'build',
		emptyOutDir: false, // Don't empty the directory as it contains other builds
		lib: {
			entry: resolve(__dirname, 'src/content/index.ts'),
			name: 'content',
			fileName: () => 'content.js',
			formats: ['iife']
		},
		rollupOptions: {
			output: {
				extend: true
			}
		}
	}
});
