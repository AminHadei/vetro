<script setup lang="ts">
  import { inject } from 'vue';

  import { drawerContextKey } from './drawer.context';

  defineOptions({
    name: 'VetroDrawerTrigger',
  });

  const context = inject(drawerContextKey);
</script>

<template>
  <span
    data-slot="drawer-trigger"
    class="inline-flex"
    @click="context?.setOpen(true)"
  >
    <slot />
  </span>
</template>
