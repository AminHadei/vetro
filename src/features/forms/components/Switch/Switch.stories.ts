import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';

import { Switch } from '@/features/forms';

const meta = {
  title: 'Forms/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
  },
  args: {
    disabled: false,
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args): object => ({
    components: { Switch },
    setup: (): object => {
      const on = ref(true);
      return { args, on };
    },
    template: '<Switch v-bind="args" v-model="on" />',
  }),
};
