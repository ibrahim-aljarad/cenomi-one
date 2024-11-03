import { Colors } from "../../../../theme";
import { getDateFormat } from "../../../../utils/helper";
import { generalNewLease, mallDataFields } from "./newLeaseMallConstants";
import {
  contractGridDetails,
  generalRenewal,
  renewalProposalDetailsData,
} from "./renewalConstants";
import {
  generalTermination,
  terminationGridDetails,
} from "./terminationConstants";

const nullOrData = (value) => value || "N/A";
const yesOrNo = (value) => (value ? "Yes" : "No");
export type iterationType = {
  key: string;
  label: string;
  method?: any;
  colorMethod?: any;
  textColorMethod?: any;
  alignItems?: string;
};

export const numericalFix = (value) => {
  if(value){
    return value?.split('.')?.[0]
  }
  return value;
};

export const generalDetailsTermination: iterationType[] = [
  {
    label: "Title",
    key: "formTitle",
  },
  {
    label: "Department",
    key: "department",
  },
  {
    label: "Initiated By",
    key: "initiatedByCust",
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
    label: "Lease Number",
    key: "leaseCode",
  },
  {
    label: "Lease Type",
    key: "leaseType",
  },
  {
    label: "Lease Type",
    key: "LeaseType",
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
    label: "Customer Group",
    key: "customerGroup",
  },
  {
    label: "Customer Code",
    key: "customerCodeBrandName",
  },
  {
    label: "Customer Name",
    key: "customerName",
  },
  {
    label: "Customer Type",
    key: "customerType",
  },
  {
    label: "Contract Type",
    key: "contractType",
  },
  {
    label: "Serial No",
    key: "seraialNumber",
  },
  {
    label: "Created By",
    key: "createdBy",
  },
  {
    label: "Invoice Ids",
    key: "involvedInvoicesId",
  },
  {
    label: "Requested By",
    key: "requetedBy",
    method: (data) => data?.[0]?.id,
  },
  {
    label: "Requested By",
    key: "Requestedby",
  },
  {
    label: "Requested By",
    key: "requestedByEmailName",
  },
  {
    label: "Proposed Brand",
    key: "proposedBrand",
  },
  {
    label: "Brand Name",
    key: "brandName",
  },
  {
    label: "First Payment Required",
    key: "firstPayment",
  },
  {
    label: "Promissory Note Required",
    key: "promissoryNote",
  },
  // {
  //   label: "5% Of Budget",
  //   key: "5% Of Budget",
  // },
  // {
  //   label: "10% Of Budget",
  //   key: "10% Of Budget",
  // },
  // {
  //   label: "JJ/JR mall",
  //   key: "JJ/JR mall",
  // },
];

export const terminationPortfolioData: iterationType[] = [
  {
    label: "No.Of Lease",
    key: "NoOfLease",
    alignItems: 'flex-end',
  },
  {
    label: "Total Area",
    key: "TotalArea",
    alignItems: 'flex-end',
  },
  {
    label: "Base Rent",
    key: "BaseRent",
    alignItems: 'flex-end',
  },
  {
    label: "Total Due",
    key: "totalDue",
    alignItems: 'flex-end',
  },
  {
    label: "No.Of Locations",
    key: "leasecount",
    alignItems: 'flex-end',
  },
  {
    label: "Total Base Rent",
    key: "yearlyRent",
    alignItems: 'flex-end',
  },
  {
    label: "Total Area",
    key: "leaseArea",
    alignItems: 'flex-end',
  },
  {
    label: "Total Due Amount",
    key: "outstanding",
    alignItems: 'flex-end',
  },
  {
    label: "Due from 0-90 Days",
    key: "due0to90days",
    alignItems: 'flex-end',
  },
  {
    label: "60 days due",
    key: "due0to60days",
    alignItems: 'flex-end',
  },
  {
    label: "Total V/S 90 Days(%)",
    key: "totalVS90days",
    alignItems: 'flex-end',
  },
];

export const estimatedSalesField: iterationType[] = [
  {
    label: "Estimated Sales for 12 Months",
    key: "estimatedSalesFor12Months",
    alignItems: 'flex-end',
  },
  {
    label: "Estimated OCR",
    key: "estimatedOCR",
    alignItems: 'flex-end',
  },
  {
    label: "Sale/SQM",
    key: "sale_SQMData",
    alignItems: 'flex-end',
  },
];

export const taskDataFields: iterationType[] = [
  {
    label: "Comments",
    key: "comments",
  },
  // {
  //   label: "Email",
  //   key: "assignee",
  //   method: (data) => (data?.id ? data?.id : data),
  // },
  {
    label: "Completed On",
    key: "completedOn",
    method: getDateFormat,
  },
  {
    label: "Completed By",
    key: "completedBy",
  },
  {
    label: "Designation",
    key: "designation",
  },
  {
    label: "Request More Info",
    key: "requestMoreInfo",
    method: yesOrNo,
  },
];

export const noteFields = [
  {
    label: "Items",
    key: "items",
  },
  {
    label: "CC Policy",
    key: "accPolicy",
  },
  {
    label: "Customer Request",
    key: "customerRequest",
  },
];

const salesDataColor = ({ customerRequestLen, accPolicy, customerRequest }) =>
  customerRequestLen > 1 ||
  parseFloat(customerRequest) > parseFloat(accPolicy) > accPolicy
    ? Colors.red
    : Colors.green;

const annualEscalationDataColor = ({ accPolicy, customerRequest }) =>
  customerRequest.includes(accPolicy) ? null : Colors.red;

const allGenaralDetailCards = {
  "Renewal Committee Approval": generalRenewal,
  "New Lease Committee Approval Form": generalNewLease,
  "Termination Committee Approval": generalTermination,
};

const getGenaralDetailsCard = (formType) => allGenaralDetailCards[formType];

//color value according to conditions specified in ./serializer.ts
const colorValue = ({
  items,
  accPolicy,
  customerRequest,
  customerRequestLen,
}) => {
  if (accPolicy === customerRequest) return null;
  const coloredItems = [
    "Service Charge (%)",
    "Electricity",
    "Free Months Period",
    "First Payment Required",
    "Promissory Note Required",
    "Billing Frequency",
  ];
  if (coloredItems.includes(items)) return "red";
  if (items === "Sales (%)") {
    return salesDataColor({
      customerRequestLen,
      accPolicy,
      customerRequest,
    });
  }
  if (items === "Annual Escalation") {
    return annualEscalationDataColor({
      accPolicy,
      customerRequest,
    });
  }
  return null;
};

export {
  contractGridDetails,
  terminationGridDetails,
  mallDataFields,
  renewalProposalDetailsData,
  colorValue,
  getGenaralDetailsCard,
};
