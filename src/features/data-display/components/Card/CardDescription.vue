<script setup lang="ts">
  defineOptions({
    name: 'VetroCardDescription',
  });
</script>

<template>
  <p
    data-slot="card-description"
    class="text-muted-foreground"
  >
    <slot />
  </p>
</template>
