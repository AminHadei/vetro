import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { BarChart } from '@/features/charts';

const sample = [
  { month: 'Jan', desktop: 186, mobile: 80 },
  { month: 'Feb', desktop: 305, mobile: 200 },
  { month: 'Mar', desktop: 237, mobile: 120 },
  { month: 'Apr', desktop: 73, mobile: 190 },
];

const meta = {
  title: 'Charts/BarChart',
  component: BarChart,
  tags: ['autodocs'],
} satisfies Meta<typeof BarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: sample,
    index: 'month',
    categories: ['desktop', 'mobile'],
  },
};

export const Stacked: Story = {
  args: {
    data: sample,
    index: 'month',
    categories: ['desktop', 'mobile'],
    stacked: true,
  },
};

export const Horizontal: Story = {
  args: {
    data: sample,
    index: 'month',
    categories: ['desktop'],
    alignment: 'horizontal',
  },
};
