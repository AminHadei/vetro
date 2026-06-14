<script setup lang="ts">
  defineOptions({
    name: 'VetroTextarea',
  });

  const { invalid = false } = defineProps<{
    invalid?: boolean;
  }>();

  const model = defineModel<string>();
</script>

<template>
  <textarea
    v-model="model"
    rows="4"
    :aria-invalid="invalid || undefined"
    class=":uno: placeholder:text-muted-foreground border-border bg-input focus-visible:outline-primary w-full rounded border-2 px-4 py-2 shadow-md transition focus:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2"
    :class="invalid ? ':uno: border-destructive text-destructive shadow-destructive shadow-xs' : ''"
  />
</template>
