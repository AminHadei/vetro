<script setup lang="ts">
  defineOptions({
    name: 'VetroDrawerFooter',
  });
</script>

<template>
  <div
    data-slot="drawer-footer"
    class=":uno: border-border mt-auto flex flex-col gap-2 border-t-2 p-4"
  >
    <slot />
  </div>
</template>
