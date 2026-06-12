<script setup lang="ts">
  import { computed } from 'vue';

  import { createVariants } from '@/features/shared/lib/utils/variants.util';

  import type { LoaderSize, LoaderVariant } from './loader.types';

  defineOptions({
    name: 'VetroLoader',
  });

  const {
    variant = 'default',
    size = 'md',
    count = 3,
    duration = 0.5,
    delayStep = 100,
  } = defineProps<{
    variant?: LoaderVariant;
    size?: LoaderSize;
    count?: number;
    duration?: number;
    delayStep?: number;
  }>();

  const loaderVariants = createVariants({
    base: ':uno: flex gap-1',
    variants: {
      variant: {
        default: ':uno: [&>div]:border-border [&>div]:bg-primary',
        secondary: ':uno: [&>div]:border-border [&>div]:bg-secondary',
        outline: ':uno: [&>div]:border-border [&>div]:bg-transparent',
      },
      size: {
        sm: ':uno: [&>div]:size-2',
        md: ':uno: [&>div]:size-3',
        lg: ':uno: [&>div]:size-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  });

  const loaderClass = computed(() => loaderVariants({ variant, size }));

  const dots = computed(() => Array.from({ length: Math.max(0, count) }, (_, index) => index));

  const dotStyle = (index: number): Record<string, string> => ({
    animationDuration: `${duration}s`,
    animationIterationCount: 'infinite',
    animationDelay: `${index * delayStep}ms`,
  });
</script>

<template>
  <div
    :class="loaderClass"
    role="status"
    aria-label="Loading..."
  >
    <div
      v-for="index in dots"
      :key="index"
      class=":uno: animate-bounce border-2"
      :style="dotStyle(index)"
    />
  </div>
</template>
