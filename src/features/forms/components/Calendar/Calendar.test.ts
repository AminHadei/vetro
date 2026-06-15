import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vite-plus/test';

import { Calendar } from '@/features/forms';

describe('Calendar', () => {
  it('renders the month of the bound value with weekday headers', () => {
    const wrapper = mount(Calendar, {
      props: { modelValue: new Date(2024, 0, 15) },
    });

    expect(wrapper.find('[data-slot="calendar-label"]').text()).toContain('January');
    expect(wrapper.find('[data-slot="calendar-label"]').text()).toContain('2024');
    expect(wrapper.findAll('th')).toHaveLength(7);
  });

  it('marks the bound date as selected', () => {
    const wrapper = mount(Calendar, {
      props: { modelValue: new Date(2024, 0, 15) },
    });

    const selected = wrapper.findAll('[data-slot="calendar-day"][data-selected]');
    expect(selected).toHaveLength(1);
    expect(selected[0]!.text()).toBe('15');
  });

  it('emits a new date when a day is clicked', async () => {
    const onUpdate = vi.fn<(value: Date | undefined) => void>();
    const wrapper = mount(Calendar, {
      props: {
        modelValue: new Date(2024, 0, 15),
        'onUpdate:modelValue': onUpdate,
      },
    });

    const days = wrapper.findAll('[data-slot="calendar-day"]');
    const target = days.find((day) => day.text() === '20');
    await target?.trigger('click');

    expect(onUpdate).toHaveBeenCalledTimes(1);
    expect(onUpdate.mock.calls[0]![0]!.getDate()).toBe(20);
  });

  it('navigates to the previous and next month', async () => {
    const wrapper = mount(Calendar, {
      props: { modelValue: new Date(2024, 5, 1) },
    });

    await wrapper.find('[aria-label="Previous month"]').trigger('click');
    expect(wrapper.find('[data-slot="calendar-label"]').text()).toContain('May');

    await wrapper.find('[aria-label="Next month"]').trigger('click');
    await wrapper.find('[aria-label="Next month"]').trigger('click');
    expect(wrapper.find('[data-slot="calendar-label"]').text()).toContain('July');
  });
});
