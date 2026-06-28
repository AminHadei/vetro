<script setup lang="ts">
  import { computed } from 'vue';

  import { createVariants } from '@/features/shared/lib/utils/variants.util';

  import type { ButtonSize, ButtonVariant } from './button.types';

  defineOptions({
    name: 'VetroButton',
  });

  const {
    variant = 'default',
    size = 'md',
    disabled = false,
    type = 'button',
    href = '',
    to = '',
  } = defineProps<{
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    href?: string;
    to?: string | Record<string, unknown>;
  }>();

  const buttonVariants = createVariants({
    base: ':uno: font-head inline-flex cursor-pointer items-center justify-center font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60',
    variants: {
      variant: {
        default:
          ':uno: border-2 border-border bg-primary text-primary-foreground shadow-md hover:translate-y-1 hover:bg-primary-hover hover:shadow active:translate-x-1 active:translate-y-2 active:shadow-none',
        secondary:
          ':uno: border-2 border-border bg-secondary text-secondary-foreground shadow-md hover:translate-y-1 hover:bg-secondary-hover hover:text-secondary-hover-foreground hover:shadow active:translate-x-1 active:translate-y-2 active:shadow-none',
        outline:
          ':uno: border-2 border-border bg-transparent shadow-md hover:translate-y-1 hover:shadow active:translate-x-1 active:translate-y-2 active:shadow-none',
        link: ':uno: bg-transparent hover:underline',
        ghost: ':uno: bg-transparent hover:bg-accent',
      },
      size: {
        sm: ':uno: px-3 py-1 text-sm',
        md: ':uno: px-4 py-1.5 text-base',
        lg: ':uno: px-6 py-2 text-lg lg:px-8 lg:py-3',
        icon: 'p-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  });

  const componentType = computed(() => {
    if (to) return 'router-link';
    if (href) return 'a';
    return 'button';
  });

  const buttonClass = computed(() => buttonVariants({ variant, size }));

  // Native <button> handles disabled clicks; links need a manual block.
  const linkDisabled = computed(() => disabled && componentType.value !== 'button');
</script>

<template>
  <component
    :is="componentType"
    :class="[buttonClass, { ':uno: pointer-events-none opacity-60': linkDisabled }]"
    :disabled="componentType === 'button' ? disabled : undefined"
    :type="componentType === 'button' ? type : undefined"
    :href="componentType === 'a' && !disabled ? href || undefined : undefined"
    :to="componentType === 'router-link' ? to : undefined"
    :aria-disabled="disabled || undefined"
  >
    <slot />
  </component>
</template>
