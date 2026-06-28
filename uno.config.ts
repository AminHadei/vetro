import { resolve } from 'node:path';

import { createRemToPxProcessor } from '@unocss/preset-wind4/utils';
import {
  defineConfig,
  presetIcons,
  presetWind4,
  transformerCompileClass,
  type SourceCodeTransformer,
} from 'unocss';

import { iconCollections } from './tools/uno/icons';
import { themePreflight } from './tools/uno/theme';

const __dirname = import.meta.dirname;

const config = {
  safelist: ['i-calendar', 'i-calendar size-4'],
  presets: [
    presetWind4({
      preflights: {
        reset: false,
        property: {
          parent: false,
        },
        theme: {
          process: createRemToPxProcessor(),
        },
      },
    }),
    presetIcons({
      collections: iconCollections,
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
      customizations: {
        customize(props) {
          props.width = props.width ?? '1em';
          props.height = props.height ?? '1em';
          return props;
        },
      },
    }),
  ],
  content: {
    pipeline: {
      include: [resolve(__dirname, 'src/features/**/*.{vue,ts}')],
      exclude: [resolve(__dirname, '**/composables/**/*.ts')],
    },
  },
  preflights: [
    {
      getCSS: (): string => themePreflight,
    },
  ],
  theme: {
    colors: {
      current: 'currentColor',
      transparent: 'transparent',
      background: 'var(--background)',
      foreground: 'var(--foreground)',
      card: 'var(--card)',
      'card-foreground': 'var(--card-foreground)',
      popover: 'var(--popover)',
      'popover-foreground': 'var(--popover-foreground)',
      primary: 'var(--primary)',
      'primary-hover': 'var(--primary-hover)',
      'primary-foreground': 'var(--primary-foreground)',
      secondary: 'var(--secondary)',
      'secondary-hover': 'var(--secondary-hover)',
      'secondary-foreground': 'var(--secondary-foreground)',
      'secondary-hover-foreground': 'var(--secondary-hover-foreground)',
      muted: 'var(--muted)',
      'muted-foreground': 'var(--muted-foreground)',
      accent: 'var(--accent)',
      'accent-foreground': 'var(--accent-foreground)',
      destructive: 'var(--destructive)',
      'destructive-foreground': 'var(--destructive-foreground)',
      border: 'var(--border)',
      input: 'var(--input)',
      ring: 'var(--ring)',
      'badge-default-bg': 'var(--badge-default-bg)',
      'badge-default-text': 'var(--badge-default-text)',
    },
    font: {
      head: ['Archivo Black', 'ui-sans-serif', 'sans-serif'],
      sans: ['Space Grotesk', 'ui-sans-serif', 'sans-serif'],
      mono: ['Space Mono', 'ui-monospace', 'monospace'],
    },
    radius: {
      DEFAULT: 'var(--radius)',
      none: '0px',
      xs: 'var(--radius)',
      sm: 'var(--radius)',
      md: 'var(--radius)',
      lg: 'var(--radius)',
      xl: 'var(--radius)',
      '2xl': 'var(--radius)',
      '3xl': 'var(--radius)',
    },
    shadow: {
      xs: '1px 1px 0 0 var(--border)',
      sm: '2px 2px 0 0 var(--border)',
      DEFAULT: '3px 3px 0 0 var(--border)',
      md: '4px 4px 0 0 var(--border)',
      lg: '6px 6px 0 0 var(--border)',
      xl: '10px 10px 0 1px var(--border)',
      '2xl': '16px 16px 0 1px var(--border)',
      none: '0 0 #0000',
    },
  },
  transformers: [] as SourceCodeTransformer[],
};

if (process.env['NODE_ENV'] === 'production' && process.env['MODE'] !== 'test') {
  config.transformers.push(transformerCompileClass());
}

export default defineConfig(config);
