<script setup lang="ts">
  defineOptions({
    name: 'VetroDialogDescription',
  });
</script>

<template>
  <p
    data-slot="dialog-description"
    class="text-muted-foreground"
  >
    <slot />
  </p>
</template>
