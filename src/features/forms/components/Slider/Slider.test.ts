import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vite-plus/test';

import { Slider } from '@/features/forms';

describe('Slider', () => {
  it('renders a range input', () => {
    const wrapper = mount(Slider, { props: { modelValue: 20, min: 0, max: 100 } });
    const input = wrapper.find('input');
    expect(input.attributes('type')).toBe('range');
    expect(input.attributes('max')).toBe('100');
  });

  it('exposes the fill percentage as a CSS variable', () => {
    const wrapper = mount(Slider, { props: { modelValue: 25, min: 0, max: 100 } });
    expect(wrapper.attributes('style')).toContain('--vetro-slider-fill: 25%');
  });

  it('emits a numeric value on input', async () => {
    const onUpdate = vi.fn<(value: number) => void>();
    const wrapper = mount(Slider, { props: { modelValue: 0, 'onUpdate:modelValue': onUpdate } });
    await wrapper.find('input').setValue('40');
    expect(onUpdate).toHaveBeenCalledWith(40);
  });
});
