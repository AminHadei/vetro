import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { fn } from 'storybook/test';
import { ref } from 'vue';

import { Button } from '@/features/buttons';

import CountryDropdown from './CountryDropdown.vue';
import type { Iso2 } from '../PhoneNumberInput/data';

const meta = {
  title: 'Forms/CountryDropdown',
  component: CountryDropdown,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'Selected country code (ISO2)',
    },
    minWidth: {
      control: 'text',
      description: 'Minimum width of dropdown (CSS value)',
    },
    maxHeight: {
      control: 'text',
      description: 'Maximum height of dropdown (CSS value)',
    },
    closeOnSelect: {
      control: 'boolean',
      description: 'Whether to close dropdown after selecting a country',
    },
  },
  args: {
    minWidth: '400px',
    maxHeight: '300px',
    closeOnSelect: true,
  },
  parameters: {
    docs: {
      description: {
        component:
          'A dropdown component for selecting countries with flags, names, and phone codes.',
      },
    },
  },
} satisfies Meta<typeof CountryDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args): object => ({
    components: {
      CountryDropdown,
      Button,
    },
    setup(): object {
      const selectedCountry = ref<Iso2 | null>('us');

      return {
        args,
        selectedCountry,
        onSelect: fn(),
      };
    },
    template: `
      <div class="p-8">
        <CountryDropdown
          v-model="selectedCountry"
          v-bind="args"
          @select="onSelect"
        >
          <Button>
            {{ selectedCountry ? selectedCountry.toUpperCase() : 'Select Country' }}
          </Button>
        </CountryDropdown>

        <div v-if="selectedCountry" class="mt-4 text-sm text-muted-foreground">
          Selected: {{ selectedCountry.toUpperCase() }}
        </div>
      </div>
    `,
  }),
};

export const WithCustomWidth: Story = {
  render: (args): object => ({
    components: {
      CountryDropdown,
      Button,
    },
    setup(): object {
      const selectedCountry = ref<Iso2 | null>('us');

      return { args, selectedCountry };
    },
    template: `
      <div class="p-8">
        <CountryDropdown
          v-model="selectedCountry"
          v-bind="args"
          min-width="300px"
        >
          <Button>
            {{ selectedCountry ? selectedCountry.toUpperCase() : 'Select Country' }}
          </Button>
        </CountryDropdown>
      </div>
    `,
  }),
};

export const PreSelected: Story = {
  render: (args): object => ({
    components: {
      CountryDropdown,
      Button,
    },
    setup(): object {
      const selectedCountry = ref<Iso2 | null>('gb');

      return { args, selectedCountry };
    },
    template: `
      <div class="p-8">
        <CountryDropdown
          v-model="selectedCountry"
          v-bind="args"
        >
          <Button>
            {{ selectedCountry ? selectedCountry.toUpperCase() : 'Select Country' }}
          </Button>
        </CountryDropdown>
      </div>
    `,
  }),
};

export const KeepOpenOnSelect: Story = {
  render: (args): object => ({
    components: {
      CountryDropdown,
      Button,
    },
    setup(): object {
      const selectedCountry = ref<Iso2 | null>(null);

      return { args, selectedCountry };
    },
    template: `
      <div class="p-8">
        <CountryDropdown
          v-model="selectedCountry"
          v-bind="args"
          :close-on-select="false"
        >
          <Button>
            {{ selectedCountry ? selectedCountry.toUpperCase() : 'Select Countries' }}
          </Button>
        </CountryDropdown>
      </div>
    `,
  }),
};
