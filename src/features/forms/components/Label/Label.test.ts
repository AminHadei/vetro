import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vite-plus/test';

import { Label } from '@/features/forms';

describe('Label', () => {
  it('renders a label with slot content', () => {
    const wrapper = mount(Label, { slots: { default: 'Email' } });
    expect(wrapper.element.tagName).toBe('LABEL');
    expect(wrapper.text()).toBe('Email');
  });

  it('forwards the for attribute', () => {
    const wrapper = mount(Label, { props: { for: 'email' } });
    expect(wrapper.attributes('for')).toBe('email');
  });
});
