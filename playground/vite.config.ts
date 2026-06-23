import { resolve } from 'node:path';

import vue from '@vitejs/plugin-vue';
import unoCSS from 'unocss/vite';
import { defineConfig } from 'vite-plus';

const __dirname = import.meta.dirname;

export default defineConfig({
  plugins: [vue(), unoCSS({ configFile: resolve(__dirname, '../uno.config.ts') })],
  resolve: {
    alias: {
      '@': resolve(__dirname, '../src'),
    },
  },
});
