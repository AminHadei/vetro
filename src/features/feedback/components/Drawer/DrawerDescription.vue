<script setup lang="ts">
  defineOptions({
    name: 'VetroDrawerDescription',
  });
</script>

<template>
  <p
    data-slot="drawer-description"
    class=":uno: text-muted-foreground text-sm"
  >
    <slot />
  </p>
</template>
