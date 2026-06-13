import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';

import { Input } from '@/features/forms';

const meta = {
  title: 'Forms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    invalid: { control: 'boolean' },
  },
  args: {
    invalid: false,
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args): object => ({
    components: { Input },
    setup: (): object => {
      const value = ref('');
      return { args, value };
    },
    template: '<Input v-bind="args" v-model="value" placeholder="Enter text" />',
  }),
};

export const Invalid: Story = {
  args: { invalid: true },
  render: (args): object => ({
    components: { Input },
    setup: (): object => {
      const value = ref('invalid value');
      return { args, value };
    },
    template: '<Input v-bind="args" v-model="value" />',
  }),
};
