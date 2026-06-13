<script setup lang="ts">
  defineOptions({
    name: 'VetroTable',
    inheritAttrs: false,
  });
</script>

<template>
  <div class=":uno: relative h-full w-full overflow-auto">
    <table
      data-slot="table"
      class=":uno: w-full caption-bottom border-2 text-sm shadow-lg"
      v-bind="$attrs"
    >
      <slot />
    </table>
  </div>
</template>
