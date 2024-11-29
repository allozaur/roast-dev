// vite.background.config.ts
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
	build: {
		outDir: 'build',
		emptyOutDir: false,
		lib: {
			entry: resolve(__dirname, 'src/background/index.ts'),
			name: 'background',
			fileName: () => 'background.js',
			formats: ['iife']
		},
		rollupOptions: {
			output: {
				extend: true
			}
		}
	}
});
