import type { Preview } from '@storybook/vue3-vite';
import { initialize, mswLoader } from 'msw-storybook-addon';

import '@unocss/reset/tailwind.css';
import 'virtual:uno.css';
import './styles.css';

initialize({
  onUnhandledRequest: 'bypass',
  serviceWorker: { url: './mockServiceWorker.js' },
});

const preview: Preview = {
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'retro',
      values: [
        { name: 'retro', value: '#f5ece7' },
        { name: 'white', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
  loaders: [mswLoader],
};

export default preview;
