<script setup lang="ts">
  import { computed } from 'vue';

  defineOptions({
    name: 'VetroSlider',
  });

  const {
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
  } = defineProps<{
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
  }>();

  const model = defineModel<number>({ default: 0 });

  const fillPercent = computed(() => {
    const range = max - min || 1;
    const clamped = Math.min(Math.max(Number(model.value), min), max);
    return `${((clamped - min) / range) * 100}%`;
  });
</script>

<template>
  <input
    v-model.number="model"
    type="range"
    class=":uno: vetro-slider w-full"
    :min="min"
    :max="max"
    :step="step"
    :disabled="disabled"
    :style="{ '--vetro-slider-fill': fillPercent }"
  />
</template>

<style scoped>
  .vetro-slider {
    appearance: none;
    -webkit-appearance: none;
    height: 0.75rem;
    cursor: pointer;
    border: 2px solid var(--border);
    background-color: var(--background);
    background-image: linear-gradient(var(--primary), var(--primary));
    background-repeat: no-repeat;
    background-size: var(--vetro-slider-fill, 0%) 100%;
  }

  .vetro-slider:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  .vetro-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    height: 1.125rem;
    width: 1.125rem;
    border: 2px solid var(--border);
    background-color: var(--background);
  }

  .vetro-slider::-moz-range-thumb {
    height: 1.125rem;
    width: 1.125rem;
    border: 2px solid var(--border);
    border-radius: 0;
    background-color: var(--background);
  }

  .vetro-slider::-moz-range-progress {
    height: 100%;
    background-color: var(--primary);
  }
</style>
