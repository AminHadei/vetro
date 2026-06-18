<script setup lang="ts">
  import { computed, inject } from 'vue';

  import { tabsContextKey } from './tabs.context';

  defineOptions({
    name: 'VetroTabsTrigger',
  });

  const { value } = defineProps<{
    value: string;
  }>();

  const context = inject(tabsContextKey);
  const active = computed(() => context?.active.value === value);
</script>

<template>
  <button
    type="button"
    role="tab"
    data-slot="tabs-trigger"
    :aria-selected="active"
    :data-active="active ? '' : undefined"
    class=":uno: focus-visible:outline-primary flex items-center border-2 border-transparent px-4 py-1 focus-visible:outline-2 focus-visible:outline-offset-2"
    :class="active ? ':uno: border-border bg-primary text-primary-foreground font-semibold' : ''"
    @click="context?.setActive(value)"
  >
    <slot />
  </button>
</template>
