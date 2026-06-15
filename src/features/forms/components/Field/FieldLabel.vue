<script setup lang="ts">
  defineOptions({
    name: 'VetroFieldLabel',
  });

  defineProps<{
    for?: string;
  }>();
</script>

<template>
  <label
    :for="$props.for"
    data-slot="field-label"
    class=":uno: flex w-fit gap-2 text-sm leading-snug font-medium select-none"
  >
    <slot />
  </label>
</template>
