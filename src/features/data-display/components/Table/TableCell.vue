<script setup lang="ts">
  defineOptions({
    name: 'VetroTableCell',
  });
</script>

<template>
  <td
    data-slot="table-cell"
    class=":uno: p-2 align-middle md:p-3 [&:has([role=checkbox])]:pr-0"
  >
    <slot />
  </td>
</template>
