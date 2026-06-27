import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { fn } from 'storybook/test';
import { ref } from 'vue';

import { Button } from '@/features/buttons';
import {
  Modal,
  ModalLayoutDefault,
  ModalLayoutFullscreen,
  createTypedModal,
  useModalContext,
} from '@/features/feedback';
import { defineComponent } from 'vue';

const meta = {
  title: 'Feedback/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: 'radio',
      options: ['default', 'fullscreen'],
    },
    visible: { control: 'boolean' },
    title: { control: 'text' },
    closable: { control: 'boolean' },
    showCloseButton: { control: 'boolean' },
    closeOnEscape: { control: 'boolean' },
    closeOnClickOutside: { control: 'boolean' },
    modalOnly: { control: 'boolean' },
    lockScroll: { control: 'boolean' },
  },
  args: {
    visible: false,
    layout: 'default',
    closable: true,
    showCloseButton: true,
    closeOnEscape: true,
    closeOnClickOutside: true,
    modalOnly: true,
    lockScroll: true,
    'onUpdate:visible': fn(),
    onOpen: fn(),
    onClose: fn(),
    'onTried-close': fn(),
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithTitle: Story = {
  render: (args) => ({
    components: { Modal, Button },
    setup: (): object => {
      const open = ref(args.visible ?? false);
      return { args, open };
    },
    template: `
      <div>
        <Button @click="open = true">Open modal</Button>
        <Modal v-bind="args" v-model:visible="open" title="Account settings">
          <p>Update your profile details here.</p>
        </Modal>
      </div>
    `,
  }),
};

export const Fullscreen: Story = {
  args: { layout: 'fullscreen', title: 'Fullscreen modal' },
  render: (args) => ({
    components: { Modal, Button },
    setup: (): object => {
      const open = ref(false);
      return { args, open };
    },
    template: `
      <div>
        <Button @click="open = true">Open fullscreen</Button>
        <Modal v-bind="args" v-model:visible="open">
          <p>Fullscreen layout content.</p>
        </Modal>
      </div>
    `,
  }),
};

const ConfirmLayout = defineComponent({
  name: 'ConfirmLayout',
  props: {
    confirmLabel: { type: String, default: 'Confirm' },
  },
  emits: { confirm: null },
  setup(props, { emit }) {
    const ctx = useModalContext();
    return { props, emit, ctx };
  },
  template: `
    <div class="space-y-4">
      <p>Are you sure you want to continue?</p>
      <div class="flex gap-2">
        <Button @click="emit('confirm')">{{ props.confirmLabel }}</Button>
        <Button variant="outline" @click="ctx.requestClose()">Cancel</Button>
      </div>
    </div>
  `,
});

const ConfirmModal = createTypedModal(ConfirmLayout);

export const TypedModal: Story = {
  render: () => ({
    components: { ConfirmModal, Button },
    setup: (): object => {
      const open = ref(false);
      return { open };
    },
    template: `
      <div>
        <Button @click="open = true">Open confirm</Button>
        <ConfirmModal v-model:visible="open" title="Delete item?" confirm-label="Delete" />
      </div>
    `,
  }),
};

export { ModalLayoutDefault, ModalLayoutFullscreen };
