import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { LineChart } from '@/features/charts';

const sample = [
  { month: 'Jan', desktop: 186, mobile: 80 },
  { month: 'Feb', desktop: 305, mobile: 200 },
  { month: 'Mar', desktop: 237, mobile: 120 },
];

const meta = {
  title: 'Charts/LineChart',
  component: LineChart,
  tags: ['autodocs'],
} satisfies Meta<typeof LineChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: sample,
    index: 'month',
    categories: ['desktop', 'mobile'],
  },
};

export const Curved: Story = {
  args: {
    data: sample,
    index: 'month',
    categories: ['desktop', 'mobile'],
    smooth: true,
  },
};
