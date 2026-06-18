<script setup lang="ts">
  defineOptions({
    name: 'VetroDrawerHeader',
  });
</script>

<template>
  <div
    data-slot="drawer-header"
    class=":uno: border-border flex flex-col gap-1 border-b-2 p-4"
  >
    <slot />
  </div>
</template>
