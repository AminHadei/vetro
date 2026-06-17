<script setup lang="ts">
  import { inject } from 'vue';

  import { dialogContextKey } from './dialog.context';

  defineOptions({
    name: 'VetroDialogClose',
  });

  const context = inject(dialogContextKey);
</script>

<template>
  <span
    data-slot="dialog-close"
    class="inline-flex"
    @click="context?.close()"
  >
    <slot />
  </span>
</template>
