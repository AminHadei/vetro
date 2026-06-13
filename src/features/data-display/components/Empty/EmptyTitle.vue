<script setup lang="ts">
  import Text from '../Text/Text.vue';

  defineOptions({
    name: 'VetroEmptyTitle',
  });
</script>

<template>
  <Text
    as="h3"
    data-slot="empty-title"
    class=":uno: text-lg font-bold md:text-2xl"
  >
    <slot />
  </Text>
</template>
