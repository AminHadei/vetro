<script setup lang="ts">
  defineOptions({
    name: 'VetroTableBody',
  });
</script>

<template>
  <tbody
    data-slot="table-body"
    class=":uno: [&_tr:last-child]:border-0"
  >
    <slot />
  </tbody>
</template>
