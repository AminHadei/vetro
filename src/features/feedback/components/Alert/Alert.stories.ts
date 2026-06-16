import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { Alert, AlertDescription, AlertTitle } from '@/features/feedback';

const variantOptions = ['default', 'solid'] as const;
const statusOptions = ['error', 'success', 'warning', 'info'] as const;

const meta = {
  title: 'Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [...variantOptions],
    },
    status: {
      control: 'select',
      options: [undefined, ...statusOptions],
    },
  },
  args: {
    variant: 'default',
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args): object => ({
    components: { Alert, AlertTitle, AlertDescription },
    setup: (): object => ({ args }),
    template: `
      <Alert v-bind="args" style="max-width: 420px;">
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
      </Alert>
    `,
  }),
};

export const Statuses: Story = {
  render: () => ({
    components: { Alert, AlertTitle, AlertDescription },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 420px;">
        <Alert status="info"><AlertTitle>Info</AlertTitle><AlertDescription>An informational message.</AlertDescription></Alert>
        <Alert status="success"><AlertTitle>Success</AlertTitle><AlertDescription>Operation completed.</AlertDescription></Alert>
        <Alert status="warning"><AlertTitle>Warning</AlertTitle><AlertDescription>Double-check your input.</AlertDescription></Alert>
        <Alert status="error"><AlertTitle>Error</AlertTitle><AlertDescription>Something went wrong.</AlertDescription></Alert>
      </div>
    `,
  }),
};
