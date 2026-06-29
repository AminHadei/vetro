# Component parity (Vetro ↔ Noirium)

Mirror of the parity tracker in Noirium. **Strategy: keep both** for overlapping primitives.

**Canonical checklist:** [Noirium component-parity](https://github.com/AminHadei/noirium/blob/main/docs/content/component-parity.md)

## Vetro-specific ports (from Noirium)

| Component | Target feature | Phase | Status |
| --------- | -------------- | ----- | ------ |
| `Countdown` | `data-display` | 1 | done |
| `DateInput` | `forms` | 1 | done |
| `InputNumber` | `forms` | 1 | done |
| `Modal` (+ layouts, `createTypedModal`) | `feedback` | 2 | done |
| `DatePicker` | `forms` | 2 | done |
| `BaseDropdown` | `forms` | 2 | done |
| `PhoneNumberInput` | `forms` | 3 | done |
| `CountryDropdown` | `forms` | 3 | done |
| Toast stack | `feedback` | overlap | keep `Toaster` |

## WebC (parity ports)

All feature components ship `.webc.ts` entries (119 bundles). Key parity ports:

| Component | `.webc.ts` |
| --------- | ---------- |
| `Modal` | ✅ |
| `DatePicker`, `DateInput`, `InputNumber` | ✅ |
| `BaseDropdown`, `CountryDropdown`, `PhoneNumberInput` | ✅ |
| `Countdown` | ✅ |

Run `pnpm playground:webc` after `pnpm build:webc` to preview registered custom elements.

## Noirium ports into Vetro (reference)

All Phase 1–3 Noirium ← Vetro ports are tracked in the [canonical doc](https://github.com/AminHadei/noirium/blob/main/docs/content/component-parity.md). Vetro already ships web components for most Vetro-native families; parity additions above extend webc for Noirium-sourced form/overlay primitives.
