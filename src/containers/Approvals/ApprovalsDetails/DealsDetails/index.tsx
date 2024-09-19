import React, { Fragment } from "react";
import { CustomText } from "../../../../components";
import { dealWorkflowSubmodules } from "../../serializer";
import { View } from "react-native";
import styles from "./styles";
import { Colors, CommonStyles } from "../../../../theme";
import { RfH, RfW, getColorWithOpacity } from "../../../../utils/helper";
import {
  contractGridDetails,
  estimatedSalesField,
  generalDetailsTermination,
  mallDataFields,
  renewalProposalDetailsData,
  terminationGridDetails,
  terminationPortfolioData,
} from "./serializer";

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

  const dealCardsData = [
    {
      title: "General",
      details: generalDetailsTermination,
      dataField: data,
    },
    ...(data?.tenantPortFolioData || data?.tenantProtfolioData
      ? [
          {
            title: "Tenant Portfolio Data",
            details: terminationPortfolioData,
            dataField: data?.tenantPortFolioData || data?.tenantProtfolioData,
          },
        ]
      : []),
    ,
    ...(data?.renewalProposalDetails
      ? [
          {
            title: "Renewal Proposal Details",
            details: renewalProposalDetailsData,
            dataField: data?.renewalProposalDetails,
          },
        ]
      : []),
    ...(data?.estimatedSales
      ? [
          {
            title: "Estimated Sales",
            details: estimatedSalesField,
            dataField: data?.estimatedSales,
          },
        ]
      : []),
    ...(data?.terminationGridData || []).map((terminationItem) => ({
      title: `Termination Lease: ${terminationItem?.LeaseNumber}`,
      details: terminationGridDetails,
      dataField: terminationItem,
    })),
    ...(data?.contractInformation || []).map((contractItem) => ({
      title: `Contract Lease: ${contractItem?.LeaseNumber}`,
      details: contractGridDetails,
      dataField: contractItem,
    })),

    ...(data?.mallData || []).map((mallItem) => ({
      title: `Mall: ${mallItem?.mall_Name}`,
      details: mallDataFields,
      dataField: mallItem,
    })),
  ];

  if (!data) return <></>;

  return (
    <>
      {dealCardsData?.map(({ title, details, dataField }) => (
        <View
          style={[
            styles.requestCellView,
            {
              backgroundColor: isDarkMode
                ? Colors.darkModeButton
                : getColorWithOpacity(Colors.midnightExpress, 0.24),
            },
          ]}
          key={title}
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
              <View style={styles.cellContainerView} key={key + title}>
                <CustomText
                  fontSize={14}
                  color={Colors.white}
                  styling={{
                    marginStart: RfW(5),
                    lineHeight: RfH(20),
                    ...CommonStyles.regularFont400Style,
                  }}
                >
                  {label} : {dataField?.[key]?.join?.(", ") || dataField?.[key]}
                </CustomText>
              </View>
            ) : (
              <></>
            )
          )}
        </View>
      ))}
      {Array.isArray(data?.notes) ? (
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
              Notes
            </CustomText>
          </View>
          {data?.notes?.map(({ items, accPolicy, customerRequest }) => (
            <Fragment key={items + accPolicy}>
              <View  style={styles.cellContainerView}>
                <CustomText
                  fontSize={14}
                  color={Colors.white}
                  styling={{
                    marginStart: RfW(5),
                    lineHeight: RfH(20),
                    ...CommonStyles.regularFont400Style,
                  }}
                >
                  Items : {items}
                </CustomText>
              </View>

              {accPolicy && (
                <View  style={styles.cellContainerView}>
                  <CustomText
                    fontSize={14}
                    color={Colors.white}
                    styling={{
                      marginStart: RfW(5),
                      lineHeight: RfH(20),
                      ...CommonStyles.regularFont400Style,
                    }}
                  >
                    Acc Policy : {accPolicy}
                  </CustomText>
                </View>
              )}
              {customerRequest && (
                <View  style={styles.cellContainerView}>
                  <CustomText
                    fontSize={14}
                    color={Colors.white}
                    styling={{
                      marginStart: RfW(5),
                      lineHeight: RfH(20),
                      ...CommonStyles.regularFont400Style,
                    }}
                  >
                    Customer Request : {customerRequest}
                  </CustomText>
                </View>
              )}
              <View style={{ height: RfH(20) }} />
            </Fragment>
          ))}
        </View>
      ) : (
        <></>
      )}
      <View style={{ height: RfH(30) }} />
    </>
  );
}

export default DealsDetails;
