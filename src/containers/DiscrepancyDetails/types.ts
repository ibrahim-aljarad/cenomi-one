export interface FloorCodeMapping {
    [key: string]: {
      label: string;
      value: string;
    };
  }

  export const  FLOOR_CODE_MAPPING: FloorCodeMapping = {
    GFK: { label: "Ground Floor", value: "Ground Floor" },
  };
