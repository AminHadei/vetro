<script setup lang="ts">
  import Text from '@/features/data-display/components/Text/Text.vue';

  defineOptions({
    name: 'VetroAlertTitle',
  });
</script>

<template>
  <Text
    as="h5"
    data-slot="alert-title"
    class=":uno: mb-1 font-medium"
  >
    <slot />
  </Text>
</template>
