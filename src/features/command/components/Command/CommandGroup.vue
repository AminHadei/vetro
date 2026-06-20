<script setup lang="ts">
  defineOptions({
    name: 'VetroCommandGroup',
  });

  const { heading = '' } = defineProps<{
    heading?: string;
  }>();
</script>

<template>
  <div
    role="group"
    data-slot="command-group"
    class=":uno: text-foreground overflow-hidden p-1.5"
  >
    <div
      v-if="heading !== ''"
      data-slot="command-group-heading"
      class=":uno: text-muted-foreground px-2 py-1.5 text-xs font-medium"
    >
      {{ heading }}
    </div>
    <slot />
  </div>
</template>
