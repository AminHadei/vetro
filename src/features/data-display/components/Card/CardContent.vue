<script setup lang="ts">
  defineOptions({
    name: 'VetroCardContent',
  });
</script>

<template>
  <div
    data-slot="card-content"
    class="p-4"
  >
    <slot />
  </div>
</template>
