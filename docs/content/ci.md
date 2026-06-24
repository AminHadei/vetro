# CI

GitHub Actions workflows for `vetro`. Definitions live in [`.github/workflows/`](../../.github/workflows/).

## Workflows

| Workflow             | File                  | Triggers                             | Purpose                                                                    |
| -------------------- | --------------------- | ------------------------------------ | -------------------------------------------------------------------------- |
| **CI**               | `ci.yml`              | PR + push to `main`                  | lint, format, typecheck, test; changeset check; PR coverage + failure bots |
| **Deploy Pages**     | `storybook-pages.yml` | push to `main`, version tags, manual | Publish VitePress docs + Storybook to GitHub Pages                         |
| **Release**          | `release.yml`         | manual                               | Consume changesets on `main`, commit version bump, push tag                |
| **Publish**          | `publish.yml`         | push tag `v*`                        | Build, npm publish, webc CDN upload, GitHub Release                        |
| **Publish snapshot** | `snapshot.yml`        | manual (PR number)                   | Prerelease npm dist-tag + webc for QA                                      |

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

## Repository secrets

| Secret                                                                                                 | Purpose                                        |
| ------------------------------------------------------------------------------------------------------ | ---------------------------------------------- |
| `NPM_TOKEN`                                                                                            | npm publish                                    |
| `ENV_PRODUCTION`                                                                                       | Contents of production `.env` for `pnpm build` |
| `S3_REGION`, `S3_ENDPOINT`, `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `VITE_S3_CDN_URL` | Web component CDN upload                       |

## See also

- [Changesets](./changesets.md)
- [Conventions](./conventions.md)
