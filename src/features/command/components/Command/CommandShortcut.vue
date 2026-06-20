<script setup lang="ts">
  defineOptions({
    name: 'VetroCommandShortcut',
  });
</script>

<template>
  <span
    data-slot="command-shortcut"
    class=":uno: text-muted-foreground ms-auto text-xs tracking-widest"
  >
    <slot />
  </span>
</template>
