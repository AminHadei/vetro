<script setup lang="ts">
  import { ref, watch } from 'vue';

  import { useForm } from '@/features/shared/lib/composables/use-form';

  import DatePicker from '../DatePicker/DatePicker.vue';

  defineOptions({
    name: 'VetroDateInput',
    inheritAttrs: false,
  });

  const props = withDefaults(
    defineProps<{
      modelValue: Date | null;
      label?: string;
      placeholder?: string;
      required?: boolean;
    }>(),
    {
      label: '',
      placeholder: 'Select date',
      required: false,
    },
  );

  const emit = defineEmits<{
    'update:modelValue': [value: Date];
  }>();

  const date = ref<Date | null>(props.modelValue);

  watch(
    () => props.modelValue,
    (value) => {
      date.value = value;
    },
  );

  const form = useForm();
</script>

<template>
  <div class=":uno: space-y-2">
    <label
      v-if="label"
      :for="form.attrId"
      class=":uno: font-head text-sm leading-none font-medium"
    >
      {{ label }}
      <span
        v-if="required"
        class=":uno: text-destructive"
        >*</span
      >
    </label>
    <DatePicker
      :model-value="date"
      :popover="{ placement: 'bottom' }"
      is-required
      @update:model-value="emit('update:modelValue', $event)"
    >
      <template #default="{ togglePopover, inputValue }">
        <button
          :id="form.attrId"
          type="button"
          class=":uno: border-border bg-input focus-visible:outline-primary flex w-full items-center justify-between rounded border-2 px-4 py-2 shadow-md focus:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2"
          @click="() => togglePopover()"
        >
          <span class=":uno: text-muted-foreground">
            {{ inputValue || placeholder }}
          </span>
          <span class=":uno: i-chevron-down size-4" />
        </button>
      </template>
    </DatePicker>
  </div>
</template>
