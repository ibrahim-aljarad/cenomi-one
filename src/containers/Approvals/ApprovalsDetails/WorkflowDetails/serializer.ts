import { Colors } from "../../../../theme";
import { getDateFormat } from "../../../../utils/helper";
import { mallDataFields } from "./newLeaseMallConstants";
import {
  contractGridDetails,
  generalRenewal,
  renewalProposalDetailsData,
} from "./renewalConstants";
import { terminationGridDetails } from "./terminationConstants";

const nullOrData = (value) => value || "N/A";
export type iterationType = {
  key: string;
  label: string;
  method?: any;
  colorMethod?: any;
  textColorMethod?: any;
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
  },
  {
    label: "Total Area",
    key: "TotalArea",
  },
  {
    label: "Base Rent",
    key: "BaseRent",
  },
  {
    label: "Total Due",
    key: "totalDue",
  },
  {
    label: "No.Of Locations",
    key: "leasecount",
  },
  {
    label: "Total Base Rent",
    key: "yearlyRent",
  },
  {
    label: "Total Area",
    key: "leaseArea",
  },
  {
    label: "Total Due Amount",
    key: "outstanding",
  },
  {
    label: "Due from 0-90 Days",
    key: "due0to90days",
  },
  {
    label: "60 days due",
    key: "due0to60days",
  },
  {
    label: "Total V/S 90 Days(%)",
    key: "totalVS90days",
  },
];

export const estimatedSalesField: iterationType[] = [
  {
    label: "Estimated Sales for 12 Months",
    key: "estimatedSalesFor12Months",
  },
  {
    label: "Estimated OCR",
    key: "estimatedOCR",
  },
  {
    label: "Sale/SQM",
    key: "sale_SQMData",
  },
];
export const taskDataFields: iterationType[] = [
  {
    label: "Comments",
    key: "comments",
  },
  {
    label: "Email",
    key: "assignee",
    method: (data) => (data?.id ? data?.id : data),
  },
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
    method: nullOrData,
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

export const salesDataColor = ({
  customerRequestLen,
  accPolicy,
  customerRequest,
}) =>
  customerRequestLen > 1 ||
  parseFloat(customerRequest) > parseFloat(accPolicy) > accPolicy
    ? Colors.red
    : Colors.green;

export const annualEscalationDataColor = ({ accPolicy, customerRequest }) =>
  customerRequest.includes(accPolicy) ? null : Colors.red;

const allGenaralDetailCards = {
  'Renewal Committee Approval': generalRenewal
}
export const getGenaralDetailsCard = (formType) => allGenaralDetailCards[formType];

export {
  generalRenewal,
  contractGridDetails,
  terminationGridDetails,
  mallDataFields,
  renewalProposalDetailsData,
};
