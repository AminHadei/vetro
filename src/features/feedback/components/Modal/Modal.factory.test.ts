import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vite-plus/test';
import { defineComponent, nextTick, ref } from 'vue';

import { useModalContext } from '@/features/feedback/components/Modal/Modal.context';
import { createTypedModal } from '@/features/feedback/components/Modal/Modal.factory';

const ConfirmLayout = defineComponent({
  name: 'ConfirmLayout',
  props: {
    tone: { type: String as () => 'danger' | 'info', default: 'info' },
    confirmLabel: { type: String, default: 'Confirm' },
  },
  emits: { confirm: null, cancel: null },
  setup(props, { emit }) {
    const ctx = useModalContext();
    return {
      props,
      emit,
      ctx,
    };
  },
  template: `
    <div data-typed-modal-layout :data-tone="props.tone">
      <span data-title>{{ ctx.title.value }}</span>
      <button data-confirm @click="emit('confirm')">{{ props.confirmLabel }}</button>
      <button data-cancel @click="emit('cancel')">Cancel</button>
    </div>
  `,
});

describe('createTypedModal', () => {
  let wrapper: ReturnType<typeof mount> | undefined;

  afterEach(() => {
    wrapper?.unmount();
    wrapper = undefined;
  });

  it('renders the wrapped layout when visible', async () => {
    const ConfirmModal = createTypedModal(ConfirmLayout);
    wrapper = mount(ConfirmModal, {
      props: { visible: true } as unknown as Record<string, unknown>,
      attachTo: document.body,
    });
    await nextTick();

    expect(document.querySelector('[data-typed-modal-layout]')).toBeTruthy();
  });

  it('forwards layout props and emits', async () => {
    const onConfirm = vi.fn<() => void>();
    const ConfirmModal = createTypedModal(ConfirmLayout);
    wrapper = mount(ConfirmModal, {
      props: {
        visible: true,
        tone: 'danger',
        confirmLabel: 'Delete',
        onConfirm,
      } as unknown as Record<string, unknown>,
      attachTo: document.body,
    });
    await nextTick();

    const layout = document.querySelector('[data-typed-modal-layout]') as HTMLElement | null;
    expect(layout?.dataset['tone']).toBe('danger');

    const confirmBtn = document.querySelector('[data-confirm]') as HTMLButtonElement | null;
    expect(confirmBtn?.textContent).toBe('Delete');
    confirmBtn?.click();
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('exposes open/close/toggle on the typed modal', async () => {
    const ConfirmModal = createTypedModal(ConfirmLayout);
    wrapper = mount(ConfirmModal, {
      props: { visible: false } as unknown as Record<string, unknown>,
      attachTo: document.body,
    });
    await nextTick();
    expect(document.querySelector('[data-typed-modal-layout]')).toBeFalsy();

    const vm = wrapper.vm as unknown as { open: () => void; close: () => void };
    vm.open();
    await nextTick();
    expect(document.querySelector('[data-typed-modal-layout]')).toBeTruthy();

    vm.close();
    await nextTick();
    expect(document.querySelector('[data-typed-modal-layout]')).toBeFalsy();
  });

  it('passes title from modal shell to layout context', async () => {
    const ConfirmModal = createTypedModal(ConfirmLayout);
    wrapper = mount(ConfirmModal, {
      props: { visible: true, title: 'Are you sure?' } as unknown as Record<string, unknown>,
      attachTo: document.body,
    });
    await nextTick();

    const titleEl = document.querySelector('[data-title]');
    expect(titleEl?.textContent).toBe('Are you sure?');
  });

  it('works with v-model:visible', async () => {
    const ConfirmModal = createTypedModal(ConfirmLayout);
    const visible = ref(false);
    wrapper = mount({
      components: { ConfirmModal },
      setup: () => ({ visible }),
      template: '<ConfirmModal v-model:visible="visible" />',
    });
    await nextTick();
    expect(document.querySelector('[data-typed-modal-layout]')).toBeFalsy();

    visible.value = true;
    await nextTick();
    expect(document.querySelector('[data-typed-modal-layout]')).toBeTruthy();
  });
});
