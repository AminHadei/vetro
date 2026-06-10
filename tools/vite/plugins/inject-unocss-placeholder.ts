import { resolve } from 'node:path';

import type { Plugin } from 'vite-plus';

/**
 * Vite plugin to inject `virtual:uno.css` into the main entry file so the
 * generated UnoCSS bundle (including theme tokens) is emitted as `core.css`.
 */
export function injectUnoCSSPlaceholder(): Plugin {
  return {
    name: 'inject-unocss-placeholder',
    enforce: 'pre',
    transform(
      code: string,
      id: string,
    ): {
      code: string;
      map: null;
    } | null {
      if (id !== resolve(__dirname, '../../../src/entries/index.ts')) {
        return null;
      }

      if (code.includes('virtual:uno.css')) {
        return null;
      }

      return {
        code: `import "virtual:uno.css";\n${code}`,
        map: null,
      };
    },
  };
}
