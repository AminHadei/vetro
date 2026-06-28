<script setup lang="ts">
  withDefaults(
    defineProps<{
      modelValue?: string | null;
      label?: string;
      required?: boolean;
      placeholder?: string;
    }>(),
    {
      modelValue: null,
      label: '',
      required: false,
      placeholder: '',
    },
  );

  const emit = defineEmits<{
    'update:modelValue': [value: string];
  }>();

  const handleInput = (event: Event): void => {
    emit('update:modelValue', (event.target as HTMLInputElement).value);
  };
</script>

<template>
  <div class=":uno: flex flex-col gap-2">
    <label
      v-if="label"
      class=":uno: font-head text-sm leading-none font-medium"
    >
      {{ label }}
      <span
        v-if="required"
        class=":uno: text-destructive"
        >*</span
      >
    </label>
    <input
      :placeholder="placeholder"
      type="number"
      inputmode="numeric"
      pattern="[0-9]*"
      class=":uno: border-border bg-input focus-visible:outline-primary w-full rounded border-2 px-4 py-2 shadow-md focus:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2"
      :value="modelValue ?? ''"
      @input="handleInput"
    />
  </div>
</template>

<style scoped>
  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type='number'] {
    -moz-appearance: textfield;
    appearance: textfield;
  }
</style>
