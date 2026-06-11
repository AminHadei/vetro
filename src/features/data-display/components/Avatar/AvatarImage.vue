<script setup lang="ts">
  import { inject, onMounted, watch } from 'vue';

  import { avatarContextKey } from './avatar.context';

  defineOptions({
    name: 'VetroAvatarImage',
  });

  const { src = '', alt = '' } = defineProps<{
    src?: string;
    alt?: string;
  }>();

  const context = inject(avatarContextKey);

  const startLoading = (): void => {
    context?.setStatus(src === '' ? 'error' : 'loading');
  };

  onMounted(startLoading);
  watch(() => src, startLoading);
</script>

<template>
  <img
    v-show="context?.status.value === 'loaded'"
    data-slot="avatar-image"
    :src="src"
    :alt="alt"
    class=":uno: aspect-square size-full"
    @load="context?.setStatus('loaded')"
    @error="context?.setStatus('error')"
  />
</template>
