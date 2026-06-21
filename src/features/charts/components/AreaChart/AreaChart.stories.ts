import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { AreaChart } from '@/features/charts';

const sample = [
  { month: 'Jan', desktop: 186 },
  { month: 'Feb', desktop: 305 },
  { month: 'Mar', desktop: 237 },
];

const meta = {
  title: 'Charts/AreaChart',
  component: AreaChart,
  tags: ['autodocs'],
} satisfies Meta<typeof AreaChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: sample,
    index: 'month',
    categories: ['desktop'],
    fill: 'gradient',
  },
};
