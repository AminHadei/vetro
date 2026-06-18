<script setup lang="ts">
  defineOptions({
    name: 'VetroDrawerTitle',
  });
</script>

<template>
  <h2
    data-slot="drawer-title"
    class=":uno: font-head text-xl font-medium"
  >
    <slot />
  </h2>
</template>
