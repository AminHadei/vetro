import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { Button } from '@/features/buttons';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/features/feedback';

const meta = {
  title: 'Overlays/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent, Button },
    template: `
      <div style="padding: 4rem;">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button variant="outline">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>Add to library</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    components: { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent, Button },
    template: `
      <div style="display: flex; gap: 2rem; padding: 4rem;">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger><Button variant="outline">Default</Button></TooltipTrigger>
            <TooltipContent variant="default">Default tooltip</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger><Button variant="outline">Primary</Button></TooltipTrigger>
            <TooltipContent variant="primary">Primary tooltip</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger><Button variant="outline">Solid</Button></TooltipTrigger>
            <TooltipContent variant="solid">Solid tooltip</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    `,
  }),
};
