<script setup lang="ts">
  defineOptions({
    name: 'VetroContextMenuLabel',
  });
</script>

<template>
  <div
    data-slot="context-menu-label"
    class=":uno: text-foreground px-2 py-1.5 text-sm font-medium"
  >
    <slot />
  </div>
</template>
