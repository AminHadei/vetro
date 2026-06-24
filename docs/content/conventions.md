# Conventions

Review-enforced rules in `vetro`. These are checked by automated review, enforced by lint where automatable, and verified by humans on every PR.

## Public API surface

`package.json` exports map:

- `vetro` → `src/entries/index.ts` — default export is a Vue plugin installer.
- `vetro/ui` — components only.
- `vetro/utils`
- `vetro/types`
- `vetro/style.css`
- `vetro/web-components/*` — individual compiled web components.

When adding a new public export, update the matching `src/entries/*.ts` file. Internal helpers must not leak into entry files.

## TypeScript

Strict config with `noUncheckedIndexedAccess`, `verbatimModuleSyntax`, etc. Rules:

- **No `any`.** Use `unknown` at boundaries and narrow.
- **`import type`** for type-only imports.
- **Component props and emits** via `defineProps<{...}>()` and `defineEmits<{ event: [payload] }>()`.
- **Named exports** by default. Default exports allowed for Vue SFCs, Storybook stories, and config files.
- **`@/`** resolves to `src/`.

## Cross-feature imports

Cross-feature imports must go through `features/<feature>/index.ts`. Do not reach into another feature's internal paths.

## Post-change verification (mandatory)

```sh
vp run task:pre-commit   # vp staged — lint + format + cspell (husky pre-commit)
vp run task:pre-push     # vp check && task:css:check && task:test (husky pre-push)
```

Run `vp run task:pre-push` before declaring work complete.

1. **Tests** — `vp run task:test` or `vp test`.
2. **Lint** — `vp lint .`.
3. **Format** — `vp fmt . --check`.
4. **Spelling** — `pnpm spellcheck`.
5. **Type-check** — `pnpm typecheck`.
6. **CSS bundle check** — `vp run task:css:check` after touching SFCs or UnoCSS strings. Fix with `:uno:` prefix or `@unocss-skip-start`/`@unocss-skip-end` — never loosen the validator.
7. **Web-component build** — if the component has `.webc.ts`, run `vp run task:build:webc`.
8. **Changeset** — for user-visible changes, run `pnpm changeset`. See [Changesets](./changesets.md).

## Hard boundaries

- **NEVER** install `vitest`, `oxlint`, or `oxfmt` directly — use `vite-plus`.
- **NEVER** import from `vite` or `vitest` directly — use `vite-plus` / `vite-plus/test`.
- **NEVER** use `npm` or `yarn`. Use `pnpm` (or `vp add` / `vp remove`).
- **NEVER** commit secrets or `.env` files.
- **NEVER** bypass git hooks with `--no-verify`.
- **NEVER** edit `package.json` version or `CHANGELOG.md` by hand.
- **NEVER** write hardcoded `<Teleport to="body">` in webc-shipped components.
- **ALWAYS** co-locate `.test.ts` and `.stories.ts` next to a new component.
- **ALWAYS** route cross-feature imports through `features/<feature>/index.ts`.
- **ALWAYS** add a changeset for user-visible changes.

## See also

- [Web components](./web-components.md)
- [Styling](./styling.md)
- [Testing](./testing.md)
- [Changesets](./changesets.md)
