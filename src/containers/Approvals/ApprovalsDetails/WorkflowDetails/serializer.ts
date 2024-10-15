import { getDateFormat } from "../../../../utils/helper";

const yesOrNo = (value) => (value ? "Yes" : "No");
const nullOrData = (value) => value || "N/A";
type iterationType = {
  key: string;
  label: string;
  method?: any;
  colorMethod?: any;
};

const getLeaseCodeColor = ({ permatureORCanellation }) => {
  const colors = {
    Mature: "green",
    Premature: "orange",
    Cancellation: "red",
  };
  return colors[permatureORCanellation] || "";
};

const getLeaseStatusColor = ({ LeaseStatusID }) => {
  return LeaseStatusID && LeaseStatusID !== 1 ? "red" : "";
};

const ejarColor = ({ EjarStatus, LeaseNumber }, key, isLastIndex) => {
  if (isLastIndex) {
    return "";
  }
  if (EjarStatus) {
    return "green";
  }
  if (LeaseNumber !== "Overall") {
    return "red";
  }
  return "";
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

export const renewalProposalDetailsData: iterationType[] = [
  {
    label: "No.Of Leases",
    key: "FY2023Total",
  },
  {
    label: "Prposal BR FY-2023 Total",
    key: "prposalBRFY2023Total",
  },
  {
    label: "Budget BR FY-2023 Total",
    key: "budgetBRFY2023Total",
  },
];

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

export const contractGridDetails: iterationType[] = [
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
    label: "Units",
    key: "Units",
  },
  {
    label: "Actual Expiry Date",
    key: "ActualExpiryDate",
  },
  {
    label: "Area(SQM)",
    key: "AreaSQM",
  },
  {
    label: "Current BR",
    key: "CurrentBR",
  },
  {
    label: "Proposal BR",
    key: "ProposalBR",
  },
  {
    label: "Sales Per SQM",
    key: "SalesPerSQM",
  },
  {
    label: "New OCR",
    key: "NEWOCR",
  },
  {
    label: "Current OCR",
    key: "CurrentOCR",
  },
  {
    label: "Target OCR",
    key: "TargetOCR",
  },
  {
    label: "TOR",
    key: "TOR",
  },
  {
    label: "Lease Status",
    key: "LeaseStatus",
  },
  {
    label: "Sales Value 12 Month",
    key: "SalesValue12Month",
  },
  {
    label: "Sales Type",
    key: "Salestype",
  },
  {
    label: "Budget FY Base Rent",
    key: "Budget_FY_BaseRent",
  },
  {
    label: "Renewal Duration",
    key: "RenewalDuration",
  },
  {
    label: "Outstanding",
    key: "OutStanding",
  },
  {
    label: "BR Rent Proposed",
    key: "BRRentProposed",
  },
  {
    label: "BR Budget Price",
    key: "BRBudgetPrice",
  },
  {
    label: "FY-23 BR",
    key: "FY23BR",
  },
  {
    label: "Budget FY-23 BR",
    key: "BudgetFY23BR",
  },
  {
    label: "Prop vs Budget",
    key: "PropVsBudget",
  },
  {
    label: "Sales Month",
    key: "salesMonth",
  },
  {
    label: "Sub Lease Type",
    key: "subleaseType",
  },
  {
    label: "Price List",
    key: "priceList",
  },
];

const nullYellow = (item, key) => {
  if (item?.mall_Name !== "Total" && !item?.[key]) return "yellow";
  return "";
};

const getMallTypeColor = ({ mall_Type, proposedBrandName }) => {
  if (mall_Type && !proposedBrandName) return "yellow";
  return "";
};

const getMallUnitColor = ({ mall_Name, unit, newBaseRent }) => {
  if (mall_Name !== "Total" && (!unit || !newBaseRent)) return "yellow";
  return "";
};

const getMallAreaColor = ({ mall_Name, area_Sqm, newBaseRent }) => {
  if (mall_Name !== "Total" && (!area_Sqm || !newBaseRent)) return "yellow";
  return "";
};

