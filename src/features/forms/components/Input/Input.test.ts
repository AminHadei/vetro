import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vite-plus/test';

import { Input } from '@/features/forms';

describe('Input', () => {
  it('renders an input element', () => {
    const wrapper = mount(Input);
    expect(wrapper.element.tagName).toBe('INPUT');
  });

  it('emits update:modelValue on input', async () => {
    const onUpdate = vi.fn<(value: string | number | undefined) => void>();
    const wrapper = mount(Input, { props: { modelValue: '', 'onUpdate:modelValue': onUpdate } });
    await wrapper.find('input').setValue('hello');
    expect(onUpdate).toHaveBeenCalledWith('hello');
  });

  it('marks the field invalid', () => {
    const wrapper = mount(Input, { props: { invalid: true } });
    expect(wrapper.attributes('aria-invalid')).toBe('true');
    expect(wrapper.classes()).toContain('border-destructive');
  });
});
