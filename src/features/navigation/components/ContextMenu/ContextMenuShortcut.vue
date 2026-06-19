<script setup lang="ts">
  defineOptions({
    name: 'VetroContextMenuShortcut',
  });
</script>

<template>
  <span
    data-slot="context-menu-shortcut"
    class=":uno: text-muted-foreground ml-auto text-xs tracking-widest"
  >
    <slot />
  </span>
</template>
