import { defineConfig } from 'vitepress';

const docsBase = process.env['DOCS_BASE'] ?? '/';

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  title: 'Vetro UI',
  titleTemplate: ':title — Vetro UI Docs',
  description: 'Developer documentation for the Vetro UI component library.',
  base: docsBase,
  srcDir: 'content',
  cleanUrls: true,
  metaChunk: true,
  lastUpdated: true,
  ignoreDeadLinks: [/^(\.\/)?\.\.\//],
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${docsBase}favicon.svg` }],
    ['meta', { name: 'theme-color', content: '#000000' }],
    ['meta', { name: 'color-scheme', content: 'light dark' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Vetro UI Docs' }],
    [
      'meta',
      {
        property: 'og:description',
        content: 'Developer documentation for the Vetro UI neo-brutalist component library.',
      },
    ],
  ],
  themeConfig: {
    // VitePress prepends `base` to themeConfig logo paths — do not include docsBase here.
    logo: { src: '/favicon.svg', alt: 'Vetro UI', width: 24, height: 24 },
    siteTitle: 'Vetro UI',
    externalLinkIcon: true,
    editLink: {
      pattern: 'https://github.com/AminHadei/vetro/edit/main/docs/content/:path',
      text: 'Edit this page on GitHub',
    },
    docFooter: { prev: 'Previous', next: 'Next' },
    footer: {
      message: 'Vetro UI — Vue 3 neo-brutalist component library.',
      copyright: `© ${new Date().getFullYear()} Vetro`,
    },
    nav: [
      { text: 'Getting started', link: '/getting-started' },
      { text: 'Architecture', link: '/architecture' },
      { text: 'Storybook', link: 'https://aminhadei.github.io/vetro/storybook/' },
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/AminHadei/vetro' }],
    sidebar: [
      {
        text: 'Foundation',
        items: [
          { text: 'Introduction', link: '/' },
          { text: 'Getting started', link: '/getting-started' },
          { text: 'Architecture', link: '/architecture' },
          { text: 'Conventions', link: '/conventions' },
          { text: 'Git conventions', link: '/git-conventions' },
        ],
      },
      {
        text: 'UI',
        items: [
          { text: 'Styling', link: '/styling' },
          { text: 'Component parity', link: '/component-parity' },
          { text: 'Web components', link: '/web-components' },
        ],
      },
      {
        text: 'Quality',
        items: [
          { text: 'Testing', link: '/testing' },
          { text: 'CI', link: '/ci' },
        ],
      },
      {
        text: 'Releases',
        items: [{ text: 'Changesets & versioning', link: '/changesets' }],
      },
    ],
    outline: { level: [2, 3] },
    search: { provider: 'local' },
  },
});
