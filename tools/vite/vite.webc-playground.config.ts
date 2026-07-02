import { resolve } from 'node:path';

import vue from '@vitejs/plugin-vue';
import unoCSS from 'unocss/vite';
import { defineConfig } from 'vite-plus';

const repoRoot = resolve(import.meta.dirname, '../..');

/** Serves playground/webc.html with a Vue shell over registered vetro-* custom elements. */
export default defineConfig({
  root: repoRoot,
  plugins: [vue(), unoCSS({ configFile: resolve(repoRoot, 'uno.config.ts') })],
  resolve: {
    alias: {
      '@': resolve(repoRoot, 'src'),
    },
  },
  server: {
    open: '/playground/webc.html',
  },
});
