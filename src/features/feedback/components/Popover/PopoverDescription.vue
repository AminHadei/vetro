<script setup lang="ts">
  defineOptions({
    name: 'VetroPopoverDescription',
  });
</script>

<template>
  <p
    data-slot="popover-description"
    class=":uno: text-muted-foreground text-sm"
  >
    <slot />
  </p>
</template>
