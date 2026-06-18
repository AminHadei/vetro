import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { Button } from '@/features/buttons';
import { Toaster, toast } from '@/features/feedback';

const meta = {
  title: 'Feedback/Toaster',
  component: Toaster,
  tags: ['autodocs'],
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { Toaster, Button },
    setup(): { notify: () => void } {
      const notify = (): void => {
        toast('Event has been created', {
          description: 'Sunday, December 03, 2023 at 9:00 AM',
        });
      };
      return { notify };
    },
    template: `
      <div>
        <Button @click="notify">Show toast</Button>
        <Toaster />
      </div>
    `,
  }),
};
