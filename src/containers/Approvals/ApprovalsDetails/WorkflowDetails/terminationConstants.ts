import { Colors } from "../../../../theme";
import { getDateFormat } from "../../../../utils/helper";
import { iterationType } from "./serializer";

const yesOrNo = (value) => (value ? "Yes" : "No");
export const generalTermination = [
  {
    label: "Title",
    key: "formTitle",
  },
  {
    label: "Department",
    key: "department",
    required: true,
  },
  {
    label: "Initiated By",
    key: "createdByName",
  },
  {
    label: "Initiated On",
    key: "createdOn",
    method: getDateFormat,
  },
  {
    label: "Customer/Lease",
    key: "formType",
  },
  {
    label: "Lease Code",
    key: "leaseCodeBrandName",
  },
  {
    label: "Customer Code",
    key: "customerCode",
  },
  {
    label: "Customer Name",
    key: "customerName",
  },
  {
    label: "Customer Group",
    key: "customerGroup",
  },
  {
    label: "Lease Type",
    key: "leaseType",
  },
  {
    label: "Requested By",
    key: "requestedByEmailName",
  },
  {
    label: "Created By",
    key: "createdBy",
  },
];

const getLeaseStatusColor = ({ LeaseStatusID }) => {
  return LeaseStatusID && LeaseStatusID !== 1 ? Colors.red : "";
};

const ejarColor = ({ EjarStatus, LeaseNumber }, key, isLastIndex) => {
  if (isLastIndex) {
    return "";
  }
  if (EjarStatus) {
    return Colors.green;
  }
  if (LeaseNumber !== "Overall") {
    return Colors.red;
  }
  return "";
};
const getLeaseCodeColor = ({ permatureORCanellation }) => {
  const colors = {
    Mature: Colors.green,
    Premature: Colors.orange,
    Cancellation: Colors.red,
  };
  return colors[permatureORCanellation] || "";
};

export const terminationGridDetails: iterationType[] = [
  {
    label: "Lease Number",
    key: "LeaseNumber",
    colorMethod: getLeaseCodeColor,
  },
  {
    label: "Mall Name",
    key: "Mallname",
  },
  {
    label: "Mall Type",
    key: "Malltype",
  },
  {
    label: "Customer Name",
    key: "CustomerName",
  },
  {
    label: "Brand Name",
    key: "Brandname",
  },
  {
    label: "Category",
    key: "Category",
  },
  {
    label: "Unit#",
    key: "Units",
  },
  {
    label: "Start Date",
    key: "StartDate",
  },
  {
    label: "Expiry Date",
    key: "Expirydate",
  },
  {
    label: "Actual Expiry Date",
    key: "actualExpiryDate",
  },
  {
    label: "Termination Date",
    key: "TermDate",
  },
  {
    label: "Area",
    key: "AreaSQM",
  },
  {
    label: "Customer Type",
    key: "CustomerType",
  },
  {
    label: "Lease Status",
    key: "LeaseStatus",
    colorMethod: getLeaseStatusColor,
  },
  {
    label: "Current Rent",
    key: "OrignalBR",
  },
  {
    label: "Estimated Financial Impact",
    key: "EstFinImpact",
  },
  {
    label: `Estimated Financial Impact "Penalty"`,
    key: "EstFinImpactPent",
  },
  {
    label: "Holdover Aging",
    key: "HoldoverAging",
  },
  {
    label: `OCR(%)"`,
    key: "ocrPect",
  },
  {
    label: `GLA Impact(%)`,
    key: "GLAImpact",
  },
  {
    label: "Reasons",
    key: "TermReason",
  },
  {
    label: "Case",
    key: "PolCase",
  },
  {
    label: "Ejar Status",
    key: "EjarDetail",
    colorMethod: ejarColor,
  },
  {
    label: "Due Amount",
    key: "OutstandingAmount",
  },
  {
    label: "DiscountAmt",
    key: "DiscountAmt",
  },
];
