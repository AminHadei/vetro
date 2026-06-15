<script setup lang="ts">
  import { computed, inject } from 'vue';

  import { selectContextKey } from './select.context';

  defineOptions({
    name: 'VetroSelectValue',
  });

  const context = inject(selectContextKey);

  const hasValue = computed(() => (context?.modelValue.value ?? '') !== '');
  const display = computed(() => {
    const value = context?.modelValue.value ?? '';
    return context?.labels.value.get(value) ?? value;
  });
</script>

<template>
  <span
    data-slot="select-value"
    class=":uno: flex flex-1 text-left"
    :class="hasValue ? '' : 'text-muted-foreground'"
  >
    {{ hasValue ? display : context?.placeholder.value }}
  </span>
</template>
