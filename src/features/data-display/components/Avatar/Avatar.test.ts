import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vite-plus/test';
import { h } from 'vue';

import { Avatar, AvatarFallback, AvatarImage } from '@/features/data-display';

describe('Avatar', () => {
  it('shows the fallback until the image loads', () => {
    const wrapper = mount(Avatar, {
      slots: {
        default: () => [
          h(AvatarImage, { src: 'https://example.com/a.png' }),
          h(AvatarFallback, () => 'VT'),
        ],
      },
    });

    const fallback = wrapper.find('[data-slot="avatar-fallback"]');
    expect(fallback.isVisible()).toBe(true);
    expect(fallback.text()).toBe('VT');
  });

  it('reveals the image once it has loaded', async () => {
    const wrapper = mount(Avatar, {
      slots: {
        default: () => [
          h(AvatarImage, { src: 'https://example.com/a.png' }),
          h(AvatarFallback, () => 'VT'),
        ],
      },
    });

    await wrapper.find('[data-slot="avatar-image"]').trigger('load');

    expect(wrapper.find('[data-slot="avatar-image"]').isVisible()).toBe(true);
    expect(wrapper.find('[data-slot="avatar-fallback"]').isVisible()).toBe(false);
  });
});
