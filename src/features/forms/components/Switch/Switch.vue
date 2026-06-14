<script setup lang="ts">
  defineOptions({
    name: 'VetroSwitch',
  });

  const { disabled = false } = defineProps<{
    disabled?: boolean;
  }>();

  const model = defineModel<boolean>({ default: false });

  const toggle = (): void => {
    if (disabled) return;
    model.value = !model.value;
  };
</script>

<template>
  <button
    type="button"
    role="switch"
    :aria-checked="model"
    :disabled="disabled"
    class=":uno: border-foreground inline-flex h-6 w-11 shrink-0 items-center border-2 transition disabled:cursor-not-allowed disabled:opacity-50"
    :class="model ? 'bg-primary' : 'bg-input'"
    @click="toggle"
  >
    <span
      class=":uno: border-foreground mx-0.5 block size-4 border-2 transition-transform"
      :class="model ? ':uno: bg-background translate-x-5' : ':uno: bg-primary translate-x-0'"
    />
  </button>
</template>
