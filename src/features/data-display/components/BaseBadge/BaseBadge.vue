<script setup lang="ts">
  import { computed, type CSSProperties } from 'vue';

  import type { BaseBadgeColor } from './base-badge.types';

  export type { BaseBadgeColor };

  const PRESET_VARIANTS: Record<Exclude<BaseBadgeColor, 'custom'>, string> = {
    red: ':uno: bg-[#FEE2E2] text-[#B91C1C]',
    green: ':uno: bg-[#D1FAE5] text-[#047857]',
    white: ':uno: border-border bg-background text-foreground border-2',
    gray: ':uno: bg-badge-default-bg text-badge-default-text',
    black: ':uno: bg-foreground text-background',
  };

  const props = withDefaults(
    defineProps<{
      color?: BaseBadgeColor;
      customBackground?: string;
      customText?: string;
    }>(),
    {
      color: 'gray',
    },
  );

  const usesCustomColors = computed(
    () => props.color === 'custom' && !!(props.customBackground || props.customText),
  );

  const badgeVariantClasses = computed(() => {
    if (usesCustomColors.value) {
      return '';
    }

    if (props.color === 'custom') {
      return PRESET_VARIANTS.gray;
    }

    return PRESET_VARIANTS[props.color];
  });

  const customPresetFillClasses = computed(() => {
    if (!usesCustomColors.value) {
      return '';
    }

    const parts: string[] = [];
    if (!props.customBackground) {
      parts.push(':uno: bg-badge-default-bg');
    }
    if (!props.customText) {
      parts.push(':uno: text-badge-default-text');
    }
    return parts.join(' ');
  });

  const customStyle = computed((): CSSProperties | undefined => {
    if (!usesCustomColors.value) {
      return undefined;
    }

    return {
      ...(props.customBackground ? { backgroundColor: props.customBackground } : {}),
      ...(props.customText ? { color: props.customText } : {}),
    };
  });
</script>

<template>
  <div
    class=":uno: font-head inline-flex items-center justify-center rounded-full px-2.5 py-1 text-xs leading-none font-semibold"
    :class="[badgeVariantClasses, customPresetFillClasses]"
    :style="customStyle"
  >
    <slot />
  </div>
</template>
