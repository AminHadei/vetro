<script setup lang="ts">
  defineOptions({
    name: 'VetroSelectLabel',
  });
</script>

<template>
  <div
    data-slot="select-label"
    class=":uno: px-2 py-1.5 text-sm font-semibold"
  >
    <slot />
  </div>
</template>
