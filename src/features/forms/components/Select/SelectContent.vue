<script setup lang="ts">
  import type { Placement } from '@popperjs/core';
  import { onClickOutside, useEventListener } from '@vueuse/core';
  import { inject, ref, useTemplateRef } from 'vue';

  import { usePopper } from '@/features/shared/lib/composables/use-popper';
  import { useTeleportTarget } from '@/features/shared/lib/composables/use-teleport-target';

  import { selectContextKey } from './select.context';
  import SelectScrollDownButton from './SelectScrollDownButton.vue';
  import SelectScrollUpButton from './SelectScrollUpButton.vue';

  defineOptions({
    name: 'VetroSelectContent',
    inheritAttrs: false,
  });

  const { side = 'bottom', sideOffset = 4 } = defineProps<{
    side?: Placement;
    sideOffset?: number;
  }>();

  const context = inject(selectContextKey);
  const open = context?.open ?? ref(false);
  const triggerEl = context?.triggerEl ?? ref<HTMLElement | null>(null);
  const contentEl = useTemplateRef<HTMLElement>('contentEl');
  const listEl = useTemplateRef<HTMLElement>('listEl');
  const teleportTarget = useTeleportTarget();

  usePopper(triggerEl, contentEl, open, { placement: side, offset: sideOffset });

  onClickOutside(contentEl, () => context?.setOpen(false), { ignore: [triggerEl] });

  useEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Escape' && open.value) {
      context?.setOpen(false);
    }
  });

  const scrollList = (delta: number): void => {
    listEl.value?.scrollBy({ top: delta, behavior: 'smooth' });
  };
</script>

<template>
  <Teleport :to="teleportTarget">
    <Transition name="vetro-select">
      <div
        v-if="open"
        ref="contentEl"
        role="listbox"
        data-slot="select-content"
        class=":uno: border-border bg-background text-foreground z-50 flex max-h-60 min-w-[8rem] flex-col overflow-hidden border-2 p-0 shadow-md outline-none"
        v-bind="$attrs"
      >
        <SelectScrollUpButton @click="scrollList(-48)" />
        <div
          ref="listEl"
          class=":uno: flex-1 overflow-y-auto p-1"
        >
          <slot />
        </div>
        <SelectScrollDownButton @click="scrollList(48)" />
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
  .vetro-select-enter-active,
  .vetro-select-leave-active {
    transition:
      opacity 0.1s ease,
      transform 0.1s ease;
  }

  .vetro-select-enter-from,
  .vetro-select-leave-to {
    opacity: 0;
    transform: scale(0.95);
  }
</style>
