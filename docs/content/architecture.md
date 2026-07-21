# Architecture

Technical architecture of **Vetro UI** (`vetro`). For installation and commands see [Getting started](./getting-started.md).

## Dual distribution

The library produces two outputs from a single source tree:

1. **Vue library** (`dist/lib/`) — multi-entry ESM (`.mjs`) + CJS (`.cjs`). Vue is externalized as a peer dependency. Types emitted to `dist/types/` via `vite-plugin-dts`. CSS extracted to `dist/lib/core.css`.
2. **Web Components** (`dist/webc/`) — self-contained Shadow-DOM bundles, one file per component. Each includes the Vue runtime, component code, and injected styles.

Build configs live in `tools/vite/`:

- `vite.lib.config.ts` — Vite library mode with multiple entry points (`src/entries/*.ts`).
- `build-webc.ts` — scans `src/features/**/*.webc.ts`, builds each as an independent IIFE bundle.

Key constraint: `@popperjs/core` is aliased to its UMD build in the web-component config. Popper-based components must use `positionFixed: true` inside Shadow DOM. See [Web components](./web-components.md).

## Feature-based architecture

Components are organized by domain under `src/features/`:

```
src/features/
  buttons/        # Button, IconButton
  charts/         # BarChart, LineChart, PieChart, AreaChart (ECharts)
  command/        # Command palette
  data-display/   # Badge, Text, Loader, Progress, Table, …
  feedback/       # Dialog, Drawer, Tooltip, Popover, Alert, Toaster
  forms/          # Input, Select, Checkbox, Calendar, …
  media/          # Carousel
  navigation/     # Tabs, Accordion, Menu, Breadcrumb, …
  shared/         # Composables, utilities
```

Each component follows the same shape:

```
components/<ComponentName>/
  <ComponentName>.vue
  <ComponentName>.test.ts
  <ComponentName>.stories.ts
  <ComponentName>.webc.ts      # optional — web component wrapper
index.ts                       # feature public surface
```

## Directory layout

```
src/
  entries/          # Public API entry files (one per package subpath export)
  features/         # Feature-first organization
  config.ts         # Library runtime config (web-component prefix)
tools/
  vite/             # lib + webc build configs
  storybook/        # Storybook config
  vitest/setup.ts   # Global test setup
  ci/               # GitHub Actions helpers
  husky/            # Git hooks
playground/         # Manual testing workspace
docs/               # VitePress site (this site)
```

## Entry layer

`src/entries/` contains one file per `package.json` export:

| Entry file | Export path      | Content                           |
| ---------- | ---------------- | --------------------------------- |
| `index.ts` | `vetro-ui`       | Vue plugin installer + re-exports |
| `ui.ts`    | `vetro-ui/ui`    | UI components                     |
| `utils.ts` | `vetro-ui/utils` | Utilities                         |
| `types.ts` | `vetro-ui/types` | Type-only exports                 |

Web components are exposed individually via the `./web-components/*` wildcard export.

## See also

- [Web components](./web-components.md) — dual-build pitfalls and the webc recipe
- [Styling](./styling.md) — UnoCSS, theme tokens, Shadow-DOM CSS
- [CI](./ci.md) — pipeline stages
