<script lang="ts" setup>
  import { computed, useSlots } from 'vue';

  import { useModalContext } from '@/features/feedback/components/Modal/Modal.context';

  interface Props {
    zIndex?: number;
  }

  const props = withDefaults(defineProps<Props>(), { zIndex: 100001 });

  defineOptions({ name: 'VetroModalLayoutFullscreen', inheritAttrs: false });

  const slots = useSlots();
  const { title, closable, showCloseButton, classes, requestClose } = useModalContext();

  const hasHeader = computed(() => Boolean(slots['header'] || title.value));
  const hasFooter = computed(() => Boolean(slots['footer']));
  const showClose = computed(() => closable.value && showCloseButton.value);

  /* @unocss-skip-start */
  const wrapperStyles = computed(() => ({ zIndex: props.zIndex }));
  /* @unocss-skip-end */
</script>

<template>
  <Transition
    name="vetro-modal-fullscreen"
    appear
  >
    <div
      data-vetro-modal-root
      role="dialog"
      aria-modal="true"
      :class="[
        ':uno: font-head border-border bg-background fixed inset-0 flex flex-col border-2',
        classes.wrapper,
      ]"
      :style="wrapperStyles"
    >
      <div
        v-if="hasHeader"
        data-vetro-modal-header
        :class="[
          ':uno: border-border flex shrink-0 items-start justify-between border-b-2 px-6 pt-5 pb-4',
          classes.header,
        ]"
      >
        <div class=":uno: flex-1">
          <slot name="header">
            <h3 class=":uno: text-foreground m-0 text-xl font-semibold">
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
          ':uno: border-border bg-background absolute top-5 right-5 cursor-pointer border-2 px-2 py-1 text-lg leading-none',
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
        :class="[':uno: border-border shrink-0 border-t-2 px-6 pt-4 pb-5', classes.footer]"
      >
        <slot name="footer" />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
  /* @unocss-skip-start */
  .vetro-modal-fullscreen-enter-active,
  .vetro-modal-fullscreen-leave-active {
    transition:
      opacity 0.3s ease,
      transform 0.3s ease;
  }
  .vetro-modal-fullscreen-enter-from,
  .vetro-modal-fullscreen-leave-to {
    opacity: 0;
    transform: translateY(2%);
  }
  /* @unocss-skip-end */
</style>
