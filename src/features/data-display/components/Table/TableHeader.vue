<script setup lang="ts">
  defineOptions({
    name: 'VetroTableHeader',
  });
</script>

<template>
  <thead
    data-slot="table-header"
    class=":uno: bg-primary text-primary-foreground font-head [&_tr]:border-b"
  >
    <slot />
  </thead>
</template>
