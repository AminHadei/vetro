<script setup lang="ts">
  import { type ComponentPublicInstance, inject } from 'vue';

  import { carouselContextKey } from './carousel.context';

  defineOptions({
    name: 'VetroCarouselContent',
  });

  const context = inject(carouselContextKey);
  const orientation = context?.orientation ?? 'horizontal';

  const setRef = (el: Element | ComponentPublicInstance | null): void => {
    if (context !== undefined) {
      context.carouselRef.value = (el as HTMLElement | null) ?? undefined;
    }
  };
</script>

<template>
  <div
    :ref="setRef"
    data-slot="carousel-content"
    class="overflow-hidden"
  >
    <div
      class="flex"
      :class="orientation === 'horizontal' ? '-ml-4' : ':uno: -mt-4 flex-col'"
    >
      <slot />
    </div>
  </div>
</template>
