<script setup lang="ts">
  import { inject } from 'vue';

  import { drawerContextKey } from './drawer.context';

  defineOptions({
    name: 'VetroDrawerClose',
  });

  const context = inject(drawerContextKey);
</script>

<template>
  <span
    data-slot="drawer-close"
    class="inline-flex"
    @click="context?.close()"
  >
    <slot />
  </span>
</template>
