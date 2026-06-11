import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vite-plus/test';

import { Text } from '@/features/data-display';

describe('Text', () => {
  it('renders a paragraph by default', () => {
    const wrapper = mount(Text, { slots: { default: 'Body' } });
    expect(wrapper.element.tagName).toBe('P');
    expect(wrapper.text()).toBe('Body');
  });

  it('renders the requested tag with its scale', () => {
    const wrapper = mount(Text, { props: { as: 'h1' }, slots: { default: 'Title' } });
    expect(wrapper.element.tagName).toBe('H1');
    expect(wrapper.classes()).toContain('text-4xl');
  });
});
