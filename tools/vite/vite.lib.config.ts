import { resolve } from 'node:path';

import vue from '@vitejs/plugin-vue';
import unoCSS from 'unocss/vite';
import dts from 'vite-plugin-dts';
import { defineConfig, mergeConfig } from 'vite-plus';

import { injectUnoCSSPlaceholder } from './plugins/inject-unocss-placeholder';
import { prefixUnoClassAttributes } from './plugins/prefix-uno-class-attributes';
import sharedConfig from './vite.shared.config';

// Build configuration for the Vue 3 component library.
export default mergeConfig(
  sharedConfig,
  defineConfig({
    plugins: [
      injectUnoCSSPlaceholder(),
      prefixUnoClassAttributes(),
      vue(),
      unoCSS(),
      dts({
        tsconfigPath: resolve(__dirname, '../../tsconfig.json'),
        outDirs: [resolve(__dirname, '../../dist/types')],
        exclude: ['**/*.stories.*', '**/*.test.*', 'tools/**/*'],
      }),
    ],
    build: {
      minify: 'esbuild',
      lib: {
        entry: {
          core: resolve(__dirname, '../../src/entries/index.ts'),
          ui: resolve(__dirname, '../../src/entries/ui.ts'),
          utils: resolve(__dirname, '../../src/entries/utils.ts'),
          types: resolve(__dirname, '../../src/entries/types.ts'),
        },
        name: 'Vetro',
        cssFileName: 'core',
        formats: ['es', 'cjs'],
        fileName: (format, entryName) => {
          const ext = format === 'es' ? 'mjs' : 'cjs';
          return `${entryName}.${ext}`;
        },
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          exports: 'named',
          preserveModules: false,
          inlineDynamicImports: false,
          manualChunks: () => 'core',
          globals: {
            vue: 'Vue',
          },
        },
      },
      outDir: 'dist/lib',
      emptyOutDir: true,
    },
  }),
);
