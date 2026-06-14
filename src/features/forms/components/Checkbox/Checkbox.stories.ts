import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';

import { Checkbox } from '@/features/forms';

const meta = {
  title: 'Forms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'outline', 'solid'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: {
    variant: 'default',
    size: 'md',
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args): object => ({
    components: { Checkbox },
    setup: (): object => {
      const checked = ref(true);
      return { args, checked };
    },
    template: '<Checkbox v-bind="args" v-model="checked" />',
  }),
};

export const Variants: Story = {
  render: () => ({
    components: { Checkbox },
    setup: (): object => ({ a: ref(true), b: ref(true), c: ref(true) }),
    template: `
      <div style="display:flex; gap:1rem; align-items:center;">
        <Checkbox v-model="a" variant="default" />
        <Checkbox v-model="b" variant="outline" />
        <Checkbox v-model="c" variant="solid" />
      </div>
    `,
  }),
};
