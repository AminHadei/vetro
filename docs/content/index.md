---
layout: home

hero:
  name: 'Vetro UI'
  text: Developer docs
  tagline: Vue 3 + TypeScript neo-brutalist UI kit — a Vue port of RetroUI. Ships as both a library and standalone Web Components.
  actions:
    - theme: brand
      text: Get started
      link: /getting-started
    - theme: alt
      text: Architecture
      link: /architecture
    - theme: alt
      text: Storybook ↗
      link: https://aminhadei.github.io/vetro/storybook/

features:
  - icon: 🚀
    title: Getting started
    details: Install, run, and ship a first change. Commands, env, and the toolchain in one page.
    link: /getting-started
    linkText: Start here
  - icon: 🧭
    title: Architecture
    details: Mental model, feature-first layout, dual-distribution (lib + web components).
    link: /architecture
    linkText: Read the architecture
  - icon: 🌐
    title: Web components
    details: The webc build, Shadow-DOM style injection, dual-build pitfalls.
    link: /web-components
    linkText: Web components
  - icon: 🎨
    title: Styling
    details: 'UnoCSS wind4 preset, theme tokens, the :uno: prefix and Shadow-DOM CSS.'
    link: /styling
    linkText: Styling
  - icon: 🧪
    title: Testing
    details: Vitest via vite-plus/test, MSW, VTU2 quirks.
    link: /testing
    linkText: Testing
  - icon: 📦
    title: Changesets & releases
    details: Record changes on feature branches and the maintainer release flow on `main`.
    link: /changesets
    linkText: Changesets
---

<div style="max-width: 980px; margin: 3rem auto 0; padding: 0 24px;">

## When to read what

| I'm about to…                         | Read                                                                |
| ------------------------------------- | ------------------------------------------------------------------- |
| Install and run for the first time    | [Getting started](./getting-started.md)                             |
| Add a new component                   | [Architecture](./architecture.md) + [Conventions](./conventions.md) |
| Expose a component as a web component | [Web components](./web-components.md)                               |
| Style anything                        | [Styling](./styling.md)                                             |
| Write tests                           | [Testing](./testing.md)                                             |
| Record a user-visible change          | [Changesets](./changesets.md)                                       |
| Check a code-review rule              | [Conventions](./conventions.md)                                     |
| Write a commit message                | [Git conventions](./git-conventions.md)                             |
| Touch CI                              | [CI](./ci.md)                                                       |

## Live site

Handbook and component demos are deployed from `main` via GitHub Pages:

- [aminhadei.github.io/vetro](https://aminhadei.github.io/vetro/) — docs
- [aminhadei.github.io/vetro/storybook](https://aminhadei.github.io/vetro/storybook/) — Storybook

## Project at a glance

- **Stack:** Vue 3 + TypeScript strict, UnoCSS (wind4), Vite+ toolchain, ECharts for charts.
- **Two distributions:** Vue library (`dist/lib/`) and standalone Web Components (`dist/webc/`) from one source tree.
- **Tests:** Vitest via `vite-plus/test` + `@vue/test-utils` v2 + jsdom + MSW.
- **Package manager:** pnpm (wrapped by Vite+; prefer `vp` commands).
- **Versioning:** Changesets. Never edit `package.json` version or `CHANGELOG.md` by hand.

</div>
