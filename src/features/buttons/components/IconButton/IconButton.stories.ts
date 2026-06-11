import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { IconButton } from '@/features/buttons';

const variantOptions = ['primary', 'outline', 'link'] as const;
const sizeOptions = ['sm', 'md', 'lg'] as const;

const meta = {
  title: 'Buttons/IconButton',
  component: IconButton,
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
    disabled: {
      control: 'boolean',
    },
  },
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args): object => ({
    components: { IconButton },
    setup: (): object => ({ args }),
    template: '<IconButton v-bind="args"><span class="i-search size-5" /></IconButton>',
  }),
};

export const Variants: Story = {
  render: () => ({
    components: { IconButton },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <IconButton variant="primary"><span class="i-search size-5" /></IconButton>
        <IconButton variant="outline"><span class="i-search size-5" /></IconButton>
        <IconButton variant="link"><span class="i-search size-5" /></IconButton>
      </div>
    `,
  }),
};
