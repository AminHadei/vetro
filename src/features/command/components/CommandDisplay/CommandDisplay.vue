<script setup lang="ts">
  import { computed, onBeforeUnmount, ref } from 'vue';

  defineOptions({
    name: 'VetroCommandDisplay',
  });

  const { command } = defineProps<{
    command: string;
  }>();

  const copied = ref(false);
  let timer: ReturnType<typeof setTimeout> | undefined;

  const palette = ['text-blue-300', 'text-yellow-300', 'text-green-300', 'text-purple-300'];

  const parts = computed(() =>
    command.split(' ').map((text, index) => ({
      text,
      color: palette[index % palette.length] ?? palette[0],
    })),
  );

  const copy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(command);
      copied.value = true;
      clearTimeout(timer);
      timer = setTimeout(() => {
        copied.value = false;
      }, 2000);
    } catch {
      copied.value = false;
    }
  };

  onBeforeUnmount(() => clearTimeout(timer));
</script>

<template>
  <div
    data-slot="command-display"
    class=":uno: group relative flex items-center bg-black/90 py-2 pl-4 font-mono text-xs"
  >
    <div class=":uno: flex-1 overflow-hidden whitespace-nowrap">
      <div class=":uno: overflow-hidden text-ellipsis">
        <span
          v-for="(part, index) in parts"
          :key="index"
          :class="part.color"
        >
          {{ part.text }}<template v-if="index < parts.length - 1">&nbsp;</template>
        </span>
      </div>
    </div>
    <button
      type="button"
      aria-label="Copy command"
      class="mr-2 shrink-0 p-1 text-gray-400 transition-colors hover:text-white"
      @click="copy"
    >
      <span
        :class="copied ? 'i-check text-green-400' : 'i-clipboard'"
        class="size-4"
      />
    </button>
  </div>
</template>
