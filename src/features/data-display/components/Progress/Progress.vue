<script setup lang="ts">
  import { computed } from 'vue';

  defineOptions({
    name: 'VetroProgress',
  });

  const { value = 0, max = 100 } = defineProps<{
    value?: number;
    max?: number;
  }>();

  const percent = computed(() => {
    if (max <= 0) return 0;
    return Math.min(100, Math.max(0, (value / max) * 100));
  });
</script>

<template>
  <div
    role="progressbar"
    :aria-valuenow="value"
    :aria-valuemin="0"
    :aria-valuemax="max"
    class=":uno: border-border bg-background relative h-4 w-full overflow-hidden border-2"
  >
    <div
      class=":uno: bg-primary size-full transition-all"
      :style="{ transform: `translateX(-${100 - percent}%)` }"
    />
  </div>
</template>
