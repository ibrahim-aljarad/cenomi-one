import React, { useEffect, useState } from "react";
import {
  CustomImage,
  CustomRenderHtml,
  CustomText,
} from "../../../../components";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { Colors, CommonStyles } from "../../../../theme";
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
import { isString, sortBy } from "lodash";
import ApproverDetails from "../../../../components/ApproverDetails";
import DocumentsViewModal from "../../../../components/DocumentsViewModal";
import DocumentViewer from "./DocumentViewer";

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
  const { requestData, taskData, requestDataUrl, documentData } = data || {};
  const [memoMessage, setMemoMessage] = useState<string | null>(null);
  const [selectedDocument, setSelectedDocument] = useState({
    isVisible: false,
    url: "",
    title: "",
    fileType: "",
  });

  const handleDocumentOpen = (attachment) => {
    setSelectedDocument({
      isVisible: true,
      url: attachment.document_BLOB_url,
      title: attachment.name,
      fileType: attachment.extension,
    });
  };

  const handleCloseDocument = () => {
    setSelectedDocument({
      isVisible: false,
      url: "",
      title: "",
      fileType: "",
    });
  };

  const fetchMemoMessage = async (url: string) => {
    if (!url) return;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data?.memoMessage) {
        setMemoMessage(data.memoMessage);
      }
    } catch (error) {
      console.error("Error fetching memo message:", error);
    }
  };

  useEffect(() => {
    if (Array.isArray(requestDataUrl) && requestDataUrl[0]) {
      fetchMemoMessage(requestDataUrl[0]);
    } else if (requestData?.memoMessage) {
      setMemoMessage(requestData.memoMessage);
    }
  }, [requestData?.memoMessage, requestDataUrl]);

  const getApprovalTitle = (taskItem, index, allTaskData) => {
    if (allTaskData?.[index - 1]?.requestMoreInfo) {
      return `Information Requested From - ${taskItem?.name}`;
    }
    if (isString(taskItem?.groupName)) {
      return `${taskItem?.groupName} - ${taskItem?.name}`;
    }
    return taskItem?.name;
  };

  const renderAttachmentItem = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.attachmentRow,
        {
          backgroundColor: isDarkMode ? Colors.darkModeButton : Colors.white,
          borderBottomWidth:
            index < documentData?.attachements?.length - 1 ? 1 : 0,
          borderColor: getColorWithOpacity(Colors.black, 0.2),
        },
      ]}
      onPress={() => handleDocumentOpen(item)}
    >
      <View style={styles.attachmentContent}>
        <CustomText
          fontSize={14}
          color={isDarkMode ? Colors.black : Colors.black}
          styling={{
            ...CommonStyles.regularFont400Style,
          }}
          numberOfLines={1}
        >
          {item.name}
        </CustomText>
      </View>

      <View style={styles.attachmentCTA}>
        <CustomText
          fontSize={14}
          color={Colors.blue}
          styling={{
            ...CommonStyles.regularFont400Style,
          }}
        >
          Open
        </CustomText>
      </View>
    </TouchableOpacity>
  );

  const renderAttachmentsSection = () => {
    if (!documentData?.attachements?.length) return null;

    return (
      <View
        style={[
          styles.requestCellView,
          {
            backgroundColor: isDarkMode ? Colors.darkModeButton : Colors.white,
          },
        ]}
      >
        <View
          style={[
            styles.topHeader,
            { borderColor: getColorWithOpacity(Colors.black, 0.2) },
          ]}
        >
          <CustomText
            fontSize={16}
            color={isDarkMode ? Colors.black : Colors.black}
            styling={{
              ...CommonStyles.mediumFontStyle,
              width: "95%",
            }}
          >
            Attachments
          </CustomText>
        </View>
        <FlatList
          data={documentData?.attachements || []}
          renderItem={renderAttachmentItem}
          keyExtractor={(item) => item.documentIdPk.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.attachmentsContainer}
        />
      </View>
    );
  };

  const renderLodDocumentSection = () => {
    if (!documentData?.lodDocument?.length) return null;
    return <DocumentViewer documentId={documentData?.lodDocument[0]} />;
  };

  const renderCommentsSection = (details) => (
    <View
      style={[
        styles.requestCellView,
        {
          backgroundColor: isDarkMode ? Colors.darkModeButton : Colors.white,
        },
      ]}
    >
      <View
        style={[
          styles.topHeader,
          { borderColor: getColorWithOpacity(Colors.black, 0.2) },
        ]}
      >
        <CustomText
          fontSize={16}
          color={isDarkMode ? Colors.black : Colors.black}
          styling={{ ...CommonStyles.mediumFontStyle, width: "95%" }}
        >
          Additional Comments
        </CustomText>
      </View>
      <View style={styles.commentBox}>
        <Text style={styles.commentText}>{details.userNotes}</Text>
      </View>
    </View>
  );

  const dealCardsData: any = [
    {
      title: "General",
      details: getGenaralDetailsCard(formName) || generalDetailsTermination,
      dataField: { ...data, ...requestData, ...taskData },
    },
    // for Imemo message
    ...(memoMessage?.trim()
      ? [
          {
            title: "Memo",
            details: {},
            component: "memo",
          },
        ]
      : []),
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
      : requestData?.notes
      ? [
          {
            title: `Additional Notes`,
            details: [{ key: "notes" }],
            dataField: requestData,
          },
        ]
      : []),

    ...(documentData?.lodDocument?.length
      ? [
          {
            title: "LOD Document",
            component: "lod",
          },
        ]
      : []),
    ...(documentData?.attachements?.length
      ? [
          {
            title: "Attachments",
            component: "attachments",
          },
        ]
      : []),
    ...(requestData?.userNotes
      ? [
          {
            title: "Comments",
            details: { userNotes: requestData.userNotes },
            component: "comments",
          },
        ]
      : []),
  ];

  const generalCards = dealCardsData.filter(
    (card) => !["attachments", "comments", "card"].includes(card?.component)
  );

  const approverCards = sortBy(taskData?.data || [], ({ order }) => order).map(
    (taskItem, index, allTaskData) => ({
      title: getApprovalTitle(taskItem, index, allTaskData),
      details: taskDataFields,
      dataField: taskItem,
      component: "card",
    })
  );

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
          alignItems,
        }) => [
          { text: label },
          ...dataField?.map((item, inx) =>
            method
              ? { text: method(item?.[key]), alignItems }
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
                  alignItems,
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
    isFirstApprover,
  }) => {
    if (component === "card") {
      return (
        <>
          {isFirstApprover && (
            <View
              style={[
                styles.approverContainer,
                { borderColor: getColorWithOpacity(Colors.black, 0.2) },
              ]}
            >
              <CustomText
                fontSize={16}
                color={isDarkMode ? Colors.black : Colors.white}
                styling={{
                  ...CommonStyles.semiboldFontStyle,
                  width: "95%",
                }}
              >
                Approvers
              </CustomText>
            </View>
          )}
          <ApproverDetails
            taskItem={dataField}
            details={details}
            isDarkMode={isDarkMode}
          />
        </>
      );
    }

    if (component === "table")
      return (
        <View style={styles.tableContainer}>
          {!!title && (
            <View
              style={[
                styles.topHeader,
                {
                  borderColor: getColorWithOpacity(Colors.black, 0.2),
                  paddingTop: RfH(0),
                  ...styles.tableHead,
                },
              ]}
            >
              <CustomText
                fontSize={16}
                color={isDarkMode ? Colors.white : Colors.black}
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
                {item?.map(
                  (
                    {
                      text,
                      bgColor,
                      textColor,
                      alignItems = "flex-start",
                    }: any,
                    inx
                  ) => (
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
                        { alignItems: inx === 0 ? "flex-start" : alignItems },
                      ]}
                      key={`${text}${inx}`}
                    >
                      <CustomText
                        fontSize={14}
                        color={
                          textColor || bgColor ? Colors.white : Colors.black
                        }
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
                  )
                )}
              </View>
            )}
            keyExtractor={(item, index) => `${index}${title}`}
            showsHorizontalScrollIndicator
            persistentScrollbar
          />
        </View>
      );

    if (title === "Memo" && (!memoMessage || !memoMessage.trim())) {
      return null;
    }

    // Regular memo rendering with content
    if (title === "Memo" && memoMessage?.trim()) {
      return (
        <View
          style={[
            styles.requestCellView,
            {
              backgroundColor: isDarkMode
                ? Colors.darkModeButton
                : Colors.white,
            },
          ]}
        >
          <View
            style={[
              styles.topHeader,
              { borderColor: getColorWithOpacity(Colors.black, 0.2) },
            ]}
          >
            <CustomText
              fontSize={16}
              color={isDarkMode ? Colors.black : Colors.black}
              styling={{ ...CommonStyles.mediumFontStyle, width: "80%" }}
            >
              {localize("Memo")}
            </CustomText>
          </View>
          <CustomRenderHtml
            source={memoMessage}
            tagsStyles={{
              body: {
                whiteSpace: "normal",
                color: isDarkMode ? Colors.black : Colors.black,
                fontSize: 14,
                lineHeight: 22,
                ...CommonStyles.regularFont400Style,
              },
            }}
          />
        </View>
      );
    }
  };

  if (!data) return <></>;

  const isContentAvailable = (dataValue) => {
    if (!dataValue) return;
    if (Array.isArray(dataValue)) return !!dataValue?.length;
    return true;
  };

  return (
    <>
      {generalCards?.map(
        ({ title, details, dataField, component, icon, maxWidth }) =>
          component ? (
            renderComponent({
              title,
              details,
              dataField,
              component,
              maxWidth,
              isFirstApprover: false,
            })
          ) : (
            <View
              style={[
                styles.requestCellView,
                {
                  backgroundColor: isDarkMode
                    ? Colors.darkModeButton
                    : Colors.white,
                },
              ]}
              key={title}
            >
              <View
                style={[
                  styles.topHeader,
                  { borderColor: getColorWithOpacity(Colors.black, 0.2) },
                ]}
              >
                <CustomText
                  fontSize={16}
                  color={isDarkMode ? Colors.black : Colors.black}
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
                      <View style={styles.labelContainer}>
                        <CustomText
                          fontSize={14}
                          color={Colors.darkGrey113}
                          styling={{
                            ...CommonStyles.regularFont400Style,
                          }}
                        >
                          {label}
                        </CustomText>
                      </View>
                      <View style={styles.valueContainer}>
                        <CustomText
                          fontSize={14}
                          color={Colors.black}
                          styling={{
                            ...CommonStyles.regularFont400Style,
                          }}
                        >
                          {method
                            ? method(dataField?.[key])
                            : dataField?.[key]?.join?.(", ") ||
                              dataField?.[key]}
                        </CustomText>
                      </View>
                    </View>
                  ) : (
                    <></>
                  )
                )}
              </View>
            </View>
          )
      )}

      {documentData?.lodDocument?.length > 0 && renderLodDocumentSection()}

      {renderAttachmentsSection()}

      {requestData?.userNotes &&
        renderCommentsSection({ userNotes: requestData.userNotes })}

      {approverCards.map((card, index) =>
        renderComponent({
          ...card,
          isFirstApprover: index === 0,
        })
      )}

      <View style={{ height: RfH(30) }} />
      <DocumentsViewModal
        isVisible={selectedDocument.isVisible}
        onRequestClose={handleCloseDocument}
        documentInfo={{
          url: selectedDocument.url,
          title: selectedDocument.title,
          fileType: selectedDocument.fileType,
        }}
      />
    </>
  );
}

export default WorkflowDetails;
