import { getColorWithOpacity } from "../../utils/helper";

type ApproverRole = 'LEASING_ADMIN' | 'MALL_MANAGER' | 'OPERATIONS_MANAGER' | 'OPERATIONS_SUPPORT';

type OperationStatus = 'YET_TO_START' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED';

interface Operation {
  assigned_role: ApproverRole;
  created_at: string;
  service_request_operation_id: number;
  status: OperationStatus;
  updated_at: string;
  workflow_level: number;
  updated_by?: string;
}

export const APPROVER_ORDER = [
    'OPERATIONS_SUPPORT',
    'OPERATIONS_MANAGER',
    'MALL_MANAGER',
    'LEASING_ADMIN',
  ];

export const STATUS_COLORS = {
    IN_PROCESS: {
      label: 'Pending',
      bg: '#FFC107',
      border: '#FFC107',
    },
    IN_PROGRESS: {
      label: 'Pending',
      bg: '#FFC107',
      border: '#FFC107',
    },
    NEW: {
      label: 'New',
      bg: '#2196F3',
      border: '#2196F3',
    },
    APPROVED: {
      label: 'Approved',
      bg: '#4CAF50',
      border: '#4CAF50',
    },
    REJECTED: {
      label: 'Rejected',
      bg: '#F44336',
      border: '#F44336',
    },
    YET_TO_START: {
      label: 'Yet to start',
      bg: '#757575',
      border: '#757575',
    },
    ACTION_REQUIRED: {
      label: 'Action required',
      bg: '#FFC107',
      border: '#FFC107',
    }
  };

  export const APPROVER_STATUS_COLORS = {
    REJECTED: {
      bg: '#FFEBEE',
      border: '#F44336'
    },
    YET_TO_START: {
      bg: '#EEEEEE',
      border: '#757575'
    },
    IN_PROGRESS: {
      bg: '#FFF8E1',
      border: '#FFC107'
    },
    COMPLETED: {
      bg: '#E8F5E9',
      border: '#4CAF50'
    },
    APPROVED: {
      bg: '#E8F5E9',
      border: '#4CAF50'
    },
    FINISHED: {
      bg: '#E8F5E9',
      border: '#4CAF50'
    }
  };

  export const getStatusStyle = (status: string) => {
    const statusConfig = STATUS_COLORS[status] || STATUS_COLORS.IN_PROCESS;
    return {
      borderColor: statusConfig.border,
      backgroundColor: getColorWithOpacity(statusConfig.bg, 0.1),
    };
  };

  export const getApproverStatusStyle = (status) => {
    const statusConfig = APPROVER_STATUS_COLORS[status] || APPROVER_STATUS_COLORS.YET_TO_START;
    return {
      borderColor: statusConfig.border,
      backgroundColor: statusConfig.bg,
    };
  };

  export const formatStatus = (status: string) => {
    return STATUS_COLORS[status]?.label || status?.toLowerCase()
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  export const formatRole = (role: string) => {
    return role?.toLowerCase()
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  export const getApproverInitials = (role: string) => {
    const [firstSec, secSec] = role?.split('_') as string[];
    return firstSec && secSec
      ? firstSec[0] + secSec[0]
      : !secSec
      ? firstSec[0]
      : '';
  };

  export const getSortedOperations = (operations: Operation[], itemStatus: string): Operation[] => {
    if (!operations || !Array.isArray(operations)) {
      return [];
    }
    const allowedRoles = itemStatus === 'APPROVED'
      ? [ 'OPERATIONS_SUPPORT','MALL_MANAGER','LEASING_ADMIN', ]
      : APPROVER_ORDER;

    const res = allowedRoles
    .map(role => operations.find(operation => operation.assigned_role === role))
    .filter((operation): operation is Operation => Boolean(operation));
   return res
  };
