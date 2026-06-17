<script setup lang="ts">
  import { inject } from 'vue';

  import { dialogContextKey } from './dialog.context';

  defineOptions({
    name: 'VetroDialogTrigger',
  });

  const context = inject(dialogContextKey);
</script>

<template>
  <span
    data-slot="dialog-trigger"
    class="inline-flex"
    @click="context?.setOpen(true)"
  >
    <slot />
  </span>
</template>
