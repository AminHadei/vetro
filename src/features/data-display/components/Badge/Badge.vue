<script setup lang="ts">
  import { computed } from 'vue';

  import { createVariants } from '@/features/shared/lib/utils/variants.util';

  import type { BadgeSize, BadgeVariant } from './badge.types';

  defineOptions({
    name: 'VetroBadge',
  });

  const { variant = 'default', size = 'md' } = defineProps<{
    variant?: BadgeVariant;
    size?: BadgeSize;
  }>();

  const badgeVariants = createVariants({
    base: ':uno: inline-flex items-center rounded font-semibold',
    variants: {
      variant: {
        default: ':uno: bg-muted text-muted-foreground',
        outline: ':uno: outline outline-2 outline-foreground text-foreground',
        solid: ':uno: bg-foreground text-background',
        surface: ':uno: outline outline-2 outline-border bg-primary text-primary-foreground',
      },
      size: {
        sm: ':uno: px-2 py-1 text-xs',
        md: ':uno: px-2.5 py-1.5 text-sm',
        lg: ':uno: px-3 py-2 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  });

  const badgeClass = computed(() => badgeVariants({ variant, size }));
</script>

<template>
  <span :class="badgeClass">
    <slot />
  </span>
</template>
