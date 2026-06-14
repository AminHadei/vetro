import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vite-plus/test';

import { Checkbox } from '@/features/forms';

describe('Checkbox', () => {
  it('emits update:modelValue when toggled', async () => {
    const onUpdate = vi.fn<(value: boolean) => void>();
    const wrapper = mount(Checkbox, {
      props: { modelValue: false, 'onUpdate:modelValue': onUpdate },
    });
    await wrapper.find('input').setValue(true);
    expect(onUpdate).toHaveBeenCalledWith(true);
  });

  it('shows the check indicator when checked', () => {
    const wrapper = mount(Checkbox, { props: { modelValue: true } });
    expect(wrapper.find('.i-check').isVisible()).toBe(true);
  });

  it('applies size classes', () => {
    const wrapper = mount(Checkbox, { props: { size: 'lg' } });
    expect(wrapper.find('span').classes()).toContain('size-6');
  });

  it('applies the checked variant classes', () => {
    const wrapper = mount(Checkbox, { props: { modelValue: true, variant: 'solid' } });
    expect(wrapper.find('span').classes()).toContain('bg-foreground');
  });
});
