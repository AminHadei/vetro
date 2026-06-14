import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';

import { Textarea } from '@/features/forms';

const meta = {
  title: 'Forms/Textarea',
  component: Textarea,
  tags: ['autodocs'],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args): object => ({
    components: { Textarea },
    setup: (): object => {
      const value = ref('');
      return { args, value };
    },
    template: '<Textarea v-bind="args" v-model="value" placeholder="Write a message..." />',
  }),
};
