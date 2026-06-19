<script setup lang="ts">
  defineOptions({
    name: 'VetroBreadcrumbList',
  });
</script>

<template>
  <ol
    data-slot="breadcrumb-list"
    class=":uno: text-muted-foreground flex flex-wrap items-center gap-1.5 sm:gap-2.5"
  >
    <slot />
  </ol>
</template>
