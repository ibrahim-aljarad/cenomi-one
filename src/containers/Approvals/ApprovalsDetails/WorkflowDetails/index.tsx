import React, { Fragment } from "react";
import {
  CustomImage,
  CustomRenderHtml,
  CustomText,
} from "../../../../components";
import { View } from "react-native";
import styles from "./styles";
import { Colors, CommonStyles, Images } from "../../../../theme";
import { RfH, RfW, getColorWithOpacity } from "../../../../utils/helper";
import {
  contractGridDetails,
  estimatedSalesField,
  generalDetailsTermination,
  invoiceFields,
  mallDataFields,
  renewalProposalDetailsData,
  serenaFields,
  taskDataFields,
  terminationGridDetails,
  terminationPortfolioData,
} from "./serializer";
import { localize } from "../../../../locale/utils";

function WorkflowDetails({
  data,
  approvalType,
  isDarkMode,
}: {
  data: any;
  approvalType: string;
  isDarkMode?: boolean;
}) {
  const { requestData, taskData } = data || {};
  const dealCardsData = [
    {
      title: "General",
      details: generalDetailsTermination,
      dataField: { ...data, ...requestData, ...taskData },
    },
    ...(requestData?.memoMessage
      ? [
          {
            title: "Memo",
            details: {},
            component: true,
          },
        ]
      : []),
    ,
    ...(requestData?.tenantPortFolioData || requestData?.tenantProtfolioData
      ? [
          {
            title: "Tenant Portfolio Data",
            details: terminationPortfolioData,
            dataField:
              requestData?.tenantPortFolioData ||
              requestData?.tenantProtfolioData,
          },
        ]
      : []),
    ,
    ...(requestData?.renewalProposalDetails
      ? [
          {
            title: "Renewal Proposal Details",
            details: renewalProposalDetailsData,
            dataField: requestData?.renewalProposalDetails,
          },
        ]
      : []),
    ...(requestData?.estimatedSales
      ? [
          {
            title: "Estimated Sales",
            details: estimatedSalesField,
            dataField: requestData?.estimatedSales,
          },
        ]
      : []),

    //for Termination Committee Approval
    ...(requestData?.terminationGridData || []).map((terminationItem) => ({
      title: `Termination Lease: ${terminationItem?.LeaseNumber}`,
      details: terminationGridDetails,
      dataField: terminationItem,
    })),

    ...(requestData?.contractInformation || []).map((contractItem) => ({
      title: `Contract Lease: ${contractItem?.LeaseNumber}`,
      details: contractGridDetails,
      dataField: contractItem,
    })),
    //for Invoice Status Change,Payment Plan
    ...(requestData?.involvedInvoicesData || []).map((invoiceItem) => ({
      title: `Invoice: ${invoiceItem?.invoiceIdPk}`,
      details: invoiceFields,
      dataField: invoiceItem,
    })),
    ...(requestData?.mallData || []).map((mallItem) => ({
      title: `Mall: ${mallItem?.mall_Name}`,
      details: mallDataFields,
      dataField: mallItem,
    })),
    //for Serena Invoice
    ...(requestData?.Vendordata || []).map(({ Vendor }) => ({
      title: `Vendor`,
      details: serenaFields,
      dataField: Vendor,
    })),
    //for Serena Invoice
    ...(requestData?.headerdata || []).map((headerItem) => ({
      title: `Header`,
      details: serenaFields,
      dataField: headerItem,
    })),
    //for Serena Invoice
    ...(requestData?.lineData || []).map((lineItem) => ({
      title: `Line: ${lineItem?.LineNumber}`,
      details: serenaFields,
      dataField: lineItem,
    })),

    //for all
    ...(taskData?.data || []).map((taskItem) => ({
      title: `Approver ${taskItem?.name?.trim() ? ": " + taskItem?.name : ""}`,
      icon: !!taskItem?.isCompleted ? Images.tickUploadDoc : null,
      details: taskDataFields,
      dataField: taskItem,
    })),
  ];

  if (!data) return <></>;

  const renderComponent = (requestData) => {
    return (
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
            {localize("Memo")}
          </CustomText>
        </View>
        <View style={styles.cellContainerView}>
          <CustomRenderHtml
            source={requestData?.memoMessage}
            tagsStyles={{
              body: {
                whiteSpace: "normal",
                color: isDarkMode ? Colors.white : Colors.white,
                fontSize: 14,
                lineHeight: 22,
                ...CommonStyles.regularFont400Style,
              },
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <>
      {dealCardsData?.map(({ title, details, dataField, component, icon }) =>
        component ? (
          renderComponent(requestData)
        ) : (
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
                styling={{
                  ...CommonStyles.mediumFontStyle,
                  width: icon ? "80%" : "95%",
                }}
              >
                {title}
              </CustomText>

              {icon && (
                <CustomImage
                  image={icon}
                  imageWidth={30}
                  imageHeight={30}
                  imageResizeMode={"contain"}
                  styling={{ marginRight: RfW(1) }}
                />
              )}
            </View>
            <View style={{ paddingVertical: RfH(5) }}>
              {details?.map(({ label, key, method }) =>
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
                      {label} :{" "}
                      {method
                        ? method(dataField?.[key])
                        : dataField?.[key]?.join?.(", ") || dataField?.[key]}
                    </CustomText>
                  </View>
                ) : (
                  <></>
                )
              )}
            </View>
          </View>
        )
      )}
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
              <View style={styles.cellContainerView}>
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
                <View style={styles.cellContainerView}>
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
                <View style={styles.cellContainerView}>
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

export default WorkflowDetails;
