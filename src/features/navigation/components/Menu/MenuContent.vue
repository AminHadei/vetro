<script setup lang="ts">
  import type { Placement } from '@popperjs/core';
  import { onClickOutside, useEventListener } from '@vueuse/core';
  import { inject, ref, useTemplateRef } from 'vue';

  import { usePopper } from '@/features/shared/lib/composables/use-popper';
  import { useTeleportTarget } from '@/features/shared/lib/composables/use-teleport-target';

  import { menuContextKey } from './menu.context';

  defineOptions({
    name: 'VetroMenuContent',
    inheritAttrs: false,
  });

  const { side = 'bottom', sideOffset = 4 } = defineProps<{
    side?: Placement;
    sideOffset?: number;
  }>();

  const context = inject(menuContextKey);
  const open = context?.open ?? ref(false);
  const triggerEl = context?.triggerEl ?? ref<HTMLElement | null>(null);
  const contentEl = useTemplateRef<HTMLElement>('contentEl');

  usePopper(triggerEl, contentEl, open, { placement: side, offset: sideOffset });

  onClickOutside(contentEl, () => context?.setOpen(false), { ignore: [triggerEl] });

  useEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Escape' && open.value) {
      context?.setOpen(false);
    }
  });
  const teleportTarget = useTeleportTarget();
</script>

<template>
  <Teleport :to="teleportTarget">
    <Transition name="vetro-menu">
      <div
        v-if="open"
        ref="contentEl"
        role="menu"
        data-slot="menu-content"
        class=":uno: border-border bg-popover text-popover-foreground z-50 min-w-40 overflow-y-auto border-2 p-1 shadow-md outline-none"
        v-bind="$attrs"
      >
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
  .vetro-menu-enter-active,
  .vetro-menu-leave-active {
    transition:
      opacity 0.1s ease,
      transform 0.1s ease;
  }

  .vetro-menu-enter-from,
  .vetro-menu-leave-to {
    opacity: 0;
    transform: scale(0.95);
  }
</style>
