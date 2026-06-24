# Web components

`vetro` ships **one** source tree but **two** built artifacts:

| Distribution       | Output                             | Consumer                              |
| ------------------ | ---------------------------------- | ------------------------------------- |
| **Vue library**    | `dist/lib/*` + `dist/lib/core.css` | Vue 3 apps with a bundler             |
| **Web Components** | `dist/webc/<kebab-name>.js`        | Any HTML page — no framework required |

A change that works in the library build can silently break the web-component build. Always test both when touching shared code.

## Authoring a web component

Copy an existing `.webc.ts` (e.g. `Button.webc.ts`) and edit:

- Live next to the SFC: `src/features/<feature>/components/<Name>/<Name>.webc.ts`.
- The build script auto-discovers `*.webc.ts` under `src/features/`.
- Output: `PrimaryButton.webc.ts` → `dist/webc/primary-button.js`.

## Key rules

- **Styles:** inject via `adoptSharedWebComponentStyles` and `virtual:core-styles`. Rewrite `:root` → `:host`.
- **Teleport:** never hardcode `to="body"`. Overlays must render inside the shadow root or they lose styles.
- **Popper:** use `positionFixed: true` — the shadow host becomes the offset parent.
- **Dependencies:** every npm dep bundled into a webc inflates that file. Avoid unnecessary runtime deps.

## Build

```sh
pnpm build:webc
# or
vp run task:build:webc
```

## Consuming

```html
<script
  type="module"
  src="https://cdn.example.com/vetro/button.js"
></script>
<vetro-button>Click me</vetro-button>
```

Prefix is configurable via the library `config` facade.

## See also

- [Architecture](./architecture.md) — dual distribution overview
- [Styling](./styling.md) — Shadow-DOM CSS mechanics
- [Conventions](./conventions.md) — hard boundaries
