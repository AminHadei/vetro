import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { InputNumber } from '@/features/forms';

const meta = {
  title: 'Forms/InputNumber',
  component: InputNumber,
  tags: ['autodocs'],
} satisfies Meta<typeof InputNumber>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { modelValue: '10', label: 'Quantity', placeholder: '0' },
};
