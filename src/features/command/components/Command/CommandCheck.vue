<script setup lang="ts">
  defineOptions({
    name: 'VetroCommandCheck',
  });
</script>

<template>
  <span
    data-slot="command-check"
    data-check="true"
    class=":uno: text-primary ms-auto size-4"
  >
    <span class=":uno: i-check size-4" />
  </span>
</template>
