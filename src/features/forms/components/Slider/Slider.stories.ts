import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';

import { Slider } from '@/features/forms';

const meta = {
  title: 'Forms/Slider',
  component: Slider,
  tags: ['autodocs'],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { Slider },
    setup: (): object => {
      const value = ref(40);
      return { value };
    },
    template: `
      <div style="width: 320px; display:flex; flex-direction:column; gap:.75rem;">
        <Slider v-model="value" :min="0" :max="100" />
        <span>{{ value }}</span>
      </div>
    `,
  }),
};
