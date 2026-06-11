import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { Button } from '@/features/buttons';

const variantOptions = ['default', 'secondary', 'outline', 'link', 'ghost'] as const;
const sizeOptions = ['sm', 'md', 'lg', 'icon'] as const;

const meta = {
  title: 'Buttons/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [...variantOptions],
      description: 'Visual style of the button',
    },
    size: {
      control: 'select',
      options: [...sizeOptions],
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
    },
  },
  args: {
    variant: 'default',
    size: 'md',
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args): object => ({
    components: { Button },
    setup: (): object => ({ args }),
    template: '<Button v-bind="args">Button</Button>',
  }),
};

export const Variants: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
        <Button variant="default">Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="link">Link</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args): object => ({
    components: { Button },
    setup: (): object => ({ args }),
    template: '<Button v-bind="args">Disabled</Button>',
  }),
};
