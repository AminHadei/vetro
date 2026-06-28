import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';

import { PhoneNumberInput } from '@/features/forms';

const meta = {
  title: 'Forms/PhoneNumberInput',
  component: PhoneNumberInput,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'Phone number value (v-model)',
    },
    countryCode: {
      control: 'text',
      description: 'Default country code (ISO2), null to show placeholder',
    },
    flagPlaceholder: {
      control: 'text',
      description: 'Placeholder text when no country is selected',
    },
  },
  args: {
    modelValue: '',
    countryCode: null,
    flagPlaceholder: 'Select country',
  },
  parameters: {
    docs: {
      description: {
        component:
          'A phone number input with country code selection and flag display. When no country is selected, a placeholder is shown instead of a flag.',
      },
    },
  },
} satisfies Meta<typeof PhoneNumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args): object => ({
    components: { PhoneNumberInput },
    setup(): object {
      const phoneNumber = ref('');
      return { args, phoneNumber };
    },
    template: `
      <div class="p-8">
        <div style="width: 402px;">
          <PhoneNumberInput v-model="phoneNumber" />
        </div>
        <div class="mt-4 text-sm text-muted-foreground">
          <p>No country selected by default - shows placeholder</p>
          <p>Value: {{ phoneNumber }}</p>
        </div>
      </div>
    `,
  }),
};

export const WithPlaceholder: Story = {
  render: (args): object => ({
    components: { PhoneNumberInput },
    setup(): object {
      const phoneNumber = ref('');
      return { args, phoneNumber };
    },
    template: `
      <div class="p-8">
        <div style="width: 402px;">
          <PhoneNumberInput
            v-model="phoneNumber"
            :country-code="null"
            flag-placeholder="Choose country"
            label="Phone number"
            required
          />
        </div>
      </div>
    `,
  }),
};

export const WithDefaultValue: Story = {
  render: (args): object => ({
    components: { PhoneNumberInput },
    setup(): object {
      const phoneNumber = ref('+1234567890');
      return { args, phoneNumber };
    },
    template: `
      <div class="p-8">
        <div style="width: 402px;">
          <PhoneNumberInput
            v-model="phoneNumber"
            country-code="us"
          />
        </div>
        <div class="mt-4 text-sm text-muted-foreground">
          <p>Pre-selected country: US</p>
          <p>Value: {{ phoneNumber }}</p>
        </div>
      </div>
    `,
  }),
};

export const DifferentCountry: Story = {
  render: (args): object => ({
    components: { PhoneNumberInput },
    setup(): object {
      const phoneNumber = ref('');
      return { args, phoneNumber };
    },
    template: `
      <div class="p-8">
        <div style="width: 402px;">
          <PhoneNumberInput
            v-model="phoneNumber"
            country-code="gb"
          />
        </div>
      </div>
    `,
  }),
};

export const FullWidth: Story = {
  render: (args): object => ({
    components: { PhoneNumberInput },
    setup(): object {
      const phoneNumber = ref('');
      return { args, phoneNumber };
    },
    template: `
      <div class="p-8">
        <PhoneNumberInput
          v-model="phoneNumber"
          :country-code="args.countryCode"
        />
      </div>
    `,
  }),
};

export const WithError: Story = {
  render: (): object => ({
    components: { PhoneNumberInput },
    setup(): object {
      const phoneNumber = ref('');
      return { phoneNumber };
    },
    template: `
      <div class="p-8" style="width: 402px;">
        <PhoneNumberInput
          v-model="phoneNumber"
          label="Phone number"
          country-code="us"
          error="Invalid phone number"
        />
      </div>
    `,
  }),
};
