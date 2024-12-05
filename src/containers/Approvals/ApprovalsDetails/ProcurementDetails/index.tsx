import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Images } from "../../../../theme";
import { RfH, RfW, getColorWithOpacity } from "../../../../utils/helper";
import { Colors, CommonStyles } from "../../../../theme";
import { BorderRadius, WIDTH } from "../../../../theme/sizes";
import { CustomText, IconButtonWrapper } from "../../../../components";
import { getSaveData } from "../../../../utils/helpers";
import { LOCAL_STORAGE_DATA_KEY } from "../../../../utils/constants";
import Config from "../../../../utils/config";
import DocumentsViewModal from "../../../../components/DocumentsViewModal";

const ProcurementDetails = ({
  taskDetails,
  isDarkMode,
  isYardiServiceModule,
}) => {
  console.log("taskDetails", taskDetails);
  const [selectedDocument, setSelectedDocument] = useState({
    isVisible: false,
    url: "",
    title: "",
    fileType: "",
    headers: {},
  });

  const handleDocumentOpen = async (
    attachment,
    isYardiServiceModule = false
  ) => {
    let title, url, fileType;
    if (isYardiServiceModule) {
      const token = await getSaveData(LOCAL_STORAGE_DATA_KEY.USER_TOKEN);

      const splitedTitle = attachment?.AttachmentName?.split(".");

      title = attachment?.AttachmentName;
      url = `${Config.API_BASE_URL}process/leasing/tasks-attachments/${attachment?.AttachmentID}?download=false&token=${token}`;
      fileType =
        splitedTitle?.length > 0 ? splitedTitle[splitedTitle?.length - 1] : "";
    } else {
      const fileName = attachment?.title || attachment?.attachmentName;
      const splitedData = fileName?.split(".");
      const splitedMimeType = attachment?.mimeType?.split("/");

      title = fileName || splitedMimeType[1] + " file";
      url = attachment?.uri?.href || attachment?.links?.href;
      fileType =
        splitedData?.length > 0
          ? splitedData[splitedData?.length - 1]
          : splitedMimeType?.length > 0
          ? splitedMimeType[1]
          : "";
    }
    setSelectedDocument({
      isVisible: true,
      url,
      title,
      fileType,
      headers: taskDetails?.attachmentAuthHeaders || {},
    });
  };

  const handleCloseDocument = () => {
    setSelectedDocument({
      isVisible: false,
      url: "",
      title: "",
      fileType: "",
      headers: {},
    });
  };

  const renderTaskDetailsData = () => {
    if (!taskDetails?.taskDetailsData?.length) {
      return null;
    }
    return (
      <View
        style={[
          styles.requestCellView,
          {
            backgroundColor: isDarkMode
              ? Colors.darkModeBackground
              : Colors.white,
          },
        ]}
      >
        <View style={styles.topHeader}>
          <CustomText
            fontSize={16}
            color={isDarkMode ? Colors.black : Colors.black}
            styling={{
              ...CommonStyles.mediumFontStyle,
              width: "95%",
            }}
          >
            General Details
          </CustomText>
        </View>

        <View style={{ paddingVertical: RfH(5) }}>
          {taskDetails?.taskDetailsData?.map((item, index) => {
            if (!item.value) return null;
            return (
              <>
                <View style={styles.cellContainerView}>
                  <View style={styles.labelContainer}>
                    <CustomText
                      fontSize={14}
                      color={Colors.darkGrey113}
                      styling={{
                        ...CommonStyles.regularFont400Style,
                      }}
                    >
                      {item?.name}
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
                      {item?.value}
                    </CustomText>
                  </View>
                </View>
              </>
            );
          })}
        </View>
      </View>
    );
  };

  const renderAttachmentsSection = () => {
    if (!taskDetails?.attachments?.length) return null;

    return (
      <View
        style={[
          styles.requestCellView,
          {
            backgroundColor: isDarkMode
              ? Colors.darkModeBackground
              : Colors.white,
          },
        ]}
      >
        <View style={styles.topHeader}>
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
          data={taskDetails?.attachments}
          renderItem={({ item, index }) => {
            const attachmentName =
              item?.attachmentName ||
              item?.title ||
              (item?.mimeType
                ? `${item.mimeType.split("/")[1]} File`
                : "Attachment");
            return (
              <TouchableOpacity
                style={[
                  styles.attachmentRow,
                  {
                    backgroundColor: isDarkMode
                      ? Colors.darkModeBackground
                      : Colors.white,
                    borderBottomWidth:
                      index < taskDetails?.attachments.length - 1 ? 1 : 0,
                    borderColor: getColorWithOpacity(Colors.black, 0.2),
                  },
                ]}
                onPress={() => handleDocumentOpen(item, isYardiServiceModule)}
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
                    {attachmentName}
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
          }}
          keyExtractor={(item, index) => `attachment-${index}`}
        />
      </View>
    );
  };

  const renderApprovers = () => {
    return (
      <>
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
        {taskDetails?.resultTaskHistoryData?.map((historyItem, index) => (
          <ApproverCard
            key={index}
            historyItem={historyItem}
            taskDetails={taskDetails}
            isDarkMode={isDarkMode}
          />
        ))}
      </>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {renderTaskDetailsData()}

      <View
        style={[
          styles.requestCellView,
          {
            backgroundColor: isDarkMode
              ? Colors.darkModeBackground
              : Colors.white,
          },
        ]}
      >
        <View style={styles.topHeader}>
          <CustomText
            fontSize={16}
            color={isDarkMode ? Colors.black : Colors.black}
            styling={{
              ...CommonStyles.mediumFontStyle,
              width: "95%",
            }}
          >
            Details
          </CustomText>
        </View>
        <View style={{ paddingVertical: RfH(5) }}>
          <View style={styles.cellContainerView}>
            <View style={styles.labelContainer}>
              <CustomText
                fontSize={14}
                color={Colors.darkGrey113}
                styling={{
                  ...CommonStyles.regularFont400Style,
                }}
              >
                {taskDetails?.number ? "Number" : "Record ID"}
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
                {taskDetails?.number || taskDetails?.RecordID}
              </CustomText>
            </View>
          </View>

          <View style={styles.cellContainerView}>
            <View style={styles.labelContainer}>
              <CustomText
                fontSize={14}
                color={Colors.darkGrey113}
                styling={{
                  ...CommonStyles.regularFont400Style,
                }}
              >
                Module
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
                {taskDetails?.subModule?.name || taskDetails?.Type}
              </CustomText>
            </View>
          </View>

          <View style={styles.cellContainerView}>
            <View style={styles.labelContainer}>
              <CustomText
                fontSize={14}
                color={Colors.darkGrey113}
                styling={{
                  ...CommonStyles.regularFont400Style,
                }}
              >
                Title
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
                {taskDetails?.title}
              </CustomText>
            </View>
          </View>

          <View style={styles.cellContainerView}>
            <View style={styles.labelContainer}>
              <CustomText
                fontSize={14}
                color={Colors.darkGrey113}
                styling={{
                  ...CommonStyles.regularFont400Style,
                }}
              >
                Submitted By
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
                {taskDetails?.createdBy ||
                  taskDetails?.fromUserDisplayName ||
                  taskDetails?.Requester_Name}
              </CustomText>
            </View>
          </View>

          <View style={styles.cellContainerView}>
            <View style={styles.labelContainer}>
              <CustomText
                fontSize={14}
                color={Colors.darkGrey113}
                styling={{
                  ...CommonStyles.regularFont400Style,
                }}
              >
                Submitted On
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
                {taskDetails?.date}
              </CustomText>
            </View>
          </View>
        </View>
      </View>

      {renderAttachmentsSection()}
      {renderApprovers()}

      <DocumentsViewModal
        isVisible={selectedDocument.isVisible}
        onRequestClose={handleCloseDocument}
        documentInfo={{
          url: selectedDocument.url,
          title: selectedDocument.title,
          fileType: selectedDocument.fileType,
        }}
      />
    </ScrollView>
  );
};

const ApproverCard = ({ historyItem, taskDetails, isDarkMode }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const hasComments =
    historyItem.comments && historyItem.comments.trim().length > 0;

  return (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        {
          backgroundColor: isDarkMode
            ? Colors.darkModeBackground
            : Colors.white,
        },
      ]}
      onPress={() => setIsExpanded(!isExpanded)}
      activeOpacity={0.7}
    >
      <View style={styles.headerContainer}>
        <View style={styles.avatarContainer}>
          <Image
            source={{
              uri: `${taskDetails?.config?.apiBaseUrl}/user/${historyItem?.emailBase64}/profile-image?token=${taskDetails?.config?.accessToken}`,
            }}
            style={styles.avatar}
            onError={(e) =>
              console.log("Image loading error:", e.nativeEvent.error)
            }
          />
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.infoSection}>
            <View style={styles.nameDesignationContainer}>
              <Text numberOfLines={1} style={styles.name}>
                {historyItem?.title || historyItem?.displayName}
              </Text>
            </View>
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor:
                    historyItem?.actionName === null ||
                    historyItem?.actionName === "Assigned"
                      ? "#fff3e0"
                      : "#e8f5e9",
                },
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  {
                    color:
                      historyItem?.actionName === null ||
                      historyItem?.actionName === "Assigned"
                        ? "#ef6c00"
                        : "#2e7d32",
                  },
                ]}
              >
                {historyItem?.actionName || "AWAITING"}
              </Text>
            </View>

            <Text style={styles.time}>{historyItem?.updatedDate}</Text>
          </View>
        </View>

        {hasComments && (
          <IconButtonWrapper
            styling={styles.iconContainer}
            iconImage={
              isExpanded ? Images.arrowDownBlack : Images.arrowRightblack
            }
            iconHeight={WIDTH.W14}
            iconWidth={WIDTH.W14}
          />
        )}
      </View>

      {isExpanded && historyItem.comments && (
        <View style={styles.detailsContainer}>
          <Text style={styles.commentLabel}>Comments</Text>
          <View style={styles.commentBox}>
            <Text style={styles.commentText}>{historyItem.comments}</Text>
            {historyItem.related?.map((item, idx) => (
              <Text key={idx} style={styles.commentText}>
                {item.comments}
              </Text>
            ))}
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  requestCellView: {
    borderRadius: BorderRadius.BR15,
    backgroundColor: Colors.white,
    marginHorizontal: RfW(24),
    paddingHorizontal: RfW(15),
    marginTop: RfH(16),
  },
  topHeader: {
    paddingTop: RfH(12),
    paddingBottom: RfH(12),
    borderBottomWidth: 1,
    borderColor: getColorWithOpacity(Colors.black, 0.2),
  },
  topHeaderText: {
    fontSize: 16,
    ...CommonStyles.mediumFontStyle,
    color: Colors.black,
  },
  cellContainerView: {
    flexDirection: "row",
    paddingVertical: RfH(8),
    alignItems: "flex-start",
  },
  labelContainer: {
    width: "40%",
    paddingRight: RfW(10),
  },
  valueContainer: {
    flex: 1,
  },
  labelText: {
    fontSize: 14,
    color: Colors.darkGrey113,
    ...CommonStyles.regularFont400Style,
  },
  valueText: {
    fontSize: 14,
    color: Colors.black,
    ...CommonStyles.regularFont400Style,
  },
  approverContainer: {
    marginTop: RfH(16),
    marginHorizontal: RfW(24),
  },
  itemContainer: {
    backgroundColor: "white",
    borderRadius: BorderRadius.BR15,
    padding: RfW(16),
    marginHorizontal: RfW(24),
    marginTop: RfH(16),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    width: RfW(50),
    justifyContent: "center",
    marginRight: RfW(12),
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  contentContainer: {
    flex: 1,
  },
  infoSection: {
    flex: 1,
  },
  nameDesignationContainer: {
    marginBottom: RfH(4),
  },
  name: {
    fontSize: 16,
    ...CommonStyles.mediumFontStyle,
    color: Colors.black,
    marginBottom: RfH(2),
  },
  statusBadge: {
    paddingHorizontal: RfW(12),
    paddingVertical: RfH(6),
    borderRadius: 16,
    alignSelf: "flex-start",
    marginBottom: RfH(4),
  },
  statusText: {
    ...CommonStyles.regularFont500Style,
    fontSize: 12,
    letterSpacing: 0.25,
  },
  time: {
    ...CommonStyles.regularFont400Style,
    fontSize: 12,
    color: "#757575",
  },
  detailsContainer: {
    marginTop: RfH(16),
    paddingTop: RfH(16),
    borderTopWidth: 1,
    borderTopColor: getColorWithOpacity(Colors.black, 0.2),
  },
  commentLabel: {
    fontSize: 14,
    ...CommonStyles.regularFont500Style,
    color: "#424242",
    marginBottom: RfH(8),
  },
  commentBox: {
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    padding: RfW(12),
    minHeight: 60,
  },
  commentText: {
    fontSize: 14,
    ...CommonStyles.regularFont400Style,
    color: "#424242",
    lineHeight: 20,
  },
  iconContainer: {
    marginLeft: RfW(8),
  },
  attachmentRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: RfH(12),
    paddingHorizontal: RfW(4),
    width: "100%",
  },
  attachmentContent: {
    flex: 1,
    paddingRight: RfW(16),
  },
  attachmentCTA: {
    width: RfW(50),
    alignItems: "flex-end",
  },
});

export default ProcurementDetails;
