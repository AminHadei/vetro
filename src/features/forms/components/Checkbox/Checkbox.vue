<script setup lang="ts">
  import { computed } from 'vue';

  import { createVariants } from '@/features/shared/lib/utils/variants.util';

  import type { CheckboxSize, CheckboxVariant } from './checkbox.types';

  defineOptions({
    name: 'VetroCheckbox',
  });

  const {
    variant = 'default',
    size = 'md',
    disabled = false,
  } = defineProps<{
    variant?: CheckboxVariant;
    size?: CheckboxSize;
    disabled?: boolean;
  }>();

  const model = defineModel<boolean>({ default: false });

  const boxVariants = createVariants({
    base: ':uno: inline-flex shrink-0 items-center justify-center rounded border-2 border-border transition',
    variants: {
      size: {
        sm: 'size-4',
        md: 'size-5',
        lg: 'size-6',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  });

  const checkedClasses: Record<CheckboxVariant, string> = {
    default: ':uno: bg-primary text-primary-foreground',
    outline: 'text-foreground',
    solid: ':uno: bg-foreground text-background',
  };

  const boxClass = computed(() => boxVariants({ size }));
  const stateClass = computed(() => (model.value ? checkedClasses[variant] : ''));
</script>

<template>
  <label
    class=":uno: inline-flex cursor-pointer items-center"
    :class="{ ':uno: cursor-not-allowed opacity-50': disabled }"
  >
    <input
      v-model="model"
      type="checkbox"
      class=":uno: peer sr-only"
      :disabled="disabled"
    />
    <span :class="[boxClass, stateClass]">
      <span
        v-show="model"
        class=":uno: i-check size-full"
      />
    </span>
  </label>
</template>
