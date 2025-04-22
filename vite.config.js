import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('vue')) return 'vue'
            if (id.includes('lottie-web')) return 'lottie'
            if (id.includes('axios')) return 'axios'
            if (id.includes('vue-router')) return 'vue-router'
            return 'vendor'
          }
        }
      }
    }
  }
})
