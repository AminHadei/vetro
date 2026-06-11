<script setup lang="ts">
  defineOptions({
    name: 'VetroCard',
  });
</script>

<template>
  <div
    data-slot="card"
    class=":uno: border-border bg-card text-card-foreground inline-block rounded border-2 shadow-md transition-all hover:shadow-none"
  >
    <slot />
  </div>
</template>
