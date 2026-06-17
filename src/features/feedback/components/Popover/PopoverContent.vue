<script setup lang="ts">
  import type { Placement } from '@popperjs/core';
  import { onClickOutside } from '@vueuse/core';
  import { inject, ref, useTemplateRef } from 'vue';

  import { usePopper } from '@/features/shared/lib/composables/use-popper';
  import { useTeleportTarget } from '@/features/shared/lib/composables/use-teleport-target';

  import { popoverContextKey } from './popover.context';

  defineOptions({
    name: 'VetroPopoverContent',
    inheritAttrs: false,
  });

  const { side = 'bottom', sideOffset = 8 } = defineProps<{
    side?: Placement;
    sideOffset?: number;
  }>();

  const context = inject(popoverContextKey);
  const open = context?.open ?? ref(false);
  const triggerEl = context?.triggerEl ?? ref<HTMLElement | null>(null);
  const contentEl = useTemplateRef<HTMLElement>('contentEl');

  usePopper(triggerEl, contentEl, open, { placement: side, offset: sideOffset });
  const teleportTarget = useTeleportTarget();

  onClickOutside(
    contentEl,
    () => {
      context?.setOpen(false);
    },
    { ignore: [triggerEl] },
  );
</script>

<template>
  <Teleport :to="teleportTarget">
    <Transition name="vetro-popover">
      <div
        v-if="open"
        ref="contentEl"
        data-slot="popover-content"
        class=":uno: border-border bg-popover text-popover-foreground focus-visible:outline-primary z-50 w-72 border-2 p-4 shadow-md focus-visible:outline-2 focus-visible:outline-offset-2"
        v-bind="$attrs"
      >
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
  .vetro-popover-enter-active,
  .vetro-popover-leave-active {
    transition:
      opacity 0.12s ease,
      transform 0.12s ease;
  }

  .vetro-popover-enter-from,
  .vetro-popover-leave-to {
    opacity: 0;
    transform: scale(0.95);
  }
</style>
