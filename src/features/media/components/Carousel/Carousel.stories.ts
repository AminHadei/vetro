import type { Meta, StoryObj } from '@storybook/vue3-vite';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/features/media';

const meta = {
  title: 'Media/Carousel',
  component: Carousel,
  tags: ['autodocs'],
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext },
    template: `
      <div style="padding: 0 3rem; max-width: 360px;">
        <Carousel>
          <CarouselContent>
            <CarouselItem v-for="n in 5" :key="n">
              <div class="border-border bg-card flex aspect-square items-center justify-center border-2 text-4xl font-head">
                {{ n }}
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    `,
  }),
};
