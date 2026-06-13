<script setup lang="ts">
  defineOptions({
    name: 'VetroTableCaption',
  });
</script>

<template>
  <caption
    data-slot="table-caption"
    class=":uno: text-muted-foreground my-2 text-sm"
  >
    <slot />
  </caption>
</template>