const getBaseRentColor = ({ mall_Name, newBaseRent }) => {
  if (!newBaseRent || !parseInt(newBaseRent)) return "yellow";
  return "";
};

const getBudgetBaseRentColor = ({ mall_Name, budgetBaseRent }) => {
  if (!budgetBaseRent || !parseInt(budgetBaseRent)) return "yellow";
  return "";
};

const getPriceListColor = ({ mall_Name, newBaseRent, priceList }) => {
  if (!newBaseRent) return "yellow";
  const parsePrice = parseFloat(priceList);
  if(parsePrice < 0) return 'red';
  if(parsePrice > 0) return 'green';

  return "";
};

const getFreeperiodColor = ({ mall_Name, newBaseRent,priceList, freePeriodMonths }) => {
  if (!newBaseRent) return "yellow";
  if (!priceList) return "yellow";
  const parseData = parseFloat(freePeriodMonths);
  if(parseData < 0) return 'red';
  if(parseData > 0) return 'grey';

  return "";
};

const getFreePeriodAmntColor = ({ freePeriodAmount, newBaseRent }) => {
  if (!newBaseRent) return "yellow";
  return "";
};

const getNewBaserentValueSAR = (newBaserentValueSAR) => newBaserentValueSAR ? (newBaserentValueSAR): '0';

