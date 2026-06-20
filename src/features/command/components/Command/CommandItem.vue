<script setup lang="ts">
  import { computed, inject, onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue';

  import { commandContextKey } from './command.context';

  defineOptions({
    name: 'VetroCommandItem',
  });

  const { value = '', disabled = false } = defineProps<{
    value?: string;
    disabled?: boolean;
  }>();

  const emit = defineEmits<{
    select: [];
  }>();

  const context = inject(commandContextKey);
  const el = useTemplateRef<HTMLElement>('el');
  const id = Symbol('command-item');
  const searchable = ref(value);

  const visible = computed(() => context?.matches(searchable.value) ?? true);

  const onSelect = (): void => {
    if (!disabled) {
      emit('select');
    }
  };

  onMounted(() => {
    searchable.value = `${value} ${el.value?.textContent?.trim() ?? ''}`.trim();
    context?.registerItem(id, searchable.value);
  });

  onBeforeUnmount(() => context?.unregisterItem(id));
</script>

<template>
  <div
    v-show="visible"
    ref="el"
    role="option"
    data-slot="command-item"
    :data-disabled="disabled ? '' : undefined"
    class=":uno: hover:bg-accent hover:text-accent-foreground relative flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm transition-all outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
    @click="onSelect"
  >
    <slot />
  </div>
</template>
