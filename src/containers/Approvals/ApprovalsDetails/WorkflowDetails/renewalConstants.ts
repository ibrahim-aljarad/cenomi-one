import { Colors } from "../../../../theme";
import { getDateFormat } from "../../../../utils/helper";
import { iterationType } from "./serializer";

const CPSA_LEASE_STATUS_COMPARE = "HoldOver";

const yesOrNo = (value) => (value ? "Yes" : "No");

export const generalRenewal = [
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
    label: "Customer Parent Code",
    key: "customerCodeBrandName",
  },
  {
    label: "Customer Name",
    key: "customerName",
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
  {
    label: "Tenant Information",
    key: "customerType",
  },
  {
    label: "No. of Leases",
    key: "noOfLeases",
  },
]

const getPropVsBudgetColor = ({ PropVsBudget }) => {
  if (parseFloat(PropVsBudget) < 0) return Colors.peach;
  if (parseFloat(PropVsBudget) > 0) return Colors.green;
  return "";
};

const getPropVsBudgetTextColor = ({ PropVsBudget }) => {
  if (parseFloat(PropVsBudget) < 0) return Colors.red;
  return "";
};

const getSaletypeTextColor = ({ SalesMonths, Salestype }) => {
  if (parseFloat(SalesMonths) <= 1 && parseFloat(SalesMonths) >= 0.5)
    return Colors.red;
  return "";
};
const getSaletypeBGColor = ({ Salestype }) => {
  if (Salestype === CPSA_LEASE_STATUS_COMPARE) return Colors.peach;
  return "";
};
const getCrOCRTextColor = ({ CurrentOCR, SubCat_Sales }) => {
  if (!SubCat_Sales || !CurrentOCR) return "";
  if (CurrentOCR > SubCat_Sales) return Colors.red;
  return "";
};
const getCrOCRBGColor = ({ CurrentOCR, SubCat_Sales }) => {
  if (!SubCat_Sales || !CurrentOCR) return "";
  if (CurrentOCR > SubCat_Sales) return Colors.peach;
  if (CurrentOCR < SubCat_Sales) return Colors.green;
  return "";
};
const getNewOCRTextColor = ({ NEWOCR, SubCat_Sales }) => {
  if (!SubCat_Sales || !NEWOCR) return "";
  if (NEWOCR > SubCat_Sales) return Colors.red;
  return "";
};
const getNewOCRBGColor = ({ NEWOCR, SubCat_Sales }) => {
  if (!SubCat_Sales || !NEWOCR) return "";
  if (NEWOCR > SubCat_Sales) return Colors.peach;
  if (NEWOCR < SubCat_Sales) return Colors.green;
  return "";
};

export const contractGridDetails: iterationType[] = [
  {
    label: "Lease Number",
    key: "LeaseNumber",
  },
  {
    label: "Mall Name",
    key: "Mallname",
  },
  {
    label: "Mall Class",
    key: "mallclass",
  },
  {
    label: "Unit Class",
    key: "UnitClass",
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
    label: "Actual Expiry Date",
    key: "ActualExpiryDate",
  },
  {
    label: "Area",
    key: "AreaSQM",
    alignItems: 'flex-end',
  },
  {
    label: "Current BR (SAR/Sqm)",
    key: "CurrentBR",
    alignItems: 'flex-end',
  },
  {
    label: "Proposed BR From Tenant",
    key: "ProposalBR",
    colorMethod: () => Colors.yellow,
    alignItems: 'flex-end',
  },
  {
    label: `Budget FY'${
      new Date().getFullYear() % 2000
    } Base Rent If Not Available Price List (SAR/Sqm)`,
    key: "Budget_FY_BaseRent",
    colorMethod: () => Colors.peach,
    alignItems: 'flex-end',
  },
  {
    label: "Prop V/S Budget (%)",
    key: "PropVsBudget",
    colorMethod: getPropVsBudgetColor,
    textColorMethod: getPropVsBudgetTextColor,
    alignItems: 'flex-end',
  },
  {
    label: "Sales Type",
    key: "Salestype",
    colorMethod: getSaletypeBGColor,
    textColorMethod: getSaletypeTextColor,
  },
  {
    label: "Sales Value 12 Month (in 1,000)",
    key: "SalesValue12Month",
    alignItems: 'flex-end',
  },
  {
    label: "Sales Per Sqm",
    key: "SalesPerSQM",
    alignItems: 'flex-end',
  },
  {
    label: "Mall Sales Density",
    key: "SALESDENSITY",
    alignItems: 'flex-end',
  },
  {
    label: "Current OCR (%)",
    key: "CurrentOCR",
    colorMethod: getCrOCRBGColor,
    textColorMethod: getCrOCRTextColor,
    alignItems: 'flex-end',
  },
  {
    label: "New OCR (%)",
    key: "NEWOCR",
    colorMethod: getNewOCRBGColor,
    textColorMethod: getNewOCRTextColor,
    alignItems: 'flex-end',
  },
  {
    label: "Target OCR",
    key: "TargetOCR",
    alignItems: 'flex-end',
  },
  {
    label: "TOR (%)",
    key: "TOR",
    alignItems: 'flex-end',
  },
  {
    label: "Lease Status",
    key: "LeaseStatus",
    colorMethod: getSaletypeBGColor,
    textColorMethod: getSaletypeTextColor,
  },
  {
    label: "Current Due Amount",
    key: "OutStanding",
    alignItems: 'flex-end',
  },
  {
    label: "BR Rent Proposed",
    key: "BRRentProposed",
    colorMethod: () => Colors.yellow,
    alignItems: 'flex-end',
  },
  {
    label: "Budget Price BR",
    key: "BRBudgetPrice",
    colorMethod: () => Colors.grey,
    alignItems: 'flex-end',
  },
  {
    label: `FY'${new Date().getFullYear() % 2000} BR`,
    key: "FY23BR",
    colorMethod: () => Colors.grey,
    alignItems: 'flex-end',
  },
  {
    label: `Budget FY'${new Date().getFullYear() % 2000} BR`,
    key: "BudgetFY23BR",
    colorMethod: () => Colors.peach,
    alignItems: 'flex-end',
  },
  {
    label: "Renewal Duration",
    key: "RenewalDuration",
  },
];

export const renewalProposalDetailsData: iterationType[] = [
  {
    label: `FY'${new Date().getFullYear() % 2000} Total`,
    key: "FY2023Total",
    alignItems: 'flex-end',
  },
  {
    label: `Prposal BR FY'${new Date().getFullYear() % 2000} Total`,
    key: "prposalBRFY2023Total",
    alignItems: 'flex-end',
  },
  {
    label: `Budget BR FY'${new Date().getFullYear() % 2000} Total`,
    key: "budgetBRFY2023Total",
    alignItems: 'flex-end',
  },
];
