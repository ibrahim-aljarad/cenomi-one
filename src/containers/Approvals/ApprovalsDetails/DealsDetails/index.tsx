import React from "react";
import { CustomText } from "../../../../components";
import { dealWorkflowSubmodules } from "../../serializer";
import { TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { Colors, CommonStyles } from "../../../../theme";
import { RfH, RfW, getColorWithOpacity } from "../../../../utils/helper";

function DealsDetails({
  data,
  approvalType,
  isDarkMode,
}: {
  data: any;
  approvalType: string;
  isDarkMode?: boolean;
}) {
  const field = dealWorkflowSubmodules[approvalType];

  const generalData = [
    {
      label: "Department",
      key: "department",
    },
    {
      label: "Customer Group",
      key: "customerGroup",
    },
    {
      label: "Key Account",
      key: "keyAccount",
    },
    {
      label: "Created By",
      key: "createdBy",
    },
    {
      label: "Lease Type",
      key: "leaseType",
    },
    {
      label: "Customer Brand",
      key: "customerCodeBrandName",
    },
  ];
  const terminationPortfolioData = [
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
  ];
  const terminationGridDetails = [
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
  const customerWiseTerminationCardFields = [
    {
      title: "General",
      details: generalData,
      dataField: data,
    },
    {
      title: "Tenant Portfolio Data",
      details: terminationPortfolioData,
      dataField: data?.tenantPortFolioData,
    },
    ...(data?.terminationGridData||[]).map((terminationItem) => ({
      title: `Termination Lease: ${terminationItem?.LeaseNumber}`,
      details: terminationGridDetails,
      dataField: terminationItem,
    })),
  ];
  return (
    <>
      {customerWiseTerminationCardFields?.map(
        ({ title, details, dataField }) => (
          <>
            <View
              style={[
                styles.requestCellView,
                {
                  backgroundColor: isDarkMode
                    ? Colors.darkModeButton
                    : getColorWithOpacity(Colors.midnightExpress, 0.24),
                },
              ]}
            >
              <View
                style={[
                  styles.topHeader,
                  { borderColor: getColorWithOpacity(Colors.white, 0.2) },
                ]}
              >
                <CustomText
                  fontSize={16}
                  color={isDarkMode ? Colors.white : Colors.white}
                  styling={{ ...CommonStyles.mediumFontStyle, width: "80%" }}
                >
                  {title}
                </CustomText>
              </View>
              {details?.map(({ label, key }) =>
                dataField?.[key] ? (
                  <View style={styles.cellContainerView}>
                    <View style={styles.rightCellView}>
                      <View style={styles.topTitle}>
                        <CustomText
                          fontSize={14}
                          color={isDarkMode ? Colors.white : Colors.white}
                          styling={{
                            lineHeight: RfH(20),
                            ...CommonStyles.regularFont500Style,
                          }}
                          numberOfLines={4}
                        >
                          {label}: {dataField?.[key]}
                        </CustomText>
                      </View>
                    </View>
                  </View>
                ) : (
                  <></>
                )
              )}
            </View>
          </>
        )
      )}
    </>
  );
}

export default DealsDetails;
