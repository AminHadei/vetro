<script setup lang="ts">
  import { useEventListener } from '@vueuse/core';
  import { computed, inject } from 'vue';

  import { useTeleportTarget } from '@/features/shared/lib/composables/use-teleport-target';

  import { drawerContextKey, type DrawerDirection } from './drawer.context';

  defineOptions({
    name: 'VetroDrawerContent',
    inheritAttrs: false,
  });

  const context = inject(drawerContextKey);

  const direction = computed<DrawerDirection>(() => context?.direction.value ?? 'right');

  const panelClasses: Record<DrawerDirection, string> = {
    top: ':uno: inset-x-0 top-0 max-h-[80vh] rounded-b border-b-2',
    bottom: ':uno: inset-x-0 bottom-0 max-h-[80vh] rounded-t border-t-2',
    left: ':uno: inset-y-0 left-0 h-full w-3/4 border-r-2 sm:max-w-sm',
    right: ':uno: inset-y-0 right-0 h-full w-3/4 border-l-2 sm:max-w-sm',
  };

  const panelClass = computed(() => panelClasses[direction.value]);
  const transitionName = computed(() => `vetro-drawer-${direction.value}`);
  const teleportTarget = useTeleportTarget();

  useEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Escape' && context?.open.value === true) {
      context.close();
    }
  });
</script>

<template>
  <Teleport :to="teleportTarget">
    <Transition name="vetro-drawer-fade">
      <div
        v-if="context?.open.value"
        class=":uno: fixed inset-0 z-50 bg-black/50"
        @click="context?.close()"
      />
    </Transition>
    <Transition :name="transitionName">
      <div
        v-if="context?.open.value"
        data-slot="drawer-content"
        role="dialog"
        aria-modal="true"
        :class="[':uno: border-border bg-background fixed z-50 flex flex-col', panelClass]"
        v-bind="$attrs"
      >
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
  .vetro-drawer-fade-enter-active,
  .vetro-drawer-fade-leave-active {
    transition: opacity 0.25s ease;
  }

  .vetro-drawer-fade-enter-from,
  .vetro-drawer-fade-leave-to {
    opacity: 0;
  }

  .vetro-drawer-right-enter-active,
  .vetro-drawer-right-leave-active,
  .vetro-drawer-left-enter-active,
  .vetro-drawer-left-leave-active,
  .vetro-drawer-top-enter-active,
  .vetro-drawer-top-leave-active,
  .vetro-drawer-bottom-enter-active,
  .vetro-drawer-bottom-leave-active {
    transition: transform 0.25s ease;
  }

  .vetro-drawer-right-enter-from,
  .vetro-drawer-right-leave-to {
    transform: translateX(100%);
  }

  .vetro-drawer-left-enter-from,
  .vetro-drawer-left-leave-to {
    transform: translateX(-100%);
  }

  .vetro-drawer-top-enter-from,
  .vetro-drawer-top-leave-to {
    transform: translateY(-100%);
  }

  .vetro-drawer-bottom-enter-from,
  .vetro-drawer-bottom-leave-to {
    transform: translateY(100%);
  }
</style>
