<script setup lang="ts">
  import type { Placement } from '@popperjs/core';
  import { computed, inject, ref, useTemplateRef } from 'vue';

  import { usePopper } from '@/features/shared/lib/composables/use-popper';
  import { useTeleportTarget } from '@/features/shared/lib/composables/use-teleport-target';
  import { createVariants } from '@/features/shared/lib/utils/variants.util';

  import { tooltipContextKey } from './tooltip.context';
  import type { TooltipVariant } from './tooltip.types';

  defineOptions({
    name: 'VetroTooltipContent',
    inheritAttrs: false,
  });

  const {
    variant = 'default',
    side = 'top',
    sideOffset = 6,
  } = defineProps<{
    variant?: TooltipVariant;
    side?: Placement;
    sideOffset?: number;
  }>();

  const context = inject(tooltipContextKey);
  const open = context?.open ?? ref(false);
  const triggerEl = context?.triggerEl ?? ref<HTMLElement | null>(null);
  const contentEl = useTemplateRef<HTMLElement>('contentEl');

  usePopper(triggerEl, contentEl, open, { placement: side, offset: sideOffset });

  const teleportTarget = useTeleportTarget();

  const tooltipVariants = createVariants({
    base: ':uno: z-50 overflow-hidden border-2 border-border px-3 py-1.5 text-xs',
    variants: {
      variant: {
        default: ':uno: bg-background text-foreground',
        primary: ':uno: bg-primary text-primary-foreground',
        solid: ':uno: bg-foreground text-background',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  });

  const contentClass = computed(() => tooltipVariants({ variant }));
</script>

<template>
  <Teleport :to="teleportTarget">
    <Transition name="vetro-tooltip">
      <div
        v-if="open"
        ref="contentEl"
        role="tooltip"
        data-slot="tooltip-content"
        :class="contentClass"
        v-bind="$attrs"
      >
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
  .vetro-tooltip-enter-active,
  .vetro-tooltip-leave-active {
    transition:
      opacity 0.12s ease,
      transform 0.12s ease;
  }

  .vetro-tooltip-enter-from,
  .vetro-tooltip-leave-to {
    opacity: 0;
    transform: scale(0.95);
  }
</style>
