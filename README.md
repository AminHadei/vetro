# Vetro UI

Vue 3 + TypeScript **neo-brutalist** UI kit — a Vue port of [RetroUI](https://retroui.dev). Ships as both a Vue library (ESM/CJS) and standalone Web Components (Shadow DOM), styled with UnoCSS (wind4) and themeable via CSS variables (dark mode + colour themes).

## Installation

```bash
pnpm add vetro-ui
```

## Usage

### Vue plugin

Register all components globally:

```ts
import { createApp } from 'vue';
import VetroUI from 'vetro-ui';
import 'vetro-ui/style.css';

const app = createApp(App);
app.use(VetroUI, { prefix: 'Vetro' }); // optional prefix
```

Components are registered globally (or with the given prefix, e.g. `VetroButton`). See `src/entries/index.ts` for the installer and `src/entries/ui.ts` for the current component list.

### Individual imports

Import only what you need:

```ts
import { Button, Modal, Input } from 'vetro-ui/ui';
import 'vetro-ui/style.css';
```

### Utility functions

```ts
import { createVariants, prefixUnoClasses } from 'vetro-ui/utils';
```

### Types

```ts
import type { LibVueAppOptions } from 'vetro-ui/types';
```

### Web Components

Use without a bundler or framework. Available web components are built from `*.webc.ts` files under `src/features/` — run `pnpm build:webc` and check `dist/webc/` for the current list.

```html
<script type="module">
  import 'vetro-ui/web-components/button';
</script>

<vetro-button variant="default">Click Me</vetro-button>
```

## Package exports

| Import path                 | Contents                         |
| --------------------------- | -------------------------------- |
| `vetro-ui`                  | Everything + default Vue plugin  |
| `vetro-ui/ui`               | UI components only               |
| `vetro-ui/utils`            | Variant helpers, Uno utilities   |
| `vetro-ui/types`            | TypeScript types                 |
| `vetro-ui/style.css`        | Bundled CSS                      |
| `vetro-ui/web-components/*` | Individual web component bundles |

## Theming

Theme tokens are CSS variables injected through UnoCSS preflights (`tools/uno/theme.ts`). Switch palettes by toggling classes on a container: `dark`, `theme-purple`, `theme-lime`, `theme-red`, `theme-lavender`, `theme-orange`, `theme-green`, and `with-radius`.

## Development

### Prerequisites

- Node.js LTS (see `.nvmrc`)
- pnpm latest (enforced by `packageManager`)

### Setup

```bash
pnpm install
pnpm dev          # Vite dev server
pnpm storybook    # Storybook on :6006
```

### Commands

```
pnpm dev              # Dev server
pnpm storybook        # Storybook
pnpm playground       # Playground app
pnpm playground:webc  # Build webc + serve webc playground
pnpm build            # Full build (lib + web components)
pnpm build:lib        # Vue library only
pnpm build:webc       # Web components only
pnpm test             # Tests (watch mode)
pnpm coverage         # Tests with coverage report
pnpm lint             # Oxlint
pnpm format           # Oxfmt check
pnpm format:fix       # Oxfmt fix
pnpm typecheck        # vue-tsc
pnpm css:check        # Validate CSS bundle output
pnpm changeset        # Record a user-visible change
pnpm changeset:status # Show pending changesets and next version
pnpm docs:dev         # VitePress handbook
```

### AI-assisted workflows

The project ships skills and slash commands shared across Claude Code, Cursor, Codex CLI, and Gemini CLI. Canonical bodies live in [`.agents/`](./.agents/); per-tool shims live in [`.claude/`](./.claude/) and [`.cursor/`](./.cursor/). See [AGENTS.md](./AGENTS.md) for orientation.

### Local development in a consumer project

To use a local build of `vetro-ui` in another project without publishing:

```bash
# In vetro — register the package globally and watch for changes
pnpm build:lib
vp link

# In the consumer project — point at the local build
vp link vetro-ui
```

Re-run `pnpm build:lib` in vetro whenever you change something; the consumer project picks up the new build automatically.

When done, unlink in both places:

```bash
# In the consumer project
pnpm unlink vetro-ui && pnpm install

# In vetro
pnpm unlink --global
```

### Contributing

1. Create a feature branch from `main`
2. Make changes, co-locate tests (`.test.ts`) and stories (`.stories.ts`) next to components
3. If the change is user-visible, run `pnpm changeset` and commit the generated `.changeset/*.md` file
4. Run `pnpm lint && pnpm format && pnpm typecheck && pnpm test`
5. Commit with [Conventional Commits](https://www.conventionalcommits.org/)
6. Open a pull request against `main` on [GitHub](https://github.com/AminHadei/vetro)

Pre-commit hooks (Husky) enforce linting, formatting, and commit message conventions automatically.

## Versioning

Versions are managed by [Changesets](https://github.com/changesets/changesets). See [docs/content/changesets.md](./docs/content/changesets.md) or run `pnpm docs:dev` for the full guide.

## Further reading

- **Live docs:** [aminhadei.github.io/vetro](https://aminhadei.github.io/vetro/)
- **Component demo (Storybook):** [aminhadei.github.io/vetro/storybook](https://aminhadei.github.io/vetro/storybook/)
- **Repository:** [github.com/AminHadei/vetro](https://github.com/AminHadei/vetro)
- [AGENTS.md](./AGENTS.md) — orientation for AI coding tools
- [docs/](./docs/content/index.md) — developer handbook (`pnpm docs:dev` to preview locally)
- [CHANGELOG.md](./CHANGELOG.md) — version history
