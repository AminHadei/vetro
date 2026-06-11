<script setup lang="ts">
  import { computed } from 'vue';

  import { createVariants } from '@/features/shared/lib/utils/variants.util';

  import type { IconButtonSize, IconButtonVariant } from './icon-button.types';

  defineOptions({
    name: 'VetroIconButton',
  });

  const {
    variant = 'primary',
    size = 'md',
    disabled = false,
    type = 'button',
  } = defineProps<{
    variant?: IconButtonVariant;
    size?: IconButtonSize;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
  }>();

  const iconButtonVariants = createVariants({
    base: ':uno: font-head inline-flex cursor-pointer items-center justify-center border-2 border-border transition-all disabled:cursor-not-allowed disabled:opacity-60',
    variants: {
      variant: {
        primary:
          ':uno: bg-primary text-primary-foreground shadow-md hover:bg-primary-hover hover:shadow-xs',
        outline: ':uno: bg-transparent shadow-md hover:shadow-xs',
        link: ':uno: border-transparent bg-transparent text-primary hover:underline',
      },
      size: {
        sm: 'p-2',
        md: 'p-3',
        lg: 'p-4',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  });

  const buttonClass = computed(() => iconButtonVariants({ variant, size }));
</script>

<template>
  <button
    :class="buttonClass"
    :type="type"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>
