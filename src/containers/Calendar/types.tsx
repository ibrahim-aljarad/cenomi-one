export interface DateProps {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
}

export interface CalendarProps {
  maximumDate: string;
  minimumDate: string;
  hideDayNames: boolean;
  monthFormat: string;
  firstDay: number;
  onPressedDate: () => void;
  eventDateList: {};
  onPressDate: (date: DateProps) => void;
  onMonthChange: (date: DateProps) => void;
  isDarkMode: boolean;
}

export interface MonthTypes {
  monthText: string;
  monthNumber: number;
  year: number;
}
