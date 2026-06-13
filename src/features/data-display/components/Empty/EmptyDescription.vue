<script setup lang="ts">
  defineOptions({
    name: 'VetroEmptyDescription',
  });
</script>

<template>
  <p
    data-slot="empty-description"
    class=":uno: text-muted-foreground max-w-[320px]"
  >
    <slot />
  </p>
</template>
