import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Colors, CommonStyles, Images } from "../../theme";
import { BorderRadius, WIDTH } from "../../theme/sizes";
import {
  getColorWithOpacity,
  getDateFormat,
  RfH,
  RfW,
} from "../../utils/helper";
import IconButtonWrapper from "../IconButtonWrapper";

const ApproverDetails = ({ taskItem, details, isDarkMode }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const hasComments = taskItem.comments && taskItem.comments.trim().length > 0;

  return (
    <View>
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
              source={{ uri: "https://via.placeholder.com/50" }}
              style={styles.avatar}
            />
          </View>

          <View style={styles.contentContainer}>
            <View style={styles.infoSection}>
              <View style={styles.nameDesignationContainer}>
                <Text numberOfLines={1} style={styles.name}>
                  {taskItem.displayName || taskItem.name}
                </Text>
                {taskItem.designation && (
                  <Text numberOfLines={1} style={styles.designation}>
                    {taskItem.designation}
                  </Text>
                )}
              </View>
              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor: taskItem.isCompleted
                      ? "#e8f5e9"
                      : "#fff3e0",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    {
                      color: taskItem.isCompleted ? "#2e7d32" : "#ef6c00",
                    },
                  ]}
                >
                  {taskItem.isCompleted ? "APPROVED" : "AWAITING"}
                </Text>
              </View>

              <Text style={styles.time}>
                {getDateFormat(taskItem.completedOn, "MMM-D-YYYY | h:mm A")}
              </Text>
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

        {isExpanded && taskItem.comments && (
          <View style={styles.detailsContainer}>
            <Text style={styles.commentLabel}>Comments</Text>
            <View style={styles.commentBox}>
              <Text style={styles.commentText}>{taskItem.comments}</Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
  designation: {
    fontSize: 12,
    color: "#757575",
    ...CommonStyles.regularFontStyle,
    marginBottom: RfH(4),
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
    fontWeight: "500",
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
    color: "#424242",
    lineHeight: 20,
  },
  iconContainer: {
    marginLeft: RfW(8),
  },
});

export default ApproverDetails;
