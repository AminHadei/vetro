import { type InjectionKey, type Ref, inject } from 'vue';

import type { ModalClasses } from '@/features/feedback/components/Modal/Modal.types';

export interface ModalContext {
  title: Ref<string | null>;
  closable: Ref<boolean>;
  showCloseButton: Ref<boolean>;
  isBottomSheet: Ref<boolean>;
  classes: Ref<ModalClasses>;
  requestClose: () => void;
}

export const modalContextKey: InjectionKey<ModalContext> = Symbol('VetroModalContext');

export const useModalContext = (): ModalContext => {
  const ctx = inject(modalContextKey);
  if (!ctx) {
    throw new Error('useModalContext must be used inside a <Modal> component.');
  }
  return ctx;
};
