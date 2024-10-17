import React from "react";
import {
  CustomImage,
  CustomRenderHtml,
  CustomText,
} from "../../../../components";
import { FlatList, View } from "react-native";
import styles from "./styles";
import { Colors, CommonStyles, Images } from "../../../../theme";
import { RfH, RfW, getColorWithOpacity } from "../../../../utils/helper";
import {
  colorValue,
  contractGridDetails,
  estimatedSalesField,
  generalDetailsTermination,
  getGenaralDetailsCard,
  mallDataFields,
  noteFields,
  renewalProposalDetailsData,
  taskDataFields,
  terminationGridDetails,
  terminationPortfolioData,
} from "./serializer";
import { localize } from "../../../../locale/utils";
import { sortBy } from "lodash";

function WorkflowDetails({
  data,
  isDarkMode,
  formName,
}: {
  data: any;
  approvalType?: string;
  isDarkMode?: boolean;
  formName?: string;
}) {
  
  const { requestData, taskData } = data || {};
  const dealCardsData: any = [
    {
      title: "General",
      details: getGenaralDetailsCard(formName) ||generalDetailsTermination,
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
    //for Termination Committee Approval
    ...(requestData?.terminationGridData
      ? [
          {
            title: `Termination Data Table`,
            details: terminationGridDetails,
            dataField: requestData?.terminationGridData,
            component: "table",
          },
        ]
      : []),
    //renewal committee
    ...(requestData?.contractInformation
      ? [
          {
            title: `Contract Lease Table`,
            details: contractGridDetails,
            dataField: requestData?.contractInformation,
            component: "table",
            maxWidth: RfW(300),
          },
        ]
      : []),
    //new lease committee
    ...(requestData?.mallData
      ? [
          {
            title: `Mall Data Table`,
            details: mallDataFields,
            dataField: requestData?.mallData,
            component: "table",
            maxWidth: RfW(300),
          },
        ]
      : []),
    ...(requestData?.tenantPortFolioData ||
    requestData?.tenantProtfolioData ||
    requestData?.tenantPortfolio
      ? [
          {
            title: "Tenant Portfolio Data",
            details: terminationPortfolioData,
            dataField: [
              requestData?.tenantPortFolioData ||
                requestData?.tenantProtfolioData ||
                requestData?.tenantPortfolio?.[0],
            ],
            component: "table",
          },
        ]
      : []),
    ...(requestData?.renewalProposalDetails
      ? [
          {
            details: renewalProposalDetailsData,
            dataField: [requestData?.renewalProposalDetails],
            component: "table",
          },
        ]
      : []),
    ...(requestData?.estimatedSales
      ? [
          {
            title: "Estimated Sales",
            details: estimatedSalesField,
            dataField: [requestData?.estimatedSales],
            component: "table",
          },
        ]
      : []),
    ,
    //for note values
    ...(Array.isArray(requestData?.notes)
      ? [
          {
            title: `Notes`,
            details: noteFields,
            dataField: requestData?.notes,
            component: "table",
          },
        ]
      : requestData?.notes ? [
        {
          title: `Additional Notes`,
          details: [{key:'notes' }],
          dataField: requestData,
        },
      ]:[]),

    //for all
    ...sortBy(taskData?.data || [], ({ order }) => order).map((taskItem) => ({
      title: `Approver:  ${
        taskItem?.name?.trim() ? taskItem?.name : taskItem?.completedBy
      }`,
      icon: !!taskItem?.isCompleted ? Images.tickUploadDoc : null,
      details: taskDataFields,
      dataField: taskItem,
    })),
  ];


  const horizontalDataConversion = ({ details, dataField }) =>
    details
      ?.filter(({ key }) =>
        dataField?.some((item) => item?.[key] || item?.[key] === 0)
      )
      ?.map(
        ({
          label,
          key,
          method,
          colorMethod = (a, b, c) => null,
          textColorMethod = (a, b, c) => null,
        }) => [
          { text: label },
          ...dataField?.map((item, inx) =>
            method
              ? { text: method(item?.[key]) }
              : {
                  text: item?.[key]?.join?.(", ") ?? item?.[key] ?? "     ",
                  bgColor:
                    key === "customerRequest"
                      ? colorValue({ ...item })
                      : colorMethod(item, key, inx === dataField?.length),
                  textColor: textColorMethod(
                    item,
                    key,
                    inx === dataField?.length
                  ),
                }
          ),
        ]
      );

  const renderComponent = ({
    title,
    details,
    dataField,
    component,
    maxWidth,
  }) => {
    if (component === "table")
      return (
        <View style={styles.tableContainer}>
          {!!title && (
            <View
              style={[
                styles.topHeader,
                {
                  borderColor: getColorWithOpacity(Colors.white, 0.2),
                  paddingTop: RfH(0),
                  ...styles.tableHead,
                },
              ]}
            >
              <CustomText
                fontSize={16}
                color={isDarkMode ? Colors.white : Colors.white}
                styling={{
                  ...CommonStyles.mediumFontStyle,
                  width: "80%",
                }}
              >
                {title}
              </CustomText>
            </View>
          )}
          <FlatList
            data={horizontalDataConversion({ details, dataField })}
            style={styles.tableList}
            horizontal
            renderItem={({ item }) => (
              <View style={styles.tableRow}>
                {item?.map(({ text, bgColor, textColor }, inx) => (
                  <View
                    style={[
                      styles.tableCell,
                      bgColor
                        ? {
                            backgroundColor: bgColor,
                          }
                        : {},
                      maxWidth ? { maxWidth } : {},
                      maxWidth && inx === 0 ? { height: RfH(40) } : {},
                    ]}
                    key={`${text}${inx}`}
                  >
                    <CustomText
                      fontSize={14}
                      color={textColor || Colors.white}
                      styling={{
                        marginHorizontal: RfW(5),
                        lineHeight: RfH(20),
                        ...CommonStyles[
                          !inx ? "boldFontStyle" : "regularFont400Style"
                        ],
                      }}
                    >
                      {text}
                    </CustomText>
                  </View>
                ))}
              </View>
            )}
            keyExtractor={(item, index) => `${index}${title}`}
            showsHorizontalScrollIndicator
            persistentScrollbar
          />
        </View>
      );

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
    );
  };

  if (!data) return <></>;

  const isContentAvailable = (dataValue) => {
    if (!dataValue) return;
    if (Array.isArray(dataValue)) return !!dataValue?.length;
    return true;
  };

  return (
    <>
      {dealCardsData?.map(({ title, details, dataField, component, icon, maxWidth }) =>
        component ? (
          renderComponent({ title, details, dataField, component, maxWidth })
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
                isContentAvailable(dataField?.[key]) ? (
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
                      {label ? `${label}: `:''}
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

      <View style={{ height: RfH(30) }} />
    </>
  );
}

export default WorkflowDetails;
