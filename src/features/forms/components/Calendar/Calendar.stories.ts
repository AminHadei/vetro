import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref, type Ref } from 'vue';

import { Calendar } from '@/features/forms';

const meta = {
  title: 'Forms/Calendar',
  component: Calendar,
  tags: ['autodocs'],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { Calendar },
    setup(): { date: Ref<Date | undefined> } {
      const date = ref<Date | undefined>(new Date());
      return { date };
    },
    template: `
      <div class="flex flex-col gap-3">
        <Calendar v-model="date" />
        <p class="text-muted-foreground text-sm">Selected: {{ date?.toLocaleDateString() ?? 'none' }}</p>
      </div>
    `,
  }),
};
