<script setup lang="ts">
  import { provide, ref } from 'vue';

  import { avatarContextKey, type ImageLoadingStatus } from './avatar.context';

  defineOptions({
    name: 'VetroAvatar',
  });

  const status = ref<ImageLoadingStatus>('idle');

  provide(avatarContextKey, {
    status,
    setStatus: (next: ImageLoadingStatus): void => {
      status.value = next;
    },
  });
</script>

<template>
  <span
    data-slot="avatar"
    class=":uno: border-border relative flex size-14 shrink-0 overflow-hidden rounded-full border-2"
  >
    <slot />
  </span>
</template>
