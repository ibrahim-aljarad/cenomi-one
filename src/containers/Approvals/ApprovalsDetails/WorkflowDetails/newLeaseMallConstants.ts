import { Colors } from "../../../../theme";
import { getDateFormat } from "../../../../utils/helper";
import { iterationType } from "./serializer";

const yesOrNo = (value) => (value ? "Yes" : "No");

export const generalNewLease = [
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
    label: "Customer Name",
    key: "customerName",
  },
  {
    label: "First Payment Required",
    key: "firstPayment",
    method: yesOrNo,
  },
  {
    label: "Promissory Note Required",
    key: "promissoryNote",
    method: yesOrNo,
  },
  {
    label: "Contract Type",
    key: "contractType",
  },
  {
    label: "Serial Number",
    key: "serialNumber",
  },
  {
    label: "Proposed Brand",
    key: "proposedBrand",
  },
  {
    label: "Lease Created On",
    key: "createdDate",
  },
  {
    label: "Requested By",
    key: "requestedByEmailName",
  },
  {
    label: "Lease Type",
    key: "leaseType",
  },
];

const nullYellow = (item, key) => {
  if (item?.mall_Name !== "Total" && !item?.[key]) return Colors.yellowLight;
  return "";
};

const getMallTypeColor = ({ mall_Type, proposedBrandName }) => {
  if (mall_Type && !proposedBrandName) return Colors.yellowLight;
  return "";
};

const getMallUnitColor = ({ mall_Name, unit, newBaseRent }) => {
  if (mall_Name !== "Total" && (!unit || !newBaseRent))
    return Colors.yellowLight;
  return "";
};

const getMallAreaColor = ({ mall_Name, area_Sqm, newBaseRent }) => {
  if (mall_Name !== "Total" && (!area_Sqm || !newBaseRent))
    return Colors.yellowLight;
  return "";
};

const getBaseRentColor = ({ mall_Name, newBaseRent }) => {
  if (!newBaseRent || !parseInt(newBaseRent)) return Colors.yellowLight;
  return "";
};

const getBudgetBaseRentColor = ({ mall_Name, budgetBaseRent }) => {
  if (!budgetBaseRent || !parseInt(budgetBaseRent)) return Colors.yellowLight;
  return "";
};

const getPriceListColor = ({ mall_Name, newBaseRent, priceList }) => {
  if (!newBaseRent) return Colors.yellowLight;
  const parsePrice = parseFloat(priceList);
  if (parsePrice < 0) return Colors.red;
  if (parsePrice > 0) return Colors.green;

  return "";
};

const getFreeperiodColor = ({
  mall_Name,
  newBaseRent,
  priceList,
  freePeriodMonths,
}) => {
  if (!newBaseRent) return Colors.yellowLight;
  if (!priceList) return Colors.yellowLight;
  const parseData = parseFloat(freePeriodMonths);
  if (parseData < 0) return Colors.red;
  if (parseData > 0) return Colors.grey;

  return "";
};

const getFreePeriodAmntColor = ({ freePeriodAmount, newBaseRent }) => {
  if (!newBaseRent) return Colors.yellowLight;
  return "";
};

const getNewBaserentValueSAR = (newBaserentValueSAR) =>
  newBaserentValueSAR ? newBaserentValueSAR : "0";

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
    alignItems: 'flex-end',
  },
  {
    label: "New Base Rent (SAR/Sqm)",
    key: "newBaseRent",
    colorMethod: getBaseRentColor,
    alignItems: 'flex-end',
  },
  {
    label: `Budget FY'${
      new Date().getFullYear() % 2000
    } Base Rent If Not Available Price List (SAR/sqm)`,
    key: "budgetBaseRent",
    colorMethod: getBudgetBaseRentColor,
    alignItems: 'flex-end',
  },
  {
    label: `New Proposed Rent VS Budget FY'${
      new Date().getFullYear() % 2000
    } Or Price List (%)`,
    key: "priceList",
    colorMethod: getPriceListColor,
    alignItems: 'flex-end',
  },
  {
    label: "Free Period Months",
    key: "freePeriodMonths",
    colorMethod: getFreeperiodColor,
    alignItems: 'flex-end',
  },
  {
    label: "Free Period Amount",
    key: "freePeriodAmount",
    colorMethod: getFreePeriodAmntColor,
    alignItems: 'flex-end',
  },
  {
    label: "New Base Rent Value (SAR)",
    key: "newBaserentValueSAR",
    method: getNewBaserentValueSAR,
    alignItems: 'flex-end',
  },
  {
    label: "Budget Price (SAR) Or Price List Base Rent Value (SAR)",
    key: "budgetPriceSAR",
    alignItems: 'flex-end',
  },
  {
    label: "Target OCR (%)",
    key: "targetOCR",
    alignItems: 'flex-end',
  },
];
