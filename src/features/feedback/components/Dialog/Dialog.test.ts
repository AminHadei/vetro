import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vite-plus/test';
import { h, nextTick } from 'vue';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/features/feedback';

const mountDialog = (): ReturnType<typeof mount> =>
  mount(Dialog, {
    attachTo: document.body,
    slots: {
      default: () => [
        h(DialogTrigger, () => 'Open'),
        h(DialogContent, () => h(DialogHeader, () => h(DialogTitle, () => 'Title'))),
      ],
    },
  });

describe('Dialog', () => {
  it('is closed until the trigger is activated', async () => {
    const wrapper = mountDialog();
    expect(document.querySelector('[role="dialog"]')).toBeNull();

    await wrapper.find('[data-slot="dialog-trigger"]').trigger('click');
    await nextTick();

    expect(document.querySelector('[role="dialog"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="dialog-title"]')?.textContent).toBe('Title');
    wrapper.unmount();
  });

  it('closes when the header close button is pressed', async () => {
    const wrapper = mountDialog();
    await wrapper.find('[data-slot="dialog-trigger"]').trigger('click');
    await nextTick();

    const close = document.querySelector<HTMLButtonElement>('[data-slot="dialog-header"] button');
    close?.click();

    await vi.waitFor(() => {
      expect(document.querySelector('[role="dialog"]')).toBeNull();
    });
    wrapper.unmount();
  });
});
