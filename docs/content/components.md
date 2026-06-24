# Components

Feature-first component layout for Vetro UI.

## Folder shape

```
src/features/<feature>/components/<Name>/
  <Name>.vue
  <Name>.test.ts
  <Name>.stories.ts
  <Name>.webc.ts          # when shipped as a web component
  <name>.types.ts         # optional
  <name>.variants.ts      # optional — UnoCSS-scannable class strings
```

## Naming

- Vue `name`: `Vetro<Name>` via `defineOptions`.
- Custom element: `vetro-<kebab-case>` via `defineVetroElement`.
- Public exports live in `src/features/<feature>/index.ts` and roll up through `src/features/index.ts`.

## Overlays & teleports

Components that teleport (Dialog, Select, Menu, …) must use `useTeleportTarget()` instead of a hardcoded `to="body"` so web components keep overlays inside the shadow root.

Popper-based floating UI must use `usePopper` with `strategy: 'fixed'`.

## User-facing copy

Prefer props/slots over hardcoded labels. See [Conventions](./conventions.md).
