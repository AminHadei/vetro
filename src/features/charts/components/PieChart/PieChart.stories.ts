import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { PieChart } from '@/features/charts';

const meta = {
  title: 'Charts/PieChart',
  component: PieChart,
  tags: ['autodocs'],
} satisfies Meta<typeof PieChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: [
      { name: 'Chrome', value: 275 },
      { name: 'Safari', value: 200 },
      { name: 'Firefox', value: 90 },
    ],
    dataKey: 'value',
    nameKey: 'name',
    innerRadius: 40,
    outerRadius: 80,
  },
};

export const Donut: Story = {
  args: {
    data: [
      { name: 'Chrome', value: 275 },
      { name: 'Safari', value: 200 },
      { name: 'Firefox', value: 90 },
    ],
    dataKey: 'value',
    nameKey: 'name',
    innerRadius: 60,
    outerRadius: 90,
  },
};
