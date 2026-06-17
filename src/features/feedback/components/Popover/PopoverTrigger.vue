<script setup lang="ts">
  import { inject, onMounted, useTemplateRef } from 'vue';

  import { popoverContextKey } from './popover.context';

  defineOptions({
    name: 'VetroPopoverTrigger',
  });

  const context = inject(popoverContextKey);
  const el = useTemplateRef<HTMLElement>('el');

  onMounted(() => {
    if (context !== undefined && el.value !== null) {
      context.triggerEl.value = el.value;
    }
  });
</script>

<template>
  <span
    ref="el"
    data-slot="popover-trigger"
    class="inline-flex"
    @click="context?.toggle()"
  >
    <slot />
  </span>
</template>
