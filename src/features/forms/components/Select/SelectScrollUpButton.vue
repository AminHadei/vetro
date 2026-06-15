<script setup lang="ts">
  defineOptions({
    name: 'VetroSelectScrollUpButton',
  });
</script>

<template>
  <div
    data-slot="select-scroll-up-button"
    class=":uno: text-muted-foreground bg-background flex cursor-default items-center justify-center py-1"
  >
    <span class=":uno: i-chevron-down size-4 rotate-180" />
  </div>
</template>
