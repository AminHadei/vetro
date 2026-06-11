import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vite-plus/test';

import { Badge } from '@/features/data-display';

describe('Badge', () => {
  it('renders a span with its label', () => {
    const wrapper = mount(Badge, { slots: { default: 'New' } });
    expect(wrapper.element.tagName).toBe('SPAN');
    expect(wrapper.text()).toBe('New');
  });

  it('applies variant and size classes', () => {
    const wrapper = mount(Badge, { props: { variant: 'solid', size: 'lg' } });
    expect(wrapper.classes()).toContain('bg-foreground');
    expect(wrapper.classes()).toContain('text-base');
  });
});
