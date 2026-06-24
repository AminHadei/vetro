# Git conventions

Branch naming, commit format, and what Husky enforces in `vetro`. Releases are driven by Changesets — see [Changesets](./changesets.md).

## Branches

- **Main branch:** `main`. PRs target `main`.
- **Feature branches:** `feat/<short-description>`.
- **Fix branches:** `fix/<short-description>`.
- **Chore branches:** `chore/<description>`.

## Commit format — Conventional Commits

Commit-msg hook enforces [Conventional Commits](https://www.conventionalcommits.org/) via `@commitlint/config-conventional`.

| Type       | When to use                                   |
| ---------- | --------------------------------------------- |
| `feat`     | New component, new prop/slot/emit, new export |
| `fix`      | Bug fix                                       |
| `chore`    | Tooling, deps, build config                   |
| `docs`     | Docs-only changes                             |
| `test`     | Test-only changes                             |
| `style`    | Formatting only                               |
| `refactor` | Internal refactor with no behaviour change    |

Examples:

```
feat(button): add loading prop
fix(dialog): correct focus trap on close
chore(ci): add coverage reporter workflow
```

- **Subject:** terse, imperative, lowercase after the type.
- **No AI attribution trailers.**

## Changeset alongside the commit

User-visible changes must include a `.changeset/*.md` file. CI blocks PRs missing one (use `skip-changeset` label for test/docs/CI-only changes).

## Husky hooks

Hooks live in `tools/husky/`:

- **pre-commit:** `vp run task:pre-commit` (lint + format + spellcheck on staged files).
- **commit-msg:** Conventional Commits via commitlint.
- **pre-push:** `vp run task:pre-push` (check + css:check + test).

If a hook fails, fix the root cause. Do not bypass with `--no-verify`.

## See also

- [Changesets](./changesets.md)
- [CI](./ci.md)
