import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vite-plus/test';
import { h } from 'vue';

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyIcon,
  EmptySeparator,
  EmptyTitle,
} from '@/features/data-display';

describe('Empty', () => {
  it('renders its composed parts', () => {
    const wrapper = mount(Empty, {
      slots: {
        default: () => [
          h(EmptyContent, () => [
            h(EmptyIcon),
            h(EmptyTitle, () => 'Nothing here'),
            h(EmptySeparator),
            h(EmptyDescription, () => 'Come back later'),
          ]),
        ],
      },
    });

    expect(wrapper.attributes('data-slot')).toBe('empty');
    expect(wrapper.find('[data-slot="empty-title"]').text()).toBe('Nothing here');
    expect(wrapper.find('[data-slot="empty-description"]').text()).toBe('Come back later');
    expect(wrapper.find('[data-slot="empty-separator"]').attributes('role')).toBe('separator');
  });

  it('falls back to a default icon', () => {
    const wrapper = mount(EmptyIcon);
    expect(wrapper.find('.i-ghost').exists()).toBe(true);
  });
});
