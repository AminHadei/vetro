# Testing

Test setup and conventions for `vetro`.

## Setup

- **Runner:** Vitest via `vite-plus/test`. Import from `vite-plus/test`, **not** `vitest`:
  ```ts
  import { describe, it, expect, vi } from 'vite-plus/test';
  ```
- **Component testing:** `@vue/test-utils` v2.
- **Environment:** jsdom.
- **Global setup:** `tools/vitest/setup.ts`.
- **Co-location:** tests live next to the component as `<ComponentName>.test.ts`.

## Coverage

V8 provider. Reports: HTML, LCOV, Cobertura, JSON summary, JUnit (for CI PR bots).

Exclusions in `vite.config.ts` → coverage `exclude`: `.stories.ts`, `.test.ts`, `.webc.ts`, `tools/**`, etc.

If your target file is not excluded, writing tests is required.

## Commands

```sh
vp test                        # watch mode
vp test run                    # one-shot
vp test run --coverage         # with coverage
pnpm coverage:open             # coverage + open HTML report
```

## Validated workarounds

### `onClickOutside` from vueuse v14

Requires **both** `pointerdown` and `click` events. Use `attachTo: document.body` when mounting.

### Child emit → parent propagation in VTU2

Pass a `vi.fn()` spy as the relevant `onUpdate:...` prop and assert on the spy instead of `wrapper.emitted()`.

## See also

- [Conventions](./conventions.md) — post-change verification
- [CI](./ci.md) — coverage reporter on PRs
