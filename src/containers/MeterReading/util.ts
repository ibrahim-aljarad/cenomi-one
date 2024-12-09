import { localize } from "../../locale/utils";
import { getColorWithOpacity } from "../../utils/helper";

export type MeterReadingStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "REJECTED"
  | "APPROVED";

export const METER_STATUS_COLORS = {
  PENDING: {
    bg: "#FFF3C4",
    border: "#FFB300",
  },
  IN_PROGRESS: {
    bg: "#E3F2FD",
    border: "#2196F3",
  },
  COMPLETED: {
    bg: "#E8F5E9",
    border: "#4CAF50",
  },
  REJECTED: {
    bg: "#FFEBEE",
    border: "#F44336",
  },
  APPROVED: {
    bg: "#E8F5E9",
    border: "#4CAF50",
  }
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
