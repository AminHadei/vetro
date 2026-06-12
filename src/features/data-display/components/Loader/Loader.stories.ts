import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { Loader } from '@/features/data-display';

const variantOptions = ['default', 'secondary', 'outline'] as const;
const sizeOptions = ['sm', 'md', 'lg'] as const;

const meta = {
  title: 'Data Display/Loader',
  component: Loader,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [...variantOptions],
    },
    size: {
      control: 'select',
      options: [...sizeOptions],
    },
    count: {
      control: { type: 'number', min: 1, max: 6 },
    },
  },
  args: {
    variant: 'default',
    size: 'md',
    count: 3,
  },
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args): object => ({
    components: { Loader },
    setup: (): object => ({ args }),
    template: '<Loader v-bind="args" />',
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { Loader },
    template: `
      <div style="display: flex; gap: 1.5rem; align-items: center;">
        <Loader size="sm" />
        <Loader size="md" />
        <Loader size="lg" />
      </div>
    `,
  }),
};
