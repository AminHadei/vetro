<script setup lang="ts">
  defineOptions({
    name: 'VetroBreadcrumb',
  });
</script>

<template>
  <nav
    aria-label="breadcrumb"
    data-slot="breadcrumb"
    class=":uno: w-full text-sm"
  >
    <slot />
  </nav>
</template>
