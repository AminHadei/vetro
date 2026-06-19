<script setup lang="ts">
  defineOptions({
    name: 'VetroContextMenuSeparator',
  });
</script>

<template>
  <div
    role="separator"
    data-slot="context-menu-separator"
    class=":uno: bg-border -mx-1 my-1 h-0.5"
  />
</template>
