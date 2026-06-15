<script setup lang="ts">
  import { computed, ref } from 'vue';

  import { IconButton } from '@/features/buttons';

  defineOptions({
    name: 'VetroCalendar',
  });

  const { showOutsideDays = true, weekStartsOn = 0 } = defineProps<{
    showOutsideDays?: boolean;
    weekStartsOn?: 0 | 1;
  }>();

  const model = defineModel<Date | undefined>({ default: undefined });

  const today = new Date();
  const viewDate = ref(new Date(model.value ?? today));

  const monthLabel = computed(() =>
    viewDate.value.toLocaleString('default', { month: 'long', year: 'numeric' }),
  );

  const weekdayLabels = computed(() =>
    weekStartsOn === 1
      ? ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
      : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  );

  interface DayCell {
    date: Date;
    outside: boolean;
  }

  const weeks = computed<DayCell[][]>(() => {
    const year = viewDate.value.getFullYear();
    const month = viewDate.value.getMonth();
    const offset = (new Date(year, month, 1).getDay() - weekStartsOn + 7) % 7;
    const cursor = new Date(year, month, 1 - offset);

    const result: DayCell[][] = [];
    for (let week = 0; week < 6; week += 1) {
      const row: DayCell[] = [];
      for (let day = 0; day < 7; day += 1) {
        row.push({ date: new Date(cursor), outside: cursor.getMonth() !== month });
        cursor.setDate(cursor.getDate() + 1);
      }
      result.push(row);
    }
    return result;
  });

  const isSameDay = (a: Date, b: Date): boolean =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const isSelected = (date: Date): boolean =>
    model.value !== undefined && isSameDay(date, model.value);

  const isToday = (date: Date): boolean => isSameDay(date, today);

  const prevMonth = (): void => {
    viewDate.value = new Date(viewDate.value.getFullYear(), viewDate.value.getMonth() - 1, 1);
  };

  const nextMonth = (): void => {
    viewDate.value = new Date(viewDate.value.getFullYear(), viewDate.value.getMonth() + 1, 1);
  };

  const select = (cell: DayCell): void => {
    if (!cell.outside || showOutsideDays) {
      model.value = cell.date;
    }
  };
</script>

<template>
  <div
    data-slot="calendar"
    class=":uno: border-border bg-background text-foreground inline-block border-2 p-3 shadow-md"
  >
    <div class=":uno: mb-2 flex items-center justify-between">
      <IconButton
        variant="outline"
        size="sm"
        aria-label="Previous month"
        @click="prevMonth"
      >
        <span class=":uno: i-chevron-right size-4 rotate-180" />
      </IconButton>
      <span
        data-slot="calendar-label"
        class=":uno: font-head text-sm font-medium"
      >
        {{ monthLabel }}
      </span>
      <IconButton
        variant="outline"
        size="sm"
        aria-label="Next month"
        @click="nextMonth"
      >
        <span class=":uno: i-chevron-right size-4" />
      </IconButton>
    </div>

    <table class=":uno: w-full border-collapse">
      <thead>
        <tr>
          <th
            v-for="label in weekdayLabels"
            :key="label"
            class=":uno: text-muted-foreground size-9 text-xs font-normal"
          >
            {{ label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(week, weekIndex) in weeks"
          :key="weekIndex"
        >
          <td
            v-for="cell in week"
            :key="cell.date.toISOString()"
            class=":uno: p-0 text-center"
          >
            <button
              v-if="showOutsideDays || !cell.outside"
              type="button"
              data-slot="calendar-day"
              :data-selected="isSelected(cell.date) ? '' : undefined"
              :data-today="isToday(cell.date) ? '' : undefined"
              :aria-pressed="isSelected(cell.date)"
              class=":uno: hover:bg-accent hover:text-accent-foreground focus-visible:outline-primary size-9 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
              :class="[
                cell.outside ? ':uno: text-muted-foreground opacity-60' : '',
                isToday(cell.date) && !isSelected(cell.date)
                  ? ':uno: bg-accent text-accent-foreground'
                  : '',
                isSelected(cell.date)
                  ? ':uno: bg-primary text-primary-foreground outline-border font-semibold shadow-md outline-2'
                  : '',
              ]"
              @click="select(cell)"
            >
              {{ cell.date.getDate() }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
