<script setup lang="ts">
  import { computed, ref, useAttrs } from 'vue';

  import { randomInputId } from '@/features/shared/lib/utils/string.util';

  import CountryDropdown from '../CountryDropdown/CountryDropdown.vue';
  import FieldError from '../Field/FieldError.vue';
  import { countryTranslations, countryShortNames, type Iso2 } from './data';

  defineOptions({
    name: 'VetroPhoneNumberInput',
    inheritAttrs: false,
  });

  export interface PhoneNumberInputProps {
    label?: string;
    required?: boolean;
    modelValue?: string | null;
    countryCode?: Iso2 | null;
    flagPlaceholder?: string;
    error?: string | null;
    clearError?: () => void;
  }

  const props = withDefaults(defineProps<PhoneNumberInputProps>(), {
    label: '',
    required: false,
    modelValue: null,
    countryCode: 'us',
    flagPlaceholder: 'Example: +1 3052378809',
    error: null,
    clearError: () => {},
  });

  const attrs = useAttrs();
  const inputId = computed(() => (attrs['id'] ? String(attrs['id']) : randomInputId()));

  const emit = defineEmits<{
    'update:modelValue': [value: string];
    'update:countryCode': [value: Iso2 | null];
    'update:phoneNumber': [
      value: { countryCode: Iso2 | null; phoneNumber: string; fullNumber: string },
    ];
  }>();

  const selectedCountry = ref<Iso2 | null>(props.countryCode);
  const phoneInput = ref('');
  const inputRef = ref<HTMLInputElement | null>(null);

  const currentCountry = computed(() =>
    selectedCountry.value ? countryTranslations[selectedCountry.value] : null,
  );

  const findCountryByCode = (code: string): Iso2 | null => {
    const numericCode = Number.parseInt(code.replaceAll('+', ''), 10);

    const found = countryShortNames.find((iso) => countryTranslations[iso].code === numericCode);
    return found || null;
  };

  const parsePhoneInput = (value: string): { countryCode: string; phoneNumber: string } => {
    let matchedCountry: Iso2 | null = null;
    let matchedCode = '';

    const sortedCountries = [...countryShortNames].toSorted((a, b) => {
      const codeA = countryTranslations[a].code.toString();
      const codeB = countryTranslations[b].code.toString();
      return codeB.length - codeA.length;
    });

    for (const iso of sortedCountries) {
      const code = `+${countryTranslations[iso].code}`;
      if (value.startsWith(code)) {
        matchedCountry = iso;
        matchedCode = code;
        break;
      }
    }

    if (matchedCountry) {
      const phoneNumber = value.slice(matchedCode.length).replaceAll(/\D/g, '');
      return { countryCode: matchedCode, phoneNumber };
    }

    const codeMatch = value.match(/^(\+\d{1,4})/);
    if (codeMatch && codeMatch[1]) {
      const code = codeMatch[1];
      const phoneNumber = value.slice(code.length).replaceAll(/\D/g, '');
      return { countryCode: code, phoneNumber };
    }

    if (currentCountry.value) {
      const defaultCode = `+${currentCountry.value.code}`;
      const phoneNumber = value.replace(/^\+/, '').replaceAll(/\D/g, '');
      return { countryCode: defaultCode, phoneNumber };
    }

    const phoneNumber = value.replace(/^\+/, '').replaceAll(/\D/g, '');
    return { countryCode: '', phoneNumber };
  };

  const updatePhoneNumber = (
    fullValue?: string,
    countryCode?: string,
    phoneNumber?: string,
  ): void => {
    if (fullValue === '+' || (!fullValue && !countryCode)) {
      emit('update:modelValue', '+');
      emit('update:phoneNumber', {
        countryCode: selectedCountry.value,
        phoneNumber: '',
        fullNumber: '+',
      });
      props.clearError();
      return;
    }

    const parsed = fullValue
      ? parsePhoneInput(fullValue)
      : {
          countryCode: currentCountry.value ? `+${currentCountry.value.code}` : '',
          phoneNumber: '',
        };
    const code = countryCode || parsed.countryCode;
    const number = phoneNumber || parsed.phoneNumber;
    const fullNumber = `${code}${number}`;

    emit('update:modelValue', fullNumber);
    emit('update:phoneNumber', {
      countryCode: selectedCountry.value,
      phoneNumber: number,
      fullNumber,
    });
    props.clearError();
  };

  const handlePhoneInput = (event: Event): void => {
    const target = event.target as HTMLInputElement;
    let value = target.value;

    value = value.replaceAll(/[^+\d]/g, '');

    phoneInput.value = value;

    const { countryCode, phoneNumber } = parsePhoneInput(value);
    const matchedCountry = findCountryByCode(countryCode);

    if (matchedCountry && matchedCountry !== selectedCountry.value) {
      selectedCountry.value = matchedCountry;
      emit('update:countryCode', matchedCountry);
    }

    updatePhoneNumber(value, countryCode, phoneNumber);
  };

  const handleCountrySelect = (countryCode: Iso2 | null): void => {
    if (!countryCode) {
      return;
    }
    selectedCountry.value = countryCode;
    const countryCodeStr = `+${countryTranslations[countryCode].code}`;
    const currentNumber = phoneInput.value.replace(/^\+\d+/, '');
    phoneInput.value = countryCodeStr + currentNumber;
    emit('update:countryCode', countryCode);
    updatePhoneNumber(phoneInput.value, countryCodeStr, currentNumber);
    inputRef.value?.focus();
  };
</script>

<template>
  <div class=":uno: space-y-2">
    <label
      v-if="label"
      :for="inputId"
      class=":uno: font-head text-sm leading-none font-medium"
    >
      {{ label }}
      <span
        v-if="required"
        class=":uno: text-destructive"
        >*</span
      >
    </label>
    <div
      class=":uno: border-border bg-input focus-within:outline-primary flex items-center rounded border-2 px-4 py-2 shadow-md transition focus-within:shadow-xs focus-within:outline-2 focus-within:outline-offset-2"
      :class="error ? ':uno: border-destructive shadow-destructive shadow-xs' : ''"
    >
      <CountryDropdown
        :model-value="selectedCountry"
        min-width="320px"
        @update:model-value="handleCountrySelect"
        @select="handleCountrySelect"
      >
        <button
          type="button"
          class=":uno: flex min-w-6 items-center justify-center rounded transition-colors hover:opacity-80"
          :title="currentCountry ? currentCountry.name : flagPlaceholder"
        >
          <img
            v-if="currentCountry"
            :src="currentCountry.flag"
            :alt="currentCountry.name"
            class=":uno: size-4"
          />
          <div
            v-else
            class=":uno: bg-muted text-muted-foreground flex size-4 items-center justify-center rounded-sm text-[8px]"
            :aria-label="flagPlaceholder"
          >
            ?
          </div>
        </button>
      </CountryDropdown>

      <div class=":uno: bg-border mx-2 h-5 w-px" />

      <input
        ref="inputRef"
        :id="inputId"
        v-model="phoneInput"
        type="tel"
        class=":uno: placeholder:text-muted-foreground flex-1 border-none bg-transparent outline-none focus:ring-0"
        :placeholder="flagPlaceholder"
        :aria-invalid="error ? true : undefined"
        @input="handlePhoneInput"
      />
    </div>
    <FieldError v-if="error">{{ error }}</FieldError>
  </div>
</template>
