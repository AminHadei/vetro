import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { Button } from '@/features/buttons';
import { Menu, MenuContent, MenuItem, MenuTrigger } from '@/features/navigation';

const meta = {
  title: 'Navigation/Menu',
  component: Menu,
  tags: ['autodocs'],
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { Menu, MenuTrigger, MenuContent, MenuItem, Button },
    template: `
      <div style="padding: 4rem;">
        <Menu>
          <MenuTrigger>
            <Button variant="outline">Open menu</Button>
          </MenuTrigger>
          <MenuContent>
            <MenuItem>Profile</MenuItem>
            <MenuItem>Billing</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuItem disabled>Disabled</MenuItem>
          </MenuContent>
        </Menu>
      </div>
    `,
  }),
};
