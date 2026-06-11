import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { Avatar, AvatarFallback, AvatarImage } from '@/features/data-display';

const meta = {
  title: 'Data Display/Avatar',
  component: Avatar,
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { Avatar, AvatarImage, AvatarFallback },
    template: `
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/150?img=12" alt="User avatar" />
        <AvatarFallback>VT</AvatarFallback>
      </Avatar>
    `,
  }),
};

export const Fallback: Story = {
  render: () => ({
    components: { Avatar, AvatarImage, AvatarFallback },
    template: `
      <Avatar>
        <AvatarImage src="" alt="Broken" />
        <AvatarFallback>VT</AvatarFallback>
      </Avatar>
    `,
  }),
};
