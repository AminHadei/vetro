import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vite-plus/test';
import { nextTick } from 'vue';

import { Toaster, toast } from '@/features/feedback';

describe('Toaster', () => {
  it('renders the sonner region and shows a triggered toast', async () => {
    const wrapper = mount(Toaster, { attachTo: document.body });

    expect(wrapper.find('[data-slot="toaster"]').exists()).toBe(true);

    toast('Hello world');
    await nextTick();

    await vi.waitFor(() => {
      expect(document.body.textContent).toContain('Hello world');
    });

    wrapper.unmount();
  });
});
