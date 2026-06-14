import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { Label } from '@/features/forms';

const meta = {
  title: 'Forms/Label',
  component: Label,
  tags: ['autodocs'],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { Label },
    template: '<Label for="email">Email address</Label>',
  }),
};
