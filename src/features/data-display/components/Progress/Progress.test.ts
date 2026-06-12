import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vite-plus/test';

import { Progress } from '@/features/data-display';

describe('Progress', () => {
  it('exposes accessible progressbar attributes', () => {
    const wrapper = mount(Progress, { props: { value: 40 } });
    expect(wrapper.attributes('role')).toBe('progressbar');
    expect(wrapper.attributes('aria-valuenow')).toBe('40');
    expect(wrapper.attributes('aria-valuemax')).toBe('100');
  });

  it('translates the indicator by the remaining percentage', () => {
    const wrapper = mount(Progress, { props: { value: 25 } });
    const indicator = wrapper.find('.bg-primary');
    expect(indicator.attributes('style')).toContain('translateX(-75%)');
  });

  it('clamps values outside the range', () => {
    const wrapper = mount(Progress, { props: { value: 150 } });
    const indicator = wrapper.find('.bg-primary');
    expect(indicator.attributes('style')).toContain('translateX(-0%)');
  });
});
