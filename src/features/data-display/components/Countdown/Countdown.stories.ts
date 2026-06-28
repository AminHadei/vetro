import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { Countdown } from '@/features/data-display';

const meta = {
  title: 'Data Display/Countdown',
  component: Countdown,
  tags: ['autodocs'],
  argTypes: {
    format: { control: 'select', options: ['short', 'long'] },
    showIcon: { control: 'boolean' },
  },
} satisfies Meta<typeof Countdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    startDate: new Date(Date.now() + 1000 * 60 * 60 * 26),
    format: 'short',
    showIcon: true,
  },
};
