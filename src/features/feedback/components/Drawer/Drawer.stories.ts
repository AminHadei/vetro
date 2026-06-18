import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';

import { Button } from '@/features/buttons';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/features/feedback';

const meta = {
  title: 'Feedback/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
  },
  args: {
    direction: 'right',
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args): object => ({
    components: {
      Drawer,
      DrawerTrigger,
      DrawerContent,
      DrawerHeader,
      DrawerTitle,
      DrawerDescription,
      DrawerFooter,
      DrawerClose,
      Button,
    },
    setup: (): object => {
      const open = ref(false);
      return { args, open };
    },
    template: `
      <Drawer v-model:open="open" :direction="args.direction">
        <DrawerTrigger>
          <Button>Open drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Drawer title</DrawerTitle>
            <DrawerDescription>A side panel that slides into view.</DrawerDescription>
          </DrawerHeader>
          <div style="padding: 1rem; flex: 1;">Drawer body content.</div>
          <DrawerFooter>
            <DrawerClose>
              <Button variant="outline" style="width: 100%;">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    `,
  }),
};
