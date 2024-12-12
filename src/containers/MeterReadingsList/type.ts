export type MeterReadingItemsType = {
    srNumber: number;
    title: string;
    mall: string;
    status: string;
    date: string;
  }


  export type ListItemProps = {
    isDarkMode: boolean;
    item: MeterReadingItemsType;
    onPressItem: (item: MeterReadingItemsType) => void;
  };
