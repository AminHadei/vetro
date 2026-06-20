<script setup lang="ts">
  import { inject } from 'vue';

  import { commandContextKey } from './command.context';

  defineOptions({
    name: 'VetroCommandInput',
    inheritAttrs: false,
  });

  const { placeholder = 'Type a command or search...' } = defineProps<{
    placeholder?: string;
  }>();

  const context = inject(commandContextKey);

  const onInput = (event: Event): void => {
    context?.setSearch((event.target as HTMLInputElement).value);
  };
</script>

<template>
  <div
    data-slot="command-input"
    class=":uno: border-border flex items-center border-b px-3"
  >
    <span class=":uno: i-search text-foreground me-2 size-4 shrink-0 opacity-50" />
    <input
      :value="context?.search.value"
      :placeholder="placeholder"
      data-slot="command-input-field"
      class=":uno: text-foreground placeholder:text-muted-foreground flex h-11 w-full rounded bg-transparent py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50"
      v-bind="$attrs"
      @input="onInput"
    />
  </div>
</template>
