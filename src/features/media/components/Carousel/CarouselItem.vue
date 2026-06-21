<script setup lang="ts">
  import { inject } from 'vue';

  import { carouselContextKey } from './carousel.context';

  defineOptions({
    name: 'VetroCarouselItem',
  });

  const context = inject(carouselContextKey);
  const orientation = context?.orientation ?? 'horizontal';
</script>

<template>
  <div
    role="group"
    aria-roledescription="slide"
    data-slot="carousel-item"
    class=":uno: min-w-0 shrink-0 grow-0 basis-full"
    :class="orientation === 'horizontal' ? 'pl-4' : 'pt-4'"
  >
    <slot />
  </div>
</template>
