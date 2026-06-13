<script setup lang="ts">
  defineOptions({
    name: 'VetroEmpty',
  });
</script>

<template>
  <div
    data-slot="empty"
    class=":uno: border-border bg-card flex flex-col items-center justify-center rounded border-2 p-4 text-center shadow-md transition-all hover:shadow-none md:p-8"
  >
    <slot />
  </div>
</template>
