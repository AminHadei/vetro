<script setup lang="ts">
  import { inject, onMounted, useTemplateRef } from 'vue';

  import { tooltipContextKey } from './tooltip.context';

  defineOptions({
    name: 'VetroTooltipTrigger',
  });

  const context = inject(tooltipContextKey);
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
    data-slot="tooltip-trigger"
    class="inline-flex"
    @mouseenter="context?.show()"
    @mouseleave="context?.hide()"
    @focusin="context?.show()"
    @focusout="context?.hide()"
  >
    <slot />
  </span>
</template>
