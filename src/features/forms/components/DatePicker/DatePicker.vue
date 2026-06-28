<script setup lang="ts">
  import { DatePicker } from 'v-calendar';
  import { computed } from 'vue';

  import 'v-calendar/style.css';
  import type { DatePickerModel, PopoverOptions } from '../../lib/date-picker.types';

  defineOptions({
    name: 'VetroDatePicker',
  });

  interface DatePickerProps {
    modelValue?: DatePickerModel;
    popover?: Partial<PopoverOptions>;
    mode?: 'date' | 'dateTime' | 'time';
    isRequired?: boolean;
    disabledDates?: ({ start: Date | null; end: Date | null } | null)[];
  }

  const props = withDefaults(defineProps<DatePickerProps>(), {
    modelValue: () => new Date(),
    mode: 'date',
    isRequired: false,
    disabledDates: () => [],
    popover: () => ({}),
  });

  defineEmits<{
    'update:modelValue': [value: Date];
  }>();

  const resolvedPopover = computed(
    () => ({ ...props.popover, positionFixed: true }) as Record<string, unknown>,
  );
</script>

<template>
  <DatePicker
    :model-value="modelValue"
    class=":uno: vetro-datepicker"
    borderless
    :mode="mode"
    :is-required="isRequired"
    :disabled-dates="disabledDates"
    :popover="resolvedPopover"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <template
      v-if="$slots['default']"
      #default="slotProps"
    >
      <slot v-bind="slotProps" />
    </template>
  </DatePicker>
</template>

<style>
  .vetro-datepicker .vc-blue {
    --vc-accent-600: var(--primary, #000);
  }
  .vetro-datepicker {
    --vc-font-family: var(--font-head, inherit);
  }
</style>
