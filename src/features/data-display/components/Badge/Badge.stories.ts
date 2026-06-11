import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { Badge } from '@/features/data-display';

const variantOptions = ['default', 'outline', 'solid', 'surface'] as const;
const sizeOptions = ['sm', 'md', 'lg'] as const;

const meta = {
  title: 'Data Display/Badge',
  component: Badge,
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
  },
  args: {
    variant: 'default',
    size: 'md',
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args): object => ({
    components: { Badge },
    setup: (): object => ({ args }),
    template: '<Badge v-bind="args">Badge</Badge>',
  }),
};

export const Variants: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
        <Badge variant="default">Default</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="solid">Solid</Badge>
        <Badge variant="surface">Surface</Badge>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
        <Badge size="sm">Small</Badge>
        <Badge size="md">Medium</Badge>
        <Badge size="lg">Large</Badge>
      </div>
    `,
  }),
};
