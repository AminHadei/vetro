<script setup lang="ts">
  defineOptions({
    name: 'VetroLabel',
  });

  defineProps<{
    for?: string;
  }>();
</script>

<template>
  <label
    :for="$props.for"
    class=":uno: text-sm leading-none font-medium select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
  >
    <slot />
  </label>
</template>
