<script setup lang="ts">
  defineOptions({
    name: 'VetroCommandList',
  });
</script>

<template>
  <div
    role="listbox"
    data-slot="command-list"
    class=":uno: bg-background max-h-80 overflow-y-auto overscroll-contain"
  >
    <slot />
  </div>
</template>
