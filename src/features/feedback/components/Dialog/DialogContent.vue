<script setup lang="ts">
  import { useEventListener } from '@vueuse/core';
  import { computed, inject } from 'vue';

  import { useTeleportTarget } from '@/features/shared/lib/composables/use-teleport-target';
  import { createVariants } from '@/features/shared/lib/utils/variants.util';

  import { dialogContextKey } from './dialog.context';
  import type { DialogSize } from './dialog.types';

  defineOptions({
    name: 'VetroDialogContent',
    inheritAttrs: false,
  });

  const { size = 'auto' } = defineProps<{
    size?: DialogSize;
  }>();

  const context = inject(dialogContextKey);

  const dialogVariants = createVariants({
    base: ':uno: relative z-50 flex max-h-[90vh] w-full flex-col overflow-hidden rounded border-2 border-border bg-background shadow-lg',
    variants: {
      size: {
        auto: 'max-w-fit',
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-2xl',
      },
    },
    defaultVariants: {
      size: 'auto',
    },
  });

  const contentClass = computed(() => dialogVariants({ size }));
  const teleportTarget = useTeleportTarget();

  useEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Escape' && context?.open.value === true) {
      context.close();
    }
  });
</script>

<template>
  <Teleport :to="teleportTarget">
    <Transition name="vetro-dialog">
      <div
        v-if="context?.open.value"
        class=":uno: font-head fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div
          class=":uno: absolute inset-0 bg-black/80"
          @click="context?.close()"
        />
        <div
          role="dialog"
          aria-modal="true"
          :class="contentClass"
          v-bind="$attrs"
        >
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
  .vetro-dialog-enter-active,
  .vetro-dialog-leave-active {
    transition: opacity 0.2s ease;
  }

  .vetro-dialog-enter-from,
  .vetro-dialog-leave-to {
    opacity: 0;
  }
</style>
