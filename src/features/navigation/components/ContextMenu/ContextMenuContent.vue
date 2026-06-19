<script setup lang="ts">
  import { onClickOutside, useEventListener } from '@vueuse/core';
  import { computed, inject, useTemplateRef } from 'vue';

  import { contextMenuContextKey } from './context-menu.context';
  import { useTeleportTarget } from '@/features/shared/lib/composables/use-teleport-target';

  defineOptions({
    name: 'VetroContextMenuContent',
    inheritAttrs: false,
  });

  const context = inject(contextMenuContextKey);
  const contentEl = useTemplateRef<HTMLElement>('contentEl');

  const positionStyle = computed(() => ({
    top: `${context?.y.value ?? 0}px`,
    left: `${context?.x.value ?? 0}px`,
  }));

  onClickOutside(contentEl, () => context?.close());

  useEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Escape' && context?.open.value === true) {
      context.close();
    }
  });
  const teleportTarget = useTeleportTarget();
</script>

<template>
  <Teleport :to="teleportTarget">
    <Transition name="vetro-context-menu">
      <div
        v-if="context?.open.value"
        ref="contentEl"
        role="menu"
        data-slot="context-menu-content"
        class=":uno: border-border bg-background text-foreground fixed z-50 min-w-32 overflow-hidden rounded-sm border-2 p-1 shadow-md"
        :style="positionStyle"
        v-bind="$attrs"
      >
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
  .vetro-context-menu-enter-active,
  .vetro-context-menu-leave-active {
    transition:
      opacity 0.1s ease,
      transform 0.1s ease;
  }

  .vetro-context-menu-enter-from,
  .vetro-context-menu-leave-to {
    opacity: 0;
    transform: scale(0.95);
  }
</style>
