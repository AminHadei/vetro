<script lang="ts" setup>
  import { useMediaQuery } from '@vueuse/core';
  import {
    type Component,
    computed,
    onMounted,
    onUnmounted,
    provide,
    ref,
    toRef,
    watch,
  } from 'vue';

  import ModalLayoutDefault from '@/features/feedback/components/Modal/layouts/ModalLayoutDefault.vue';
  import ModalLayoutFullscreen from '@/features/feedback/components/Modal/layouts/ModalLayoutFullscreen.vue';
  import { modalContextKey } from '@/features/feedback/components/Modal/Modal.context';
  import type { ModalProps } from '@/features/feedback/components/Modal/Modal.types';
  import { useBodyScrollLock } from '@/features/shared/lib/composables/use-body-scroll-lock';
  import { useDialogStack } from '@/features/shared/lib/composables/use-dialog-stack';
  import { useTeleportTarget } from '@/features/shared/lib/composables/use-teleport-target';

  const props = withDefaults(defineProps<ModalProps>(), {
    visible: false,
    title: null,
    layout: 'default',
    closable: true,
    showCloseButton: true,
    closeOnEscape: true,
    closeOnClickOutside: true,
    modalOnly: true,
    bottomSheetBreakpoint: '(max-width: 768px)',
    lockScroll: true,
    teleportTo: 'body',
    classes: () => ({}),
  });

  const emit = defineEmits<{
    'update:visible': [value: boolean];
    open: [];
    close: [];
    'tried-close': [];
  }>();

  defineOptions({ name: 'VetroModal', inheritAttrs: false });

  const isOpen = ref(props.visible);
  const teleportTarget = useTeleportTarget(props.teleportTo);

  const dialogId = Symbol('vetro-modal');
  const { register, unregister, isTopmost, index } = useDialogStack(dialogId);

  const Z_BASE = 100000;
  const Z_STEP = 10;
  const overlayZIndex = computed(() => Z_BASE + Math.max(0, index.value) * Z_STEP);

  const layoutRegistry: Record<string, Component> = {
    default: ModalLayoutDefault,
    fullscreen: ModalLayoutFullscreen,
  };
  const resolvedLayout = computed<Component>(() => {
    if (typeof props.layout === 'string') {
      return layoutRegistry[props.layout] ?? ModalLayoutDefault;
    }
    return props.layout;
  });

  const isMobile = useMediaQuery(() => props.bottomSheetBreakpoint);
  const isBottomSheet = computed(() => !props.modalOnly && isMobile.value);

  useBodyScrollLock(isOpen, { enabled: toRef(props, 'lockScroll') });

  const open = (): void => {
    if (isOpen.value) return;
    isOpen.value = true;
    emit('update:visible', true);
    emit('open');
  };

  const close = (): void => {
    if (!isOpen.value) return;
    if (!props.closable) {
      emit('tried-close');
      return;
    }
    isOpen.value = false;
    emit('update:visible', false);
    emit('close');
  };

  const toggle = (): void => {
    if (isOpen.value) close();
    else open();
  };

  const requestClose = (): void => {
    close();
  };

  const handleBackdropClick = (): void => {
    if (!props.closeOnClickOutside) return;
    requestClose();
  };

  const handleEscapeKey = (event: KeyboardEvent): void => {
    if (event.key !== 'Escape') return;
    if (!isOpen.value || !isTopmost.value) return;
    if (!props.closeOnEscape) return;
    event.stopPropagation();
    requestClose();
  };

  watch(
    () => props.visible,
    (val) => {
      isOpen.value = val;
    },
  );

  watch(
    isOpen,
    (val) => {
      if (val) register();
      else unregister();
    },
    { immediate: true },
  );

  onMounted(() => {
    document.addEventListener('keydown', handleEscapeKey);
  });

  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscapeKey);
    unregister();
  });

  provide(modalContextKey, {
    title: toRef(props, 'title'),
    closable: toRef(props, 'closable'),
    showCloseButton: toRef(props, 'showCloseButton'),
    isBottomSheet,
    classes: toRef(props, 'classes'),
    requestClose,
  });

  defineExpose({ open, close, toggle });

  /* @unocss-skip-start */
  const backdropStyles = computed(() => ({ zIndex: overlayZIndex.value }));
  /* @unocss-skip-end */

  const backdropClasses = computed(() => [
    ':uno: fixed inset-0 bg-black/80',
    props.classes?.backdrop,
  ]);
</script>

<template>
  <Teleport :to="teleportTarget">
    <Transition
      name="vetro-modal-backdrop"
      appear
    >
      <div
        v-if="isOpen"
        data-vetro-modal-backdrop
        :class="backdropClasses"
        :style="backdropStyles"
        @click.self="handleBackdropClick"
      />
    </Transition>

    <component
      :is="resolvedLayout"
      v-if="isOpen"
      v-bind="$attrs"
      data-vetro-modal-root
      :z-index="overlayZIndex + 1"
    >
      <template
        v-for="(_, name) in $slots"
        #[name]="slotProps"
      >
        <slot
          :name="name"
          v-bind="slotProps ?? {}"
        />
      </template>
    </component>
  </Teleport>
</template>

<style scoped>
  /* @unocss-skip-start */
  .vetro-modal-backdrop-enter-active,
  .vetro-modal-backdrop-leave-active {
    transition: opacity 0.25s ease;
  }
  .vetro-modal-backdrop-enter-from,
  .vetro-modal-backdrop-leave-to {
    opacity: 0;
  }
  /* @unocss-skip-end */
</style>
