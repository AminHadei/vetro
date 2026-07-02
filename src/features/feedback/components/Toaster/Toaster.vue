<script setup lang="ts">
  import { Toaster as Sonner, type ToasterProps } from 'vue-sonner';

  import 'vue-sonner/style.css';

  defineOptions({
    name: 'VetroToaster',
    inheritAttrs: false,
  });

  defineProps<ToasterProps>();
</script>

<template>
  <Sonner
    data-slot="toaster"
    :toast-options="{
      unstyled: true,
      classes: {
        toast:
          ':uno: group toast relative flex w-full items-center gap-2 border-2 border-border bg-background p-4 text-foreground shadow-md',
        title: ':uno: ml-2 font-head',
        description: ':uno: ml-2 text-sm text-muted-foreground',
        actionButton:
          ':uno: ml-auto h-fit min-w-fit border-2 border-border bg-primary px-2 py-1 text-primary-foreground shadow transition-all hover:shadow-xs',
        cancelButton:
          ':uno: ml-auto h-fit min-w-fit border-2 border-border bg-muted px-2 py-1 text-sm text-foreground shadow transition-all hover:shadow-xs',
        closeButton: ':uno: absolute -top-1 -left-1 rounded-full bg-background p-0.5',
      },
    }"
    v-bind="$attrs"
  />
</template>
