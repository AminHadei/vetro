<script setup lang="ts">
  defineOptions({
    name: 'VetroTableRow',
  });
</script>

<template>
  <tr
    data-slot="table-row"
    class=":uno: hover:bg-primary/50 hover:text-primary-foreground data-[state=selected]:bg-muted border-b transition-colors"
  >
    <slot />
  </tr>
</template>
