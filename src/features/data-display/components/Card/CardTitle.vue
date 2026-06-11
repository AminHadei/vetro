<script setup lang="ts">
  import Text from '../Text/Text.vue';

  defineOptions({
    name: 'VetroCardTitle',
  });
</script>

<template>
  <Text
    as="h3"
    data-slot="card-title"
    class="mb-2"
  >
    <slot />
  </Text>
</template>
