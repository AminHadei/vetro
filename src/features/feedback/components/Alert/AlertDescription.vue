<script setup lang="ts">
  defineOptions({
    name: 'VetroAlertDescription',
  });
</script>

<template>
  <div
    data-slot="alert-description"
    class="text-sm"
  >
    <slot />
  </div>
</template>
