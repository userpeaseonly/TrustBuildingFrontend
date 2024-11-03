import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    sourcemap: false // Disables source maps
  },
  server: {
    host: '0.0.0.0', // Allows the server to be accessible externally
    port: 5173,      // Specify the port to use
  }
})
