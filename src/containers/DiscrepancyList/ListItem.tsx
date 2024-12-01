import PropTypes from "prop-types";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { CustomImage, CustomText } from "../../components";
import { Colors, CommonStyles, Images } from "../../theme";
import { BorderRadius } from "../../theme/sizes";
import {
  RfH,
  RfW,
  getColorWithOpacity,
  getDateFormat,
} from "../../utils/helper";
import { isArabic, localize } from "../../locale/utils";
import {
  APPROVER_STATUS_COLORS,
  formatStatus,
  getApproverInitials,
  getApproverStatusStyle,
  getSortedOperations,
  getStatusStyle,
  STATUS_COLORS,
} from "./util";
import ApproverModal from "../../components/ApproverModal";

const ListItem = (props: any) => {
  const { isDarkMode, item, onPressItem } = props;
  const [selectedOperation, setSelectedOperation] = useState(null);

  const handleApproverPress = (operation) => {
    setSelectedOperation(operation);
  };

  const sortedOperations = getSortedOperations(item?.operations);

  const marketingName =
    isArabic() && item?.payload?.marketing_name_arabic
      ? item?.payload?.marketing_name_arabic
      : item?.payload?.marketing_name;

  return (
    <>
      <TouchableOpacity
        style={[
          styles.item_con,
          {
            backgroundColor: isDarkMode
              ? Colors.darkModeButton
              : getColorWithOpacity(Colors.midnightExpress, 0.24),
          },
        ]}
        activeOpacity={0.8}
        onPress={() => onPressItem(item)}
      >
        <View style={{ flex: 1, marginRight: RfW(5), marginTop: RfH(5) }}>
          <CustomText
            fontSize={14}
            numberOfLines={2}
            color={Colors.white}
            styling={{
              ...CommonStyles.regularFont500Style,
              lineHeight: RfH(21),
            }}
          >
            {localize("SR. No")}: {item?.service_request_id}
          </CustomText>
          <CustomText
            fontSize={14}
            numberOfLines={2}
            color={Colors.white}
            styling={{
              ...CommonStyles.regularFont500Style,
              lineHeight: RfH(21),
            }}
          >
            {localize("discrepancy.title")}: {item?.title}
          </CustomText>
          <CustomText
            fontSize={14}
            numberOfLines={2}
            color={Colors.white}
            styling={{
              ...CommonStyles.regularFont500Style,
              lineHeight: RfH(21),
            }}
          >
            {localize("discrepancy.mall")}: {marketingName}
          </CustomText>
          {sortedOperations && sortedOperations.length > 0 && (
            <View style={styles.approversContainer}>
              <CustomText
                fontSize={14}
                color={Colors.white}
                styling={{
                  ...CommonStyles.boldFontStyle,
                  marginBottom: RfH(8),
                }}
              >
                {localize("discrepancy.approvers")}
              </CustomText>
              <View style={styles.approversList}>
                {sortedOperations?.map((operation, index) => (
                  <TouchableOpacity
                    key={operation.service_request_operation_id}
                    onPress={() => handleApproverPress(operation)}
                    style={[
                      styles.approverItem,
                      index > 0 && { marginLeft: RfW(8) },
                    ]}
                  >
                    <View
                      style={[
                        styles.approverAvatar,
                        getApproverStatusStyle(operation.status),
                      ]}
                    >
                      <CustomText
                        fontSize={10}
                        color={
                          APPROVER_STATUS_COLORS[operation.status]?.border ||
                          "#757575"
                        }
                        styling={CommonStyles.regularFont500Style}
                      >
                        {getApproverInitials(operation.assigned_role)}
                      </CustomText>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          <View style={[styles.statusPill, getStatusStyle(item?.status)]}>
            <CustomText
              fontSize={12}
              color={STATUS_COLORS[item?.status]?.border || "#7716FF"}
              styling={CommonStyles.regularFont500Style}
            >
              {formatStatus(item?.status)}
            </CustomText>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: RfH(10),
              alignItems: "center",
            }}
          >
            <CustomImage
              image={Images.calendarGrey}
              imageHeight={RfH(18)}
              imageWidth={RfH(18)}
              imageResizeMode="contain"
              tintColor={isDarkMode ? Colors.white : Colors.white}
            />
            <CustomText
              fontSize={14}
              numberOfLines={4}
              color={Colors.white}
              styling={{
                ...CommonStyles.regularFont400Style,
                lineHeight: RfH(21),
                marginLeft: RfW(5),
              }}
            >
              {getDateFormat(item?.created_at)}
            </CustomText>
          </View>
        </View>
      </TouchableOpacity>

      <ApproverModal
        visible={!!selectedOperation}
        onClose={() => setSelectedOperation(null)}
        operation={selectedOperation}
      />
    </>
  );
};

ListItem.propTypes = {
  item: PropTypes.object,
  onPressItem: PropTypes.func,
  isDarkMode: PropTypes.bool,
};
ListItem.defaultProps = {
  item: {},
  onPressItem: null,
  isDarkMode: false,
};

const styles = StyleSheet.create({
  lisView: {
    backgroundColor: Colors.appBackground,
    flex: 1,
  },
  item_con: {
    flexDirection: "row",
    marginVertical: RfH(8),
    borderRadius: BorderRadius.BR15,
    paddingHorizontal: RfH(10),
    paddingVertical: RfH(15),
  },

  progressView: {
    flexDirection: "row",
    width: "60%",
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },
  commItemShadow: {
    justifyContent: "flex-end",
    paddingHorizontal: RfW(24),
    paddingBottom: RfH(24),
    borderRadius: BorderRadius.BR0,
  },
  viewMoreContainer: {
    backgroundColor: Colors.darkPurple,
    paddingHorizontal: RfW(13),
    paddingVertical: RfH(4),
    borderRadius: RfW(4),
    marginTop: RfH(11),
    alignSelf: "flex-start",
  },
  statusPill: {
    alignSelf: "flex-start",
    paddingHorizontal: RfW(12),
    paddingVertical: RfH(4),
    borderRadius: RfH(12),
    borderWidth: 1,
    backgroundColor: getColorWithOpacity("#7716FF", 0.1),
  },
  approversContainer: {
    marginTop: RfH(5),
  },
  approversList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  approverItem: {
    alignItems: "center",
    marginBottom: RfH(8),
  },
  approverAvatar: {
    width: RfH(30),
    height: RfH(30),
    borderRadius: RfH(15),
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ListItem;
