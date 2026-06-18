<script setup lang="ts">
  import { computed, inject, provide, toRef } from 'vue';

  import { accordionContextKey, accordionItemKey } from './accordion.context';

  defineOptions({
    name: 'VetroAccordionItem',
  });

  const { value } = defineProps<{
    value: string;
  }>();

  provide(accordionItemKey, { value: toRef(() => value) });

  const context = inject(accordionContextKey);
  const open = computed(() => context?.isOpen(value) ?? false);
</script>

<template>
  <div
    data-slot="accordion-item"
    :data-open="open ? '' : undefined"
    class=":uno: border-border bg-background text-foreground overflow-hidden rounded border-2 shadow-md transition-all hover:shadow-sm data-[open]:shadow-sm"
  >
    <slot />
  </div>
</template>
