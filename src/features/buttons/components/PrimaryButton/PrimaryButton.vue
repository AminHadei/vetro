<script lang="ts" setup>
  import { computed, useAttrs } from 'vue';

  defineOptions({
    name: 'VetroPrimaryButton',
  });

  const {
    to = '',
    href = '',
    loading = false,
    disabled = false,
    showChevron = true,
    variant = 'primary',
  } = defineProps<{
    to?: string | Record<string, unknown>;
    href?: string;
    loading?: boolean;
    disabled?: boolean;
    showChevron?: boolean;
    variant?: 'primary' | 'outline' | 'text';
  }>();

  const emit = defineEmits<{
    click: [event: Event];
  }>();

  const attrs = useAttrs();

  const componentType = computed(() => {
    if (to) return 'router-link';
    if (href) return 'a';
    return 'button';
  });

  const buttonClasses = computed(() => {
    const base = [
      ':uno: font-head inline-flex select-none items-center justify-center rounded-full border-2 border-border px-4 py-1.5 text-base font-medium shadow-md transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
    ];

    const variants = {
      primary: [
        ':uno: bg-primary text-primary-foreground hover:translate-y-0.5 hover:shadow active:translate-x-0.5 active:translate-y-1 active:shadow-none',
      ],
      outline: [
        ':uno: bg-transparent text-foreground hover:translate-y-0.5 hover:shadow active:translate-x-0.5 active:translate-y-1 active:shadow-none',
      ],
      text: [
        ':uno: border-transparent bg-transparent text-foreground shadow-none hover:underline',
      ],
    };

    const disabledVariant = {
      primary: [':uno: opacity-60'],
      outline: [':uno: opacity-60'],
      text: [':uno: opacity-60'],
    };

    const classes = [...base];

    if (disabled || loading) {
      classes.push(...disabledVariant[variant], ':uno: pointer-events-none');
    } else {
      classes.push(...variants[variant]);
    }

    return classes;
  });

  const handleClick = (event: Event): void => {
    if (componentType.value === 'button') {
      event.preventDefault();
    }

    if (disabled || loading) return;
    emit('click', event);
  };
</script>

<template>
  <component
    :is="componentType"
    :class="buttonClasses"
    :disabled="disabled"
    :href="href"
    :rel="href ? 'noopener noreferrer' : undefined"
    :to="to"
    v-bind="attrs"
    @click="handleClick"
  >
    <span class=":uno: flex items-center">
      <slot />
      <span
        v-if="loading || showChevron"
        class=":uno: ml-1 size-5 transition-transform duration-200 group-hover:translate-x-0.5"
      >
        <span
          v-if="loading"
          class=":uno: size-4 animate-spin rounded-full border-2 border-current border-b-transparent"
        />
        <span
          v-else
          class=":uno: i-chevron-right size-4"
        />
      </span>
    </span>
  </component>
</template>
