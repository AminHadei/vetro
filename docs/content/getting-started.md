# Getting started

`vetro` is a Vue 3 + TypeScript neo-brutalist component library — a Vue port of [RetroUI](https://retroui.dev). It ships two distributions from one source tree: a Vue library (`dist/lib/`) and standalone Web Components (`dist/webc/`).

## Prerequisites

- **Vite+ (`vp` CLI):** install globally first, following [https://viteplus.dev](https://viteplus.dev). Every command below assumes `vp` is on your `PATH`.
- **Node:** version pinned in `.nvmrc` (24.x). Use `vp env`, `nvm use`, or any tool that respects it.
- **Package manager:** pnpm, wrapped by Vite+. Don't use npm or Yarn directly.

## Install

```sh
vp install
```

This installs the root workspace, the `playground/` app, and the `docs/` VitePress site.

## Commands

```sh
vp dev                         # Vite dev server
pnpm storybook                 # Storybook on :6006
pnpm playground                # Run playground app
pnpm playground:webc           # Build webc + serve webc playground
vp test                        # Vitest (watch by default)
vp test run                    # one-shot
vp test run --coverage         # one-shot with v8 coverage
vp lint .                      # Oxlint (type-aware enabled)
vp fmt . --check               # Oxfmt check
vp fmt . --write               # Oxfmt write
pnpm spellcheck                # cspell across the repo
pnpm typecheck                 # vue-tsc --noEmit
pnpm build                     # lib + webc (full release build)
pnpm changeset                 # record a user-visible change
pnpm changeset:status          # show pending changesets and next version
pnpm docs:dev                  # VitePress site on :5173
pnpm docs:build                # build the static docs site
```

## Vite+ task runner

`vite.config.ts` defines a `run.tasks` graph. Prefer `vp run task:<name>` for cached, dependency-aware execution:

| Task                   | Inputs / depends on                                       |
| ---------------------- | --------------------------------------------------------- |
| `task:build:lib`       | inputs: `src/**/*`                                        |
| `task:build:webc`      | depends on `task:build:lib`                               |
| `task:build:storybook` | depends on `task:build:webc`                              |
| `task:css:check`       | depends on `task:build:lib`; inputs: `dist/lib/core.css`  |
| `task:test`            | inputs: `src/**/*`                                        |
| `task:pre-commit`      | runs `vp staged` (lint + format + cspell on staged files) |
| `task:pre-push`        | chains `vp check && task:css:check && task:test`          |

## Environment

Copy `.env.example` to `.env` for local overrides. `.env.test` is used in tests. Never commit secrets.

## First task

1. Pick a feature directory under `src/features/`.
2. Read [Architecture](./architecture.md) and [Conventions](./conventions.md) before adding files.
3. Copy an existing component (e.g. `Button/`) as a template.
4. Run `vp run task:pre-commit` before declaring the change complete.
5. Add a changeset with `pnpm changeset` for any user-visible change. See [Changesets](./changesets.md).

## See also

- [Architecture](./architecture.md) — mental model and directory layout
- [Conventions](./conventions.md) — review-enforced rules
- [Git conventions](./git-conventions.md) — commit format and branch naming
