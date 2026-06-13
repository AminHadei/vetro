<script setup lang="ts">
  defineOptions({
    name: 'VetroTableHead',
  });
</script>

<template>
  <th
    data-slot="table-head"
    class=":uno: text-primary-foreground h-10 px-4 text-left align-middle font-medium md:h-12 [&:has([role=checkbox])]:pr-0"
  >
    <slot />
  </th>
</template>
