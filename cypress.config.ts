import { defineConfig } from 'cypress';

export default defineConfig({
	projectId: 'currency',
	e2e: {
		baseUrl: 'http://localhost:3000',
		video: false,
		supportFile: false,
	},
});
