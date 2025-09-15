import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    sourcemap: false,
  },
  resolve: {
    alias: {
      vue: "vue/dist/vue.esm-bundler.js"
    }
  },
  server: {
    host: true,          // allows network access
    port: 5173,          // default port
    strictPort: false,
    https: false,        // important: disable HTTPS
  },
})
