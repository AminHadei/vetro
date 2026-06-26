---
name: code-conventions
description: Use when editing TypeScript or Vue source files under src/, adding a new feature directory, exposing a public API entry, writing components/composables/utils, or making cross-feature imports. Loads the vetro conventions — feature-first layout, cross-feature import boundary, TypeScript strict rules (no any, import type, defineProps/defineEmits typed syntax, named exports), public-API entries, runtime-config facade, ApiService usage, lazy-loaded overlays, and user-facing-copy rules.
---

# Code conventions for vetro

The full conventions — feature directory shape, cross-feature import boundary, TypeScript strict rules, public-API entries, and post-change verification — live in [`docs/content/conventions.md`](../../../docs/content/conventions.md), with deeper specifics in [`docs/content/architecture.md`](../../../docs/content/architecture.md) and [`docs/content/web-components.md`](../../../docs/content/web-components.md).

Those docs are the source of truth. Read the relevant one before adding a new component or touching a feature's public surface.
