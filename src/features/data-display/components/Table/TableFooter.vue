<script setup lang="ts">
  defineOptions({
    name: 'VetroTableFooter',
  });
</script>

<template>
  <tfoot
    data-slot="table-footer"
    class=":uno: bg-accent text-accent-foreground border-t font-medium last:[&>tr]:border-b-0"
  >
    <slot />
  </tfoot>
</template>
