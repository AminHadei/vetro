<script setup lang="ts">
  defineOptions({
    name: 'VetroEmptySeparator',
  });
</script>

<template>
  <div
    role="separator"
    data-slot="empty-separator"
    class=":uno: bg-primary h-1 w-full"
  />
</template>
