<script setup lang="ts">
  defineOptions({
    name: 'VetroFieldError',
  });
</script>

<template>
  <p
    data-slot="field-error"
    role="alert"
    class=":uno: text-destructive text-left text-sm leading-normal font-normal"
  >
    <slot />
  </p>
</template>
