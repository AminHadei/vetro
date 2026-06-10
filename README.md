# Vetro UI

A Vue 3 + TypeScript **neo-brutalist** component library — a Vue port of [RetroUI](https://retroui.dev)

Vetro ships both as a Vue component library and as framework-agnostic web components, styled with UnoCSS (wind4) and themeable via CSS variables (dark mode + colour themes).

## Requirements

- Node `24` (see `.nvmrc`)
- pnpm `11`

## Getting started

```bash
pnpm install
```

## Commands

| Command                         | Description                          |
| ------------------------------- | ------------------------------------ |
| `pnpm dev`                      | Vite dev server (vite-plus)          |
| `pnpm storybook`                | Run Storybook on port 6006           |
| `pnpm playground`               | Run the local playground app         |
| `pnpm build`                    | Build the library and web components |
| `pnpm build:lib`                | Build the Vue component library      |
| `pnpm build:webc`               | Build the custom-element bundles     |
| `pnpm test`                     | Run Vitest                           |
| `pnpm typecheck`                | Type-check with `vue-tsc`            |
| `pnpm lint` / `pnpm format:fix` | Lint / format with vite-plus         |

## Project layout

```
src/
  config.ts                 # runtime config (web-component prefix, image component)
  entries/                  # public API entry points (core / ui / utils / types)
  features/
    <category>/             # buttons, forms, data-display, feedback, navigation, media
      components/<Name>/     # <Name>.vue + .types.ts + .test.ts + .stories.ts + .webc.ts
    shared/lib/utils/        # shared helpers (variants, web-component styles)
tools/
  uno/                      # icon collection + neo-brutalist theme tokens
  vite/                     # lib build, web-component build, plugins
  storybook/                # Storybook config
  vitest/                   # test setup
playground/                 # local demo app
```

## Theming

Theme tokens are CSS variables injected through UnoCSS preflights (`tools/uno/theme.ts`).
Switch palettes by toggling classes on a container: `dark`, `theme-purple`, `theme-lime`,
`theme-red`, `theme-lavender`, `theme-orange`, `theme-green`, and `with-radius`.
