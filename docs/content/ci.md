# CI

GitHub Actions workflows for `vetro`. Definitions live in [`.github/workflows/`](../../.github/workflows/).

## Workflows

| Workflow             | File                  | Triggers               | Purpose                                                                                    |
| -------------------- | --------------------- | ---------------------- | ------------------------------------------------------------------------------------------ |
| **CI**               | `ci.yml`              | PR + push to `main`    | lint, format, typecheck, test; changeset check; PR coverage + failure bots                 |
| **Deploy Pages**     | `storybook-pages.yml` | push to `main`, manual | Publish VitePress docs + Storybook to GitHub Pages                                         |
| **Release**          | `release.yml`         | manual                 | Consume changesets on `main`, commit version bump, push tag                                |
| **Publish**          | `publish.yml`         | push to `main`, manual | If `package.json` version is new on npm: build, publish, optional webc CDN, GitHub Release |
| **Publish snapshot** | `snapshot.yml`        | manual (PR number)     | Prerelease npm dist-tag + webc for QA                                                      |

Supporting scripts: [`tools/ci/`](../../tools/ci/) — see [`tools/ci/README.md`](../../tools/ci/README.md).

## GitHub Pages

| Path          | Content                     |
| ------------- | --------------------------- |
| `/`           | VitePress handbook          |
| `/storybook/` | Component demos (Storybook) |

Default URLs:

- Docs: **[https://aminhadei.github.io/vetro/](https://aminhadei.github.io/vetro/)**
- Storybook: **[https://aminhadei.github.io/vetro/storybook/](https://aminhadei.github.io/vetro/storybook/)**

### One-time repo setup

1. **Settings → Pages → Build and deployment → Source:** GitHub Actions.
2. Push to `main` (or run the workflow manually).

## Release and publish

1. Merge feature PRs to `main` (each with a changeset when user-visible).
2. Bump `package.json` version (manually, or via **Actions → Release** which runs `pnpm changeset version`, commits `chore(release): vX.Y.Z`, and tags).
3. Every push to `main` runs **Publish**. If that version is not yet on npm, it builds with **`ENV_PRODUCTION`**, publishes (**`NPM_TOKEN`**), optionally uploads webc to S3, and creates a GitHub Release from `CHANGELOG.md`. If the version is already published, the workflow skips cleanly.

### Repository secrets

| Secret                                                                                                 | Purpose                                                |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------ |
| `NPM_TOKEN`                                                                                            | npm publish (`publish.yml`, `snapshot.yml`)            |
| `ENV_PRODUCTION`                                                                                       | Contents of production `.env` for `pnpm build`         |
| `S3_REGION`, `S3_ENDPOINT`, `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `VITE_S3_CDN_URL` | Web component CDN upload (optional — skipped if unset) |

### Snapshot QA

Workflow **Publish snapshot** (manual): enter the PR number. It checks out that branch, runs `changeset version --snapshot pr-<n>`, builds, publishes to npm with dist-tag `pr-<n>`, and uploads webc. Consumers: `pnpm add vetro-ui@pr-<n>`.

## See also

- [Changesets](./changesets.md)
- [Conventions](./conventions.md)
