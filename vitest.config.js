import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		globals: true,
		environment: 'jsdom',
		include: ['src/**/*.{test,spec,e2e}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
	},
	resolve: {
		alias: {
			'~': path.resolve(__dirname, 'src'),
		},
	},
	plugins: [],
});