export const mallDataFields: iterationType[] = [
  {
    label: "Mall Name",
    key: "mall_Name",
    colorMethod: nullYellow,
  },
  {
    label: "Mall Type",
    key: "mall_Type",
    colorMethod: getMallTypeColor,
  },
  {
    label: "Proposed Brand Name",
    key: "proposedBrandName",
    colorMethod: nullYellow,
  },
  {
    label: "Activity",
    key: "activity",
    colorMethod: nullYellow,
  },
  {
    label: "Unit#",
    key: "unit",
    colorMethod: getMallUnitColor,
  },
  {
    label: "Unit Class",
    key: "unitClass",
  },
  {
    label: "Area(Sqm)",
    key: "area_Sqm",
    colorMethod: getMallAreaColor,
  },
  {
    label: "New Base Rent (SAR/Sqm)",
    key: "newBaseRent",
    colorMethod: getBaseRentColor,
  },
  {
    label: `Budget FY'${new Date().getFullYear()%2000} Base Rent If Not Available Price List (SAR/sqm)`,
    key: "budgetBaseRent",
    colorMethod: getBudgetBaseRentColor,
  },
  {
    label: `New Proposed Rent VS Budget FY'${new Date().getFullYear()%2000} Or Price List (%)`,
    key: "priceList",
    colorMethod: getPriceListColor,
  },
  {
    label: "Free Period Months",
    key: "freePeriodMonths",
    colorMethod: getFreeperiodColor,
  },
  {
    label: "Free Period Amount",
    key: "freePeriodAmount",
    colorMethod: getFreePeriodAmntColor,
  },
  {
    label: "New Base Rent Value (SAR)",
    key: "newBaserentValueSAR",
    method: getNewBaserentValueSAR
  },
  {
    label: "Budget Price (SAR) Or Price List Base Rent Value (SAR)",
    key: "budgetPriceSAR",
  },
  {
    label: "Target OCR (%)",
    key: "targetOCR",
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

export const invoiceFields: iterationType[] = [
  {
    label: "Invoice Id",
    key: "invoiceIdPk",
  },
  {
    label: "Lease Id",
    key: "leaseId",
  },
  {
    label: "Lease Name",
    key: "lease",
    method: ({ leaseNameEng }) => leaseNameEng,
  },
  {
    label: "Customer Id",
    key: "customerId",
  },
  {
    label: "Customer Name",
    key: "customer",
    method: ({ customerNameEng }) => customerNameEng,
  },
  {
    label: "Invoice Due Date",
    key: "invoiceDueDate",
    method: getDateFormat,
  },
  {
    label: "Invoice Date",
    key: "invoiceDate",
    method: getDateFormat,
  },
  {
    label: "Batch Number",
    key: "batchNumber",
  },
  {
    label: "Net Amount",
    key: "netAmount",
  },
  {
    label: "VAT amount",
    key: "vatAmount",
  },
  {
    label: "Total Amount",
    key: "totalAmount",
  },
  {
    label: "Total Due Amount",
    key: "totalDueAmount",
  },
  {
    label: "Unit",
    key: "unit",
  },
  {
    label: "Property ID",
    key: "propertyId",
  },
  {
    label: "Invoice Status",
    key: "invoiveStatus",
  },
  {
    label: "Invoice Type",
    key: "invoiceType",
  },
  {
    label: "Created By",
    key: "createdBy",
  },
  {
    label: "Modified by",
    key: "modifiedBy",
  },
  {
    label: "Modified On",
    key: "modifiedOn",
  },
  {
    label: "Active",
    key: "isActive",
    method: yesOrNo,
  },
  {
    label: "Invoice Status Reason ID",
    key: "invoiceStatusReasonId",
  },
  {
    label: "Paid Amount",
    key: "paidAmount",
  },
  {
    label: "Days to due date",
    key: "dateDifferenceBetweenTodayAndInvoiceDueDate",
  },
];

export const serenaFields: iterationType[] = [
  {
    label: "Vendor Code",
    key: "VendorCode",
  },
  {
    label: "Vendor ID",
    key: "idVendor",
  },
  {
    label: "Vendor Name",
    key: "VendorName",
  },
  {
    label: "Order Number",
    key: "OrderNumber",
  },
  {
    label: "Approval Type",
    key: "ApprovalType",
  },
  {
    label: "Serina Document Id",
    key: "SerinaDocumentId",
  },
  {
    label: "Serina Invoice Number",
    key: "SerinaInvoiceNumber",
  },
  {
    label: "Serina Invoice Date",
    key: "SerinaInvoiceDate",
  },
  {
    label: "UOM Code",
    key: "UOMCode",
  },
  {
    label: "Price",
    key: "Price",
  },
  {
    label: "Description",
    key: "Description",
  },
  {
    label: "Quantity",
    key: "Quantity",
  },
  {
    label: "Requester Name",
    key: "REQUESTER_NAME",
  },
  {
    label: "Departent DFF",
    key: "DEPARTMENT_DFF",
  },
  {
    label: "Buyer Email",
    key: "BUYER_EMAIL",
  },
  {
    label: "Requester Email",
    key: "REQUESTER_EMAIL",
  },
];

export const lineDataFields = [
  {
    label: "Line Number",
    key: "LineNumber",
  },
  {
    label: "Order Number",
    key: "OrderNumber",
  },
  {
    label: "UOM Code",
    key: "UOMCode",
  },
  {
    label: "Price",
    key: "Price",
  },
  {
    label: "Description",
    key: "Description",
  },
  {
    label: "Quantity",
    key: "Quantity",
  },
  {
    label: "Requester Name",
    key: "REQUESTER_NAME",
  },
  {
    label: "Departent DFF",
    key: "DEPARTMENT_DFF",
  },
  {
    label: "Buyer Email",
    key: "BUYER_EMAIL",
  },
  {
    label: "Requester Email",
    key: "REQUESTER_EMAIL",
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
    ? "red"
    : "green";

export const annualEscalationDataColor = ({ accPolicy, customerRequest }) =>
  customerRequest.includes(accPolicy) ? null : "red";

/*
color condition for notes colors on customer request cell

1. Sales(%)
-No color: CC policy= customerRequest
-Red Color: or(
customerRequest &lt; CC policy,
customerRequestLen &gt;1
)
-Else green color
2. Annual Escalation
-No color: or(CC policy= customerRequest,
CC Policy exists in customerRequest,
customerRequest = NO ESCALATIONS
)
-Else red color
3. Service Charge (%)
-No color: CC policy = customerRequest,
-Else red color
4. Free Months Period
-No color: CC policy= customerRequest,
-Else red color
5. Electricity
-No color: CC policy= customerRequest,
-Else red color
6. First Payment Required
-No color: CC policy= customerRequest,
-Else red color
7. Promissory Note Required
-No color:CC policy= customerRequest,

-Else red color
8. Billing Frequency
-No color: CC policy= customerRequest,
-Else red color

*/
