import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { Text } from '@/features/data-display';

const asOptions = ['p', 'li', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;

const meta = {
  title: 'Data Display/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: [...asOptions],
      description: 'Element/tag to render and its typographic scale',
    },
  },
  args: {
    as: 'p',
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args): object => ({
    components: { Text },
    setup: (): object => ({ args }),
    template: '<Text v-bind="args">The quick brown fox jumps over the lazy dog</Text>',
  }),
};

export const Headings: Story = {
  render: () => ({
    components: { Text },
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <Text as="h1">Heading 1</Text>
        <Text as="h2">Heading 2</Text>
        <Text as="h3">Heading 3</Text>
        <Text as="h4">Heading 4</Text>
        <Text as="h5">Heading 5</Text>
        <Text as="h6">Heading 6</Text>
        <Text as="p">Paragraph body text.</Text>
      </div>
    `,
  }),
};
