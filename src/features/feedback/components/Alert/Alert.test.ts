import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vite-plus/test';
import { h } from 'vue';

import { Alert, AlertDescription, AlertTitle } from '@/features/feedback';

describe('Alert', () => {
  it('renders with an alert role and composed parts', () => {
    const wrapper = mount(Alert, {
      slots: {
        default: () => [h(AlertTitle, () => 'Title'), h(AlertDescription, () => 'Body')],
      },
    });

    expect(wrapper.attributes('role')).toBe('alert');
    expect(wrapper.find('[data-slot="alert-title"]').text()).toBe('Title');
    expect(wrapper.find('[data-slot="alert-description"]').text()).toBe('Body');
  });

  it('applies status styling over the variant', () => {
    const wrapper = mount(Alert, { props: { status: 'error' } });
    expect(wrapper.classes()).toContain('bg-red-300');
    expect(wrapper.classes()).toContain('border-red-800');
  });
});
