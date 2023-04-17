import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 解决不能使用@作为路径问题
import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve('src')
    }
  },
  define: {
    // 'process.dev': {},
  },
})
