<script setup lang="ts">
  defineOptions({
    name: 'VetroFieldDescription',
  });
</script>

<template>
  <p
    data-slot="field-description"
    class=":uno: text-muted-foreground text-left text-sm leading-normal font-normal"
  >
    <slot />
  </p>
</template>
