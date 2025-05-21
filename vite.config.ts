import { defineConfig } from "vite"
import { fileURLToPath } from "node:url"

import vue from "@vitejs/plugin-vue"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url))
		}
	},
	clearScreen: false,
	server: {
	  port: 5173,
	  proxy: {
		"/api": {
		  target: process.env.VITE_API_BASE_URL,
		  changeOrigin: true,
		  rewrite: (path) => path.replace(/^\/api/, ""),
		},
	  },
	}
})
