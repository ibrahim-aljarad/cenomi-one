import { getDateFormat } from "../../../../utils/helper";

const yesOrNo = (value) => (value ? "Yes" : "No");
const nullOrData = (value) => value || "N/A";
type iterationType = {
  key: string;
  label: string;
  method?: any;
};
export const generalDetailsTermination: iterationType[] = [
  {
    label: "Department",
    key: "department",
  },
  {
    label: "Created By",
    key: "createdBy",
  },
  {
    label: "Created Date",
    key: "createdOn",
    method: getDateFormat,
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
    label: "Requested By Email",
    key: "requestedByEmail",
  },
  {
    label: "Initiated By",
    key: "initiatedByCust",
  },
  {
    label: "Customer Group",
    key: "customerGroup",
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
    label: "Customer Brand",
    key: "customerCodeBrandName",
  },
  {
    label: "Customer Type",
    key: "customerType",
  },
  {
    label: "Key Account",
    key: "keyAccount",
  },
  {
    label: "Serial No",
    key: "seraialNumber",
  },
  {
    label: "Lease Code",
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
    label: "Lease Count",
    key: "leaseCount",
  },
  {
    label: "No of Leases",
    key: "noOfLeases",
  },
  {
    label: "Lease Brand",
    key: "leaseCodeBrandName",
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
  {
    label: "5% Of Budget",
    key: "5% Of Budget",
  },
  {
    label: "10% Of Budget",
    key: "10% Of Budget",
  },
  {
    label: "JJ/JR mall",
    key: "JJ/JR mall",
  },
];

export const terminationPortfolioData: iterationType[] = [
  {
    label: "No.Of Leases",
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
    label: "90 days due",
    key: "due0to90days",
  },
  {
    label: "60 days due",
    key: "due0to60days",
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
  },
  {
    label: "Mall Name",
    key: "Mallname",
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
    label: "Units",
    key: "Units",
  },
  {
    label: "Area(SQM)",
    key: "AreaSQM",
  },
  {
    label: "Orignal BR",
    key: "OrignalBR",
  },
  {
    label: "EstFinImpact",
    key: "EstFinImpact",
  },
  {
    label: "EstFinImpactPent",
    key: "EstFinImpactPent",
  },
  {
    label: "EstFinImpactHold",
    key: "EstFinImpactHold",
  },
  {
    label: "OutstandingAmount",
    key: "OutstandingAmount",
  },
  {
    label: "DiscountAmt",
    key: "DiscountAmt",
  },
];

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

export const mallDataFields: iterationType[] = [
  {
    label: "Mall Name",
    key: "mall_Name",
  },
  {
    label: "Budget",
    key: "budget",
  },
  {
    label: "Budget Price List",
    key: "budgetPriceList",
  },
  {
    label: "Mall Type",
    key: "mall_Type",
  },
  {
    label: "Proposed Brand Name",
    key: "proposedBrandName",
  },
  {
    label: "Activity",
    key: "activity",
  },
  {
    label: "Unit",
    key: "unit",
  },
  {
    label: "Unit Class",
    key: "unitClass",
  },
  {
    label: "Area(SQM)",
    key: "area_Sqm",
  },
  {
    label: "New Base Rent",
    key: "newBaseRent",
  },
  {
    label: "Budget Base Rent",
    key: "budgetBaseRent",
  },
  {
    label: "Price List",
    key: "priceList",
  },
  {
    label: "Free Period Months",
    key: "freePeriodMonths",
  },
  {
    label: "Free Period Amount",
    key: "freePeriodAmount",
  },
  {
    label: "New Base Rent Value(SAR)",
    key: "newBaserentValueSAR",
  },
  {
    label: "Budget Price(SAR)",
    key: "budgetPriceSAR",
  },
  {
    label: "Estimated Sales",
    key: "estimatedSales",
  },
  {
    label: "Sales/SQM",
    key: "sales_SQM",
  },
  {
    label: "Estimated OCR",
    key: "estimatedOCR",
  },
  {
    label: "Sales Density",
    key: "salesDensity",
  },
  {
    label: "Target OCR",
    key: "targetOCR",
  },
  {
    label: "Billing Freq.",
    key: "Billingfreq",
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

export const annualEscalationDataColor = ({
  customerRequestLen,
  accPolicy,
  customerRequest,
}) =>
  customerRequestLen > 1 ||
  parseFloat(customerRequest) > parseFloat(accPolicy) > accPolicy
    ? "red"
    : "green";

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
