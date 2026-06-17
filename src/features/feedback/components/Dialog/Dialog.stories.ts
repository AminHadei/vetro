import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';

import { Button } from '@/features/buttons';
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/features/feedback';

const meta = {
  title: 'Feedback/Dialog',
  component: Dialog,
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: {
      Dialog,
      DialogTrigger,
      DialogContent,
      DialogHeader,
      DialogTitle,
      DialogBody,
      DialogDescription,
      DialogFooter,
      Button,
    },
    setup: (): object => {
      const open = ref(false);
      return { open };
    },
    template: `
      <Dialog v-model:open="open">
        <DialogTrigger>
          <Button>Open dialog</Button>
        </DialogTrigger>
        <DialogContent size="md">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <DialogDescription>Make changes to your profile here. Click save when done.</DialogDescription>
          </DialogBody>
          <DialogFooter>
            <Button variant="outline" @click="open = false">Cancel</Button>
            <Button @click="open = false">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    `,
  }),
};
