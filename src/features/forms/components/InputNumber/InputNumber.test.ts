import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vite-plus/test';

import { InputNumber } from '@/features/forms';

describe('InputNumber', () => {
  it('renders label and binds value', () => {
    const wrapper = mount(InputNumber, {
      props: { modelValue: '42', label: 'Amount', required: true },
    });
    expect(wrapper.find('label').text()).toContain('Amount');
    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('42');
  });
});
