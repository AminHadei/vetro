<script setup lang="ts">
  defineOptions({
    name: 'VetroBreadcrumbLink',
  });

  const { href = '' } = defineProps<{
    href?: string;
  }>();
</script>

<template>
  <a
    data-slot="breadcrumb-link"
    :href="href === '' ? undefined : href"
    class=":uno: hover:text-foreground focus-visible:outline-primary rounded-sm font-medium transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
  >
    <slot />
  </a>
</template>
