import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vite-plus/test';

import { Loader } from '@/features/data-display';

describe('Loader', () => {
  it('renders the requested number of dots', () => {
    const wrapper = mount(Loader, { props: { count: 4 } });
    expect(wrapper.findAll('.animate-bounce')).toHaveLength(4);
  });

  it('exposes a status role for assistive tech', () => {
    const wrapper = mount(Loader);
    expect(wrapper.attributes('role')).toBe('status');
    expect(wrapper.attributes('aria-label')).toBe('Loading...');
  });

  it('staggers the animation delay per dot', () => {
    const wrapper = mount(Loader, { props: { count: 3, delayStep: 100 } });
    const dots = wrapper.findAll('.animate-bounce');
    expect(dots[2]!.attributes('style')).toContain('animation-delay: 200ms');
  });
});
