<script setup lang="ts">
  defineOptions({
    name: 'VetroDialogTitle',
  });
</script>

<template>
  <h2
    data-slot="dialog-title"
    class=":uno: font-head text-lg font-medium"
  >
    <slot />
  </h2>
</template>
