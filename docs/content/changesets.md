# Changesets

[Changesets](https://github.com/changesets/changesets) records user-visible changes as small markdown files under `.changeset/`. At release time they drive version bumps and `CHANGELOG.md`.

## TL;DR

| You did…                                        | You do…                                                            |
| ----------------------------------------------- | ------------------------------------------------------------------ |
| Made a user-visible change                      | `pnpm changeset` → pick bump → write summary → **commit the file** |
| Touched only tests, docs, CI, internal refactor | **No changeset.** Add `skip-changeset` PR label if CI complains    |

Never edit `package.json` `version` or `CHANGELOG.md` by hand. Never run `changeset version` or `changeset publish` yourself.

## Bump types

| Bump      | When to use                                                           |
| --------- | --------------------------------------------------------------------- |
| **patch** | Bug fix, internal refactor with consumer-visible note                 |
| **minor** | New component, prop, slot, emit, export — backwards compatible        |
| **major** | Breaking change — removed export, changed default, migration required |

## Anatomy

```md
---
'vetro': minor
---

Button: add `loading` prop that shows a spinner and disables clicks.
```

## Maintainer release flow

1. Merge feature PRs to `main` (each with a changeset when user-visible).
2. **Actions → Release → Run workflow** — runs `changeset version`, commits, tags.
3. Tag push triggers **Publish** — npm, webc CDN, GitHub Release.

## Snapshot QA

**Actions → Publish snapshot → Run workflow**, enter PR number. Install with `pnpm add vetro@pr-<number>`.

## Cheat sheet

```bash
pnpm changeset          # add a changeset (interactive)
pnpm changeset:status   # inspect pending changesets
```

Config: [`.changeset/config.json`](../../.changeset/config.json).

## See also

- [CI](./ci.md) — release workflows and secrets
- [Git conventions](./git-conventions.md)
