<script setup lang="ts">
  import { computed } from 'vue';

  import { createVariants } from '@/features/shared/lib/utils/variants.util';

  import type { TextAs } from './text.types';

  defineOptions({
    name: 'VetroText',
  });

  const { as = 'p' } = defineProps<{
    as?: TextAs;
  }>();

  const textVariants = createVariants({
    base: 'font-head',
    variants: {
      as: {
        p: ':uno: text-base',
        li: ':uno: text-base',
        a: ':uno: text-base underline-offset-2 decoration-primary hover:underline',
        h1: ':uno: text-4xl font-bold lg:text-5xl',
        h2: ':uno: text-3xl font-semibold lg:text-4xl',
        h3: ':uno: text-2xl font-medium',
        h4: ':uno: text-xl font-normal',
        h5: ':uno: text-lg font-normal',
        h6: ':uno: text-base font-normal',
      },
    },
    defaultVariants: {
      as: 'p',
    },
  });

  const textClass = computed(() => textVariants({ as }));
</script>

<template>
  <component
    :is="as"
    :class="textClass"
  >
    <slot />
  </component>
</template>
