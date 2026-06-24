# Storybook & MSW mocking

How MSW is wired into Storybook and how to add mock handlers when a component needs network calls. For the test-side MSW lifecycle, see [Testing](./testing.md).

## Storybook + MSW

Storybook uses `msw-storybook-addon`. `tools/storybook/preview.ts` calls `initialize()` and registers `mswLoader` as a global loader.

Stories declare handlers per-story via `parameters.msw.handlers`. Prefer feature `lib/__mock__/index.ts` factories over inline handlers in `.stories.ts` files.

## Vitest + MSW

`tools/vitest/setup.ts` starts the shared server from `src/mocks/node.ts` before tests and resets handlers after each test.

Register feature handlers in `src/mocks/node.ts` when you add API-backed components:

```ts
import { setupServer } from 'msw/node';

const handlers = [/* ... */];
export const server = setupServer(...handlers);
```

## Webc stories

Run `pnpm build:webc` before opening `.webc.stories.ts` entries. Bundles are served from `dist/webc/` via Storybook `staticDirs`.
