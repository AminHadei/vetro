import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';

import { Button } from '@/features/buttons';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/features/command';

const meta = {
  title: 'Command/CommandDialog',
  component: CommandDialog,
  tags: ['autodocs'],
} satisfies Meta<typeof CommandDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (): object => ({
    components: {
      CommandDialog,
      Command,
      CommandInput,
      CommandList,
      CommandEmpty,
      CommandGroup,
      CommandItem,
      Button,
    },
    setup: (): object => {
      const open = ref(false);
      return { open };
    },
    template: `
      <div>
        <Button @click="open = true">Open command dialog</Button>
        <CommandDialog v-model:open="open">
          <CommandInput placeholder="Type a command or search…" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem value="calendar">Calendar</CommandItem>
              <CommandItem value="search">Search</CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>
    `,
  }),
};
