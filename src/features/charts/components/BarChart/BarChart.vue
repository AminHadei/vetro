<script setup lang="ts">
  import type { EChartsOption } from 'echarts';
  import { computed } from 'vue';
  import VChart from 'vue-echarts';

  import { buildBarChartOption } from '../../lib/bar-chart-option';
  import {
    defaultFillColors,
    defaultGridColor,
    defaultStrokeColors,
    defaultTooltipBg,
    defaultTooltipBorder,
    formatValue,
  } from '../../lib/chart-defaults';
  import { registerVetroCharts } from '../../lib/register-echarts';
  import type { CategoryChartProps } from '../chart.types';

  defineOptions({
    name: 'VetroBarChart',
    inheritAttrs: false,
  });

  registerVetroCharts();

  const props = withDefaults(
    defineProps<
      CategoryChartProps & {
        stacked?: boolean;
        alignment?: 'vertical' | 'horizontal';
      }
    >(),
    {
      strokeColors: () => defaultStrokeColors,
      fillColors: () => defaultFillColors,
      tooltipBgColor: defaultTooltipBg,
      tooltipBorderColor: defaultTooltipBorder,
      gridColor: defaultGridColor,
      valueFormatter: formatValue,
      showGrid: true,
      showTooltip: true,
      stacked: false,
      alignment: 'vertical',
    },
  );

  const option = computed((): EChartsOption => buildBarChartOption(props));
</script>

<template>
  <div
    data-slot="bar-chart"
    class=":uno: h-80 w-full"
    v-bind="$attrs"
  >
    <VChart
      :option="option"
      autoresize
      class=":uno: h-full w-full"
    />
  </div>
</template>
