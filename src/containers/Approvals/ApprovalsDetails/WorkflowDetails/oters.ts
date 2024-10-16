import { getDateFormat } from "../../../../utils/helper";

const yesOrNo = (value) => (value ? "Yes" : "No");
export type iterationType = {
  key: string;
  label: string;
  method?: any;
  colorMethod?: any;
  textColorMethod?: any;
};
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
