<script lang="ts" setup>
  import { computed, useSlots } from 'vue';

  import { useModalContext } from '@/features/feedback/components/Modal/Modal.context';

  interface Props {
    zIndex?: number;
  }

  const props = withDefaults(defineProps<Props>(), { zIndex: 100001 });

  defineOptions({ name: 'VetroModalLayoutDefault', inheritAttrs: false });

  const slots = useSlots();
  const { title, closable, showCloseButton, isBottomSheet, classes, requestClose } =
    useModalContext();

  const hasHeader = computed(() => Boolean(slots['header'] || title.value));
  const hasFooter = computed(() => Boolean(slots['footer']));
  const showClose = computed(() => closable.value && showCloseButton.value);

  /* @unocss-skip-start */
  const wrapperStyles = computed(() => ({ zIndex: props.zIndex }));
  /* @unocss-skip-end */

  const wrapperBaseClasses = computed(() => {
    if (isBottomSheet.value) {
      return ':uno: font-head fixed inset-0 flex flex-col justify-end pointer-events-none';
    }
    return ':uno: font-head fixed inset-0 flex items-center justify-center p-4 pointer-events-none';
  });

  const wrapperClasses = computed(() => [wrapperBaseClasses.value, classes.value.wrapper]);

  const bodyBaseClasses = computed(() => {
    if (isBottomSheet.value) {
      return ':uno: pointer-events-auto relative flex flex-col w-full max-h-[85vh] rounded-t border-2 border-border bg-background shadow-lg pb-[env(safe-area-inset-bottom)]';
    }
    return ':uno: pointer-events-auto relative flex w-full max-w-md max-h-[90vh] flex-col rounded border-2 border-border bg-background shadow-lg';
  });

  const transitionName = computed(() =>
    isBottomSheet.value ? 'vetro-modal-sheet' : 'vetro-modal-fade',
  );
</script>

<template>
  <Transition
    :name="transitionName"
    appear
  >
    <div
      data-vetro-modal-root
      role="dialog"
      aria-modal="true"
      :class="wrapperClasses"
      :style="wrapperStyles"
      @click.self="requestClose"
    >
      <div
        data-vetro-modal-body
        :class="[bodyBaseClasses, classes.body]"
        @click.stop
      >
        <span
          v-if="isBottomSheet"
          data-vetro-modal-handle
          aria-hidden="true"
          class=":uno: mx-auto mt-2 mb-1 h-1 w-10 rounded-full bg-border"
        />

        <div
          v-if="hasHeader"
          :class="[
            ':uno: flex shrink-0 items-start justify-between border-b-2 border-border px-6 pt-5 pb-4',
            classes.header,
          ]"
        >
          <div class=":uno: flex-1">
            <slot name="header">
              <h3 class=":uno: m-0 text-xl font-semibold text-foreground">
                {{ title }}
              </h3>
            </slot>
          </div>
        </div>

        <button
          v-if="showClose"
          type="button"
          data-vetro-modal-close
          aria-label="Close"
          :class="[
            ':uno: absolute top-5 right-5 cursor-pointer border-2 border-border bg-background px-2 py-1 text-lg leading-none',
            classes.closeButton,
          ]"
          @click="requestClose"
        >
          <slot name="close-icon">
            <span aria-hidden="true">×</span>
          </slot>
        </button>

        <div
          data-vetro-modal-content
          :class="[':uno: min-h-0 flex-1 overflow-y-auto px-6 py-5', classes.content]"
        >
          <slot name="content">
            <slot />
          </slot>
        </div>

        <div
          v-if="hasFooter"
          :class="[
            ':uno: shrink-0 border-t-2 border-border px-6 pt-4 pb-5',
            classes.footer,
          ]"
        >
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
  /* @unocss-skip-start */
  .vetro-modal-fade-enter-active,
  .vetro-modal-fade-leave-active {
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .vetro-modal-fade-enter-from,
  .vetro-modal-fade-leave-to {
    opacity: 0;
  }
  .vetro-modal-fade-enter-from > *,
  .vetro-modal-fade-leave-to > * {
    transform: scale(0.96);
  }

  .vetro-modal-sheet-enter-active,
  .vetro-modal-sheet-leave-active {
    transition: opacity 0.25s ease;
  }
  .vetro-modal-sheet-enter-active > [data-vetro-modal-body],
  .vetro-modal-sheet-leave-active > [data-vetro-modal-body] {
    transition: transform 0.3s cubic-bezier(0.32, 0.72, 0, 1);
  }
  .vetro-modal-sheet-enter-from,
  .vetro-modal-sheet-leave-to {
    opacity: 0;
  }
  .vetro-modal-sheet-enter-from > [data-vetro-modal-body],
  .vetro-modal-sheet-leave-to > [data-vetro-modal-body] {
    transform: translateY(100%);
  }
  /* @unocss-skip-end */
</style>
