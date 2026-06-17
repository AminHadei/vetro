<script setup lang="ts">
  defineOptions({
    name: 'VetroPopoverTitle',
  });
</script>

<template>
  <p
    data-slot="popover-title"
    class=":uno: font-head text-base font-medium"
  >
    <slot />
  </p>
</template>
