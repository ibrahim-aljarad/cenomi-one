import { getColorWithOpacity } from "../../utils/helper";

export type MeterReadingStatus =
  | "PENDING"
  | "DRAFT"
  | "SUBMITTED"

  export const METER_STATUS_COLORS = {
    PENDING: {
      bg: "#FFF3C4",
      border: "#FFB300",
    },
    DRAFT: {
      bg: "#F0F4FF",
      border: "#5D7BF2",
    },
    SUBMITTED: {
      bg: "#E8F5E9",
      border: "#4CAF50",
    },
  };

export const getMeterStatusStyle = (status: MeterReadingStatus) => {
  const statusConfig = METER_STATUS_COLORS[status] || METER_STATUS_COLORS.PENDING;
  return {
    borderColor: statusConfig.border,
    backgroundColor: getColorWithOpacity(statusConfig.bg, 0.1),
  };
};

export const formatMeterStatus = (status: MeterReadingStatus) => {
  return (
    formatStringToTitleCase(status)
  );
};

const formatStringToTitleCase = (str: string) => {
  return str
    ?.toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
