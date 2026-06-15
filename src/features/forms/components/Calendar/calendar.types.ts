export type CalendarMode = 'single' | 'range';
export type CalendarCaptionLayout = 'label' | 'dropdown';
export type CalendarRange = { from: Date; to?: Date };
export type CalendarValue = Date | CalendarRange | undefined;
