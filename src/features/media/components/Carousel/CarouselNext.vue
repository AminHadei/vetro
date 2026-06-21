<script setup lang="ts">
  import { inject } from 'vue';

  import { IconButton } from '@/features/buttons';

  import { carouselContextKey } from './carousel.context';

  defineOptions({
    name: 'VetroCarouselNext',
  });

  const context = inject(carouselContextKey);
  const orientation = context?.orientation ?? 'horizontal';
</script>

<template>
  <IconButton
    variant="outline"
    size="sm"
    data-slot="carousel-next"
    :disabled="!(context?.canScrollNext.value ?? false)"
    class=":uno: absolute size-8 rounded"
    :class="
      orientation === 'horizontal'
        ? ':uno: top-1/2 -right-12 -translate-y-1/2'
        : ':uno: -bottom-12 left-1/2 -translate-x-1/2 rotate-90'
    "
    @click="context?.scrollNext()"
  >
    <span class=":uno: i-arrow-right size-4" />
    <span class="sr-only">Next slide</span>
  </IconButton>
</template>
