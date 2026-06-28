export interface CountdownProps {
  startDate: string | Date;
  showIcon?: boolean;
  iconClass?: string;
  textClass?: string;
  format?: 'short' | 'long';
}
