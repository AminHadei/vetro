<script setup lang="ts">
  import { Dialog, DialogContent } from '@/features/feedback';

  import Command from './Command.vue';

  defineOptions({
    name: 'VetroCommandDialog',
  });

  const open = defineModel<boolean>('open', { default: false });
</script>

<template>
  <Dialog v-model:open="open">
    <DialogContent
      size="md"
      class=":uno: overflow-hidden p-0"
    >
      <Command>
        <slot />
      </Command>
    </DialogContent>
  </Dialog>
</template>
