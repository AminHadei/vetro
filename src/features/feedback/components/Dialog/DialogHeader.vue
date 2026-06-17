<script setup lang="ts">
  import { inject } from 'vue';

  import { dialogContextKey } from './dialog.context';

  defineOptions({
    name: 'VetroDialogHeader',
  });

  const { closable = true } = defineProps<{
    closable?: boolean;
  }>();

  const context = inject(dialogContextKey);
</script>

<template>
  <div
    data-slot="dialog-header"
    class=":uno: border-border bg-primary text-primary-foreground flex min-h-12 items-center justify-between gap-4 border-b-2 px-4 py-2"
  >
    <slot />
    <button
      v-if="closable"
      type="button"
      aria-label="Close"
      class=":uno: inline-flex cursor-pointer items-center"
      @click="context?.close()"
    >
      <span class=":uno: i-x size-5" />
    </button>
  </div>
</template>
