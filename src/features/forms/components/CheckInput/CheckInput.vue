<script setup lang="ts">
  import { useForm } from '@/features/shared/lib/composables/use-form';

  defineOptions({
    name: 'VetroCheckInput',
    inheritAttrs: false,
  });

  defineProps<{
    modelValue: boolean;
  }>();

  const emit = defineEmits<{
    'update:modelValue': [value: boolean];
  }>();

  const handleChange = (event: Event): void => {
    emit('update:modelValue', (event.target as HTMLInputElement).checked);
  };

  const form = useForm();
</script>

<template>
  <div class=":uno: flex items-start gap-2">
    <input
      :id="form.attrId"
      type="checkbox"
      class=":uno: border-border size-4 shrink-0 cursor-pointer rounded border-2 accent-primary"
      :class="[{ ':uno: mt-0.5': $slots['default'] }]"
      :checked="modelValue"
      @change="handleChange"
    />
    <label
      v-if="$slots['default']"
      :for="form.attrId"
      class=":uno: text-foreground text-sm"
    >
      <slot />
    </label>
  </div>
</template>
