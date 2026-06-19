<script setup lang="ts">
  defineOptions({
    name: 'VetroBreadcrumbSeparator',
  });
</script>

<template>
  <li
    role="presentation"
    aria-hidden="true"
    data-slot="breadcrumb-separator"
    class="text-muted-foreground"
  >
    <slot>
      <span class=":uno: i-chevron-right block size-4" />
    </slot>
  </li>
</template>
