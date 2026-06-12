import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { Progress } from '@/features/data-display';

const meta = {
  title: 'Data Display/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
  },
  args: {
    value: 60,
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args): object => ({
    components: { Progress },
    setup: (): object => ({ args }),
    template: '<div style="width: 320px;"><Progress v-bind="args" /></div>',
  }),
};
