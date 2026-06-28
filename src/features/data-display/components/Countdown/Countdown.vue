<script setup lang="ts">
  import { useCountdown } from '@vueuse/core';
  import dayjs from 'dayjs';
  import dayjsDuration from 'dayjs/plugin/duration';
  import { computed, onMounted, onUnmounted, watch } from 'vue';

  import type { CountdownProps } from './countdown.types';

  dayjs.extend(dayjsDuration);

  const DEFAULT_ICON_CLASS = 'i-calendar size-4';

  const pluralize = (value: number, singular: string, plural: string): string =>
    `${value} ${value === 1 ? singular : plural}`;

  const props = withDefaults(defineProps<CountdownProps>(), {
    showIcon: true,
    iconClass: DEFAULT_ICON_CLASS,
    textClass: 'font-sans text-foreground',
    format: 'short',
  });

  const emit = defineEmits<{
    expired: [];
    tick: [remainingMs: number];
  }>();

  const usesDefaultIcon = computed(() => props.iconClass === DEFAULT_ICON_CLASS);

  const { start, remaining, stop } = useCountdown(dayjs(props.startDate).diff(dayjs(), 'second'));

  watch(
    () => remaining.value,
    (value) => {
      emit('tick', value * 1000);
      if (value <= 0) {
        emit('expired');
      }
    },
  );

  const countdownText = computed(() => {
    const duration = dayjs.duration(remaining.value, 'seconds');
    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    const format = (value: number, unit: 'd' | 'h' | 'm' | 's'): string => {
      if (props.format === 'long') {
        const labels: Record<typeof unit, string> = {
          d: pluralize(value, 'day', 'days'),
          h: pluralize(value, 'hour', 'hours'),
          m: pluralize(value, 'minute', 'minutes'),
          s: pluralize(value, 'second', 'seconds'),
        };
        return labels[unit];
      }
      return `${value}${unit}`;
    };

    const parts: string[] = [];

    if (days > 0) {
      parts.push(format(days, 'd'), format(hours, 'h'), format(minutes, 'm'), format(seconds, 's'));
    } else if (hours > 0) {
      parts.push(format(hours, 'h'), format(minutes, 'm'), format(seconds, 's'));
    } else if (minutes > 0) {
      parts.push(format(minutes, 'm'), format(seconds, 's'));
    } else if (seconds > 0) {
      parts.push(format(seconds, 's'));
    }

    return parts.join(' ');
  });

  onMounted(() => {
    start();
  });

  onUnmounted(() => {
    stop();
  });
</script>

<template>
  <div
    class=":uno: inline-flex items-center rounded border-2 border-border bg-background px-3 py-2 shadow-md"
    data-slot="countdown"
  >
    <span
      v-if="showIcon && usesDefaultIcon"
      class="i-calendar size-4 shrink-0 text-muted-foreground"
      aria-hidden="true"
    />
    <span
      v-else-if="showIcon"
      :class="iconClass"
      class="shrink-0 text-muted-foreground"
      aria-hidden="true"
    />
    <span :class="[textClass, showIcon ? 'ml-2' : '']">
      <slot
        :countdown="countdownText"
        :expired="remaining <= 0"
      >
        {{ remaining >= 0 ? `Starts in ${countdownText}` : '-' }}
      </slot>
    </span>
  </div>
</template>
