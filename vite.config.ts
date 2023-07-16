import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx';
import { ElectronDevPlugin } from './plugins/vite.electron.dev';
import { ElectronBuild } from './plugins/vite.electron.build';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    ElectronDevPlugin(),
    ElectronBuild(),
  ],
  base: './', // 默认是绝对路径 /   改成相对路径 ./   不然会白屏
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
