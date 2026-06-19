<script setup lang="ts">
  defineOptions({
    name: 'VetroBreadcrumbPage',
  });
</script>

<template>
  <span
    data-slot="breadcrumb-page"
    aria-current="page"
    class=":uno: text-foreground font-semibold"
  >
    <slot />
  </span>
</template>
