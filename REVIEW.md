# Review instructions

Injected verbatim into every Code Review agent. Project conventions live in `AGENTS.md` (single source of truth; `CLAUDE.md` defers to it) — violations default to Nit. This file only _recalibrates_ severity and scope for our repo.

## What Important means here

This is a published component library with a **dual-build output** (Vue library + standalone Web Components). Reserve Important for findings that would break a consumer app, ship a broken webc bundle, or violate the public API contract. Everything else is Nit at most.

**Always Important** (promote from Nit if AGENTS.md also covers it):

- **Hardcoded `<Teleport to="body">` in a component that ships (or can ship) as a web component.** Static `to` attributes escape the shadow DOM and lose all styles. Flag any `<Teleport>` with a static target in files that have a `.webc.ts` sibling or are transitively imported by one.
- **Popper/dropdown/tooltip without `positionFixed: true`** in a component reachable from a webc bundle. Inside Shadow DOM the offset parent is the shadow host — without `positionFixed` the panel renders in the wrong place.
- **Global CSS that escapes scoped SFC / shadow-DOM boundaries.** No new selectors targeting host-app elements, no unscoped `:root` / `body` / `html` rules introduced outside the opt-in `dist/lib/core.css` entrypoint.
- **Hand-edit of `package.json` version or `CHANGELOG.md`.** Both are owned by Changesets. Add `.changeset/*.md` via `pnpm changeset` and commit it alongside the code.
- **Missing changeset for a user-visible change.** New/changed/removed component, export, prop, slot, emit, or default behavior requires a `.changeset/*.md` in the PR. Internal refactors, test-only, tooling, and docs-only are exempt.
- **Cross-feature import reaching past `features/<feature>/index.ts`.** Deep imports into another feature's internal paths break the barrel contract and the public API surface.
- **New runtime dependency without justification.** Every npm dep inflates every webc bundle that transitively includes it.
- **Invented user-facing copy.** New button labels, alert text, empty states, tooltips, placeholders, or ARIA labels added without a design spec or stakeholder wording. Prefer a prop/slot with no default over a guessed string.
- **`any` or unchecked `as SomeType`.** TypeScript is strict. Use `unknown` at boundaries and narrow. `import type` for type-only imports.
- **Public-export leak.** Internal helpers added to `src/entries/*.ts` (any subpath export). Only intentional public API goes into entry files.
- **`:root` not rewritten to `:host` in a new webc recipe.** The `adoptSharedWebComponentStyles` pattern depends on it. Copy an existing `.webc.ts` (e.g. `Button.webc.ts`) as the template.

## Always check

- Every new component has a co-located `.test.ts` and `.stories.ts`; if exposed as a web component, also `.webc.ts`.
- Every webc-facing component using Popper confirms `positionFixed: true`.
- Every new public export is declared in the matching `src/entries/*.ts` file and the `package.json` exports map.
- When AGENTS.md guidance becomes outdated because of a change in the PR, flag that AGENTS.md needs updating too.
- Conventional Commits + feature branch naming (`feat/<description>`, `fix/<description>`, `chore/…`) — flag deviations.

## Cap the nits

Report at most **6 Nits** per review. If more exist, say "plus N similar items" in the summary. If everything found is Nit, lead the summary with "No blocking issues."

After the first review on a PR, suppress new Nits on subsequent runs — post Important findings only.

## Do not report

- Anything CI already enforces: `pnpm lint`, `pnpm format`, `pnpm typecheck`, `vp run task:pre-commit`, `vp run task:css:check`, Husky commit-msg.
- Generated or vendored files: `dist/`, `coverage/`, `node_modules/`, `pnpm-lock.yaml`, Storybook-built output, web-component compiled bundles.
- Test-only / story-only files intentionally relaxing production rules.
- UnoCSS class-shortening artefacts in webc bundles — only flag when a contract is actually broken by them.
- Missing tests, **unless** the edited file is outside the Vitest coverage exclusion list in `vite.config.ts`.
- Commit message style or PR size — Husky and team review already cover these.
- Version numbers in PR titles or summaries.

## Verification bar

- Behaviour claims need a `file:line` citation or a reproduction path. Don't infer from naming alone.
- Before flagging a "wrong" color/spacing token, check `uno.config.ts` theme — tokens may already exist under a different name.
- Before flagging a missing composable/util as a gap, grep the `features/*/lib/` tree — barrel exports hide a lot.
- Before flagging a `<Teleport to="body">` as broken, confirm the file has a `.webc.ts` sibling _or_ is transitively imported by one.

## Summary shape

Open the review body with a one-line tally: `N important, M nits` (or `No blocking issues` when there are zero Importants). Then a 1–3 sentence summary of the PR's intent, followed by the findings table.

Callouts to include when relevant:

- **Dual-build impact:** if the change touches a component with a `.webc.ts` sibling, note whether `pnpm build:webc` was expected to run.
- **Changeset status:** whether a `.changeset/*.md` is present or correctly omitted.
