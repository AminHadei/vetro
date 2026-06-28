<script setup lang="ts">
  import { computed, ref } from 'vue';

  import BaseDropdown from '../BaseDropdown/BaseDropdown.vue';
  import type { BaseDropdownItem } from '../BaseDropdown/types';
  import { countryTranslations, countryShortNames, type Iso2 } from '../PhoneNumberInput/data';

  defineOptions({
    name: 'VetroCountryDropdown',
  });

  export interface CountryDropdownProps {
    modelValue?: Iso2 | null;
    minWidth?: string;
    maxHeight?: string;
    closeOnSelect?: boolean;
  }

  const props = withDefaults(defineProps<CountryDropdownProps>(), {
    modelValue: null,
    minWidth: '400px',
    maxHeight: '290px',
    closeOnSelect: true,
  });

  const minWidthValue = ref(Number.parseInt(props.minWidth.replaceAll('px', ''), 10));

  const emit = defineEmits<{
    'update:modelValue': [value: Iso2 | null];
    select: [country: Iso2];
  }>();

  interface CountryItem extends BaseDropdownItem {
    code: number;
    flag: string;
    iso2: Iso2;
  }

  const countryItems = computed<CountryItem[]>(() => {
    return countryShortNames.map((code) => ({
      id: code,
      label: countryTranslations[code].name,
      code: countryTranslations[code].code,
      flag: countryTranslations[code].flag,
      iso2: code,
    }));
  });

  const selectedCountry = computed<CountryItem | null>(() => {
    if (!props.modelValue) return null;
    return countryItems.value.find((item) => item.iso2 === props.modelValue) || null;
  });

  const handleSelect = (item: CountryItem | null): void => {
    if (!item) {
      emit('update:modelValue', null);
      return;
    }

    emit('update:modelValue', item.iso2);
    emit('select', item.iso2);
  };

  const isScreenWidthLessThanMinWidth = computed(() => {
    return globalThis.innerWidth < minWidthValue.value;
  });
</script>

<template>
  <BaseDropdown
    :model-value="selectedCountry"
    :items="countryItems"
    :min-width="isScreenWidthLessThanMinWidth ? `${minWidthValue - 110}px` : `${minWidthValue}px`"
    :max-height="maxHeight"
    :close-on-select="closeOnSelect"
    :style="{ marginLeft: isScreenWidthLessThanMinWidth ? '-20px' : '' }"
    @update:model-value="handleSelect"
  >
    <template #item="{ item, isSelected }">
      <div class=":uno: flex items-center gap-3 pr-6">
        <img
          :src="item.flag"
          :alt="item.label"
          loading="lazy"
          class=":uno: size-5 shrink-0"
        />
        <span class=":uno: text-foreground text-sm">
          {{ item.label }}
        </span>
        <span class=":uno: text-muted-foreground text-sm">+{{ item.code }}</span>
        <span
          v-if="isSelected"
          class=":uno: i-check text-primary absolute right-2 size-4 shrink-0"
        />
      </div>
    </template>

    <slot />
  </BaseDropdown>
</template>
