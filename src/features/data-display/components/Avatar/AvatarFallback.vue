<script setup lang="ts">
  import { computed, inject } from 'vue';

  import { avatarContextKey } from './avatar.context';

  defineOptions({
    name: 'VetroAvatarFallback',
  });

  const context = inject(avatarContextKey);

  const visible = computed(() => context?.status.value !== 'loaded');
</script>

<template>
  <span
    v-show="visible"
    data-slot="avatar-fallback"
    class=":uno: bg-primary text-primary-foreground flex size-full items-center justify-center rounded-full"
  >
    <slot />
  </span>
</template>
