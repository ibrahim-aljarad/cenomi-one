import { localize } from "../../locale/utils";
import { getColorWithOpacity } from "../../utils/helper";

type OperationStatus =
  | "YET_TO_START"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "REJECTED"
  | "FINISHED"
  | "APPROVED";

interface Operation {
  assigned_role: string;
  created_at: string;
  service_request_operation_id: number;
  status: OperationStatus;
  updated_at: string;
  workflow_level: number;
  updated_by?: string;
}

export const STATUS_COLORS = {
  IN_PROCESS: {
    bg: "#FFF3C4",
    border: "#FFB300",
  },
  IN_PROGRESS: {
    bg: "#FFF3C4",
    border: "#FFB300",
  },
  NEW: {
    bg: "#2196F3",
    border: "#2196F3",
  },
  APPROVED: {
    bg: "#4CAF50",
    border: "#4CAF50",
  },
  REJECTED: {
    bg: "#F44336",
    border: "#F44336",
  },
  YET_TO_START: {
    bg: "#757575",
    border: "#757575",
  },
  ACTION_REQUIRED: {
    bg: "#FFC107",
    border: "#FFC107",
  },
};

export const APPROVER_STATUS_COLORS = {
  REJECTED: {
    bg: "#FFEBEE",
    border: "#F44336",
  },
  YET_TO_START: {
    bg: "#EEEEEE",
    border: "#757575",
  },
  IN_PROGRESS: {
    bg: "#FFF3C4",
    border: "#FFB300",
  },
  COMPLETED: {
    bg: "#E8F5E9",
    border: "#4CAF50",
  },
  APPROVED: {
    bg: "#E8F5E9",
    border: "#4CAF50",
  },
  FINISHED: {
    bg: "#E8F5E9",
    border: "#4CAF50",
  },
};

export const getStatusStyle = (status: string) => {
  const statusConfig = STATUS_COLORS[status] || STATUS_COLORS.IN_PROCESS;
  return {
    borderColor: statusConfig.border,
    backgroundColor: getColorWithOpacity(statusConfig.bg, 0.1),
  };
};

export const getApproverStatusStyle = (status: OperationStatus) => {
  const statusConfig =
    APPROVER_STATUS_COLORS[status] || APPROVER_STATUS_COLORS.YET_TO_START;
  return {
    borderColor: statusConfig.border,
    backgroundColor: statusConfig.bg,
  };
};

export const formatStatus = (status: string) => {
  return (
    localize(`discrepancy.status.${status.toLowerCase()}`) ||
    formatStringToTitleCase(status)
  );
};

export const formatRole = (role: string) => {
  return (
    localize(`discrepancy.roles.${role.toLowerCase()}`) ||
    formatStringToTitleCase(role)
  );
};

const formatStringToTitleCase = (str: string) => {
  return str
    ?.toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const getApproverInitials = (role: string) => {
  const [firstSec, secSec] = role?.split("_") as string[];
  return firstSec && secSec
    ? firstSec[0] + secSec[0]
    : !secSec
    ? firstSec[0]
    : "";
};

const COMPLETED_STATUSES = ["COMPLETED", "APPROVED", "FINISHED"];

export const getSortedOperations = (operations: Operation[]): Operation[] => {
  if (!operations || !Array.isArray(operations)) {
    return [];
  }
  const sortedOps = [...operations].sort((a, b) => b.workflow_level - a.workflow_level);
  const operationsByLevel = sortedOps.reduce((acc, operation) => {
    const level = operation.workflow_level;
    if (!acc[level]) {
      acc[level] = [];
    }
    acc[level].push(operation);
    return acc;
  }, {} as Record<number, Operation[]>);
  const filteredOperations: Operation[] = [];

  Object.values(operationsByLevel).forEach(levelOperations => {
    const approvedOperation = levelOperations.find(op =>
      COMPLETED_STATUSES.includes(op.status)
    );

    if (approvedOperation) {
      filteredOperations.push(approvedOperation);
    } else {
      filteredOperations.push(...levelOperations);
    }
  });
  return filteredOperations
};
