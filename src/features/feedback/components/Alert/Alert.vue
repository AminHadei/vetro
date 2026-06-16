<script setup lang="ts">
  import { computed } from 'vue';

  import { createVariants } from '@/features/shared/lib/utils/variants.util';

  import type { AlertStatus, AlertVariant } from './alert.types';

  defineOptions({
    name: 'VetroAlert',
  });

  const { variant = 'default', status } = defineProps<{
    variant?: AlertVariant;
    status?: AlertStatus;
  }>();

  const alertVariants = createVariants({
    base: ':uno: relative w-full rounded border-2 border-border p-4 [&_svg]:shrink-0',
    variants: {
      variant: {
        default: ':uno: bg-background text-foreground',
        solid: ':uno: bg-foreground text-background',
      },
      status: {
        error: ':uno: border-red-800 bg-red-300 text-red-800',
        success: ':uno: border-green-800 bg-green-300 text-green-800',
        warning: ':uno: border-yellow-800 bg-yellow-300 text-yellow-800',
        info: ':uno: border-blue-800 bg-blue-300 text-blue-800',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  });

  const alertClass = computed(() => alertVariants({ variant, status }));
</script>

<template>
  <div
    role="alert"
    data-slot="alert"
    :class="alertClass"
  >
    <slot />
  </div>
</template>
