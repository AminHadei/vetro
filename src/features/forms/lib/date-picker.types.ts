interface SimpleDateParts {
  year: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

type DateSource = Date | string | number;
type DatePickerDate = DateSource | Partial<SimpleDateParts> | null;
type DatePickerRangeObject = {
  start: Exclude<DatePickerDate, null>;
  end: Exclude<DatePickerDate, null>;
};

export type DatePickerModel = DatePickerDate | DatePickerRangeObject;

export interface PopoverOptions {
  placement?: string;
  positionFixed?: boolean;
  visibility?: string;
  isInteractive?: boolean;
  autoHide?: boolean;
}
