export interface FloorCodeMapping {
  [key: string]: {
    label: string;
    value: string;
  };
}

export const FLOOR_CODE_MAPPING: FloorCodeMapping = {
  GFK: { label: "Ground Floor", value: "Ground Floor" },
  FFP: { label: "First Floor", value: "First Floor" },
  SFB: { label: "Second Floor", value: "Second Floor" },
  FC: { label: "Food Court", value: "Food Court" },
  OTH: { label: "Other", value: "others" },
};
