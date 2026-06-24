# Styling

How CSS is authored, scanned, compiled, and shipped in `vetro`.

## Toolchain

| Tool                                  | Role                                            |
| ------------------------------------- | ----------------------------------------------- |
| **UnoCSS** (wind4 preset)             | Atomic utility CSS                              |
| **`transformerCompileClass`**         | Compacts `:uno:` blocks into hashed class names |
| **`tools/ci/validate-output-css.sh`** | Post-build validator (`pnpm css:check`)         |

The single source of truth is [`uno.config.ts`](../../uno.config.ts).

## Writing styles in SFCs

Use UnoCSS utilities in templates. For long class lists in production builds, wrap with the `:uno:` prefix:

```vue
<div :uno="'flex items-center gap-2 p-4 border-2 border-black'">
```

In `<script>` contexts where UnoCSS should not scan strings, use `@unocss-skip-start` / `@unocss-skip-end`.

## Theme tokens

Neo-brutalist tokens live in `tools/uno/theme.ts` and are wired through `uno.config.ts`. Check existing tokens before adding new hardcoded colors.

## The `task:css:check` validator

After `pnpm build:lib`, `tools/ci/validate-output-css.sh` scans `dist/lib/core.css` for bare utility selectors that should have been compiled away.

Allowed prefixes: `vc-`, `i-`, `uno-`, `vetro-`.

Run via:

```sh
pnpm css:check
# or
vp run task:css:check
```

If it fails, fix with `:uno:` or skip comments — never loosen the validator.

## Shadow DOM

Web components inject compiled styles into each shadow root. Global host-app CSS does not cross the boundary. See [Web components](./web-components.md).

## See also

- [Conventions](./conventions.md) — post-change verification step 7
- [Architecture](./architecture.md) — build outputs
