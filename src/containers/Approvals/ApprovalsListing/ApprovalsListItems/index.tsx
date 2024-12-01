import PropTypes from "prop-types";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { CustomText, IconButtonWrapper } from "../../../../components";
import RequestStatusBadge from "../../../../components/RequestStatusBadge";
import { Colors, CommonStyles, Images } from "../../../../theme";
import { APPROVAL_STATUS } from "../../../../utils/constants";
import { getColorWithOpacity, getDateFormat } from "../../../../utils/helper";
import { RfH, RfW } from "../../../../utils/helpers";
import { getName, isYardiServiceModuleCheck } from "../../serializer";
import styles from "./styles";

const ApprovalsListItems = (props: any) => {
  const { approvalItem, onPress, isDarkMode } = props;
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => onPress(approvalItem)}
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
          fontSize={14}
          color={isDarkMode ? Colors.black : Colors.black}
          styling={{ ...CommonStyles.mediumFontStyle }}
        >
          {isYardiServiceModuleCheck(approvalItem)
            ? approvalItem?.RecordID
            : approvalItem?.heading || approvalItem?.number}
        </CustomText>

        {approvalItem?.state !== APPROVAL_STATUS.INFO_REQUESTED ? (
          <View style={styles.progressView}>
            {/* <IconButtonWrapper
              key={'-'}
              iconImage={Images.person}
              iconWidth={RfW(16)}
              iconHeight={RfH(16)}
              imageResizeMode={'contain'}
              styling={{ marginVertical: RfW(5), marginStart: RfW(5) }}
            /> */}
          </View>
        ) : (
          <>
            <RequestStatusBadge status={approvalItem.state} />
          </>
        )}
      </View>

      <View style={styles.cellContainerView}>
        <View style={styles.rightCellView}>
          <View style={styles.topTitle}>
            <CustomText
              fontSize={16}
              color={isDarkMode ? Colors.black : Colors.black}
              styling={{
                lineHeight: RfH(20),
                ...CommonStyles.regularFont500Style,
              }}
              numberOfLines={4}
            >
              {isYardiServiceModuleCheck(approvalItem)
                ? approvalItem?.Type + ": " + approvalItem?.Workflow_Name
                : approvalItem?.title?.replace(/<\/?[^>]+(>|$)/g, "")}
            </CustomText>
            {isYardiServiceModuleCheck(approvalItem) && (
              <CustomText
                fontSize={14}
                color={isDarkMode ? Colors.black : Colors.black}
                styling={{
                  lineHeight: RfH(20),
                  ...CommonStyles.regularFont400Style,
                }}
                numberOfLines={4}
              >
                {approvalItem?.Property_Name}
              </CustomText>
            )}
            <View
              style={{
                marginTop: RfH(14),
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <IconButtonWrapper
                iconImage={Images.person}
                iconWidth={RfW(14)}
                iconHeight={RfH(14)}
                styling={{
                  tintColor: isDarkMode ? Colors.black : Colors.black,
                }}
                imageResizeMode={"contain"}
              />
              <CustomText
                fontSize={14}
                color={Colors.darkGrey113}
                styling={{
                  marginStart: RfW(5),
                  lineHeight: RfH(20),
                  ...CommonStyles.regularFont400Style,
                }}
              >
                {"From : "}
              </CustomText>
              <CustomText
                fontSize={14}
                color={Colors.black}
                styling={{
                  lineHeight: RfH(20),
                  ...CommonStyles.regularFont400Style,
                }}
              >
                {isYardiServiceModuleCheck(approvalItem)
                  ? approvalItem.Requester_Name
                  : getName(approvalItem)}
              </CustomText>
            </View>
            <View
              style={{
                marginTop: RfH(12),
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <IconButtonWrapper
                iconImage={Images.calendarGrey}
                iconWidth={RfW(14)}
                iconHeight={RfH(14)}
                imageResizeMode={"contain"}
                styling={{
                  tintColor: isDarkMode ? Colors.black : Colors.black,
                }}
              />
              <CustomText
                fontSize={14}
                color={Colors.darkGrey113}
                styling={{
                  marginStart: RfW(5),
                  lineHeight: RfH(20),
                  ...CommonStyles.regularFont400Style,
                }}
              >
                {"Date : "}
              </CustomText>
              <CustomText
                fontSize={14}
                color={Colors.black}
                styling={{
                  lineHeight: RfH(20),
                  ...CommonStyles.regularFont400Style,
                }}
              >
                {getDateFormat(approvalItem?.date || approvalItem?.createdOn)}
              </CustomText>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

ApprovalsListItems.propTypes = {
  approvalItem: PropTypes.object,
  onPress: PropTypes.func,
  isCompleted: PropTypes.bool,
  isDarkMode: PropTypes.bool,
};
ApprovalsListItems.defaultProps = {
  onPress: null,
  approvalItem: {},
  isCompleted: false,
  isDarkMode: false,
};
export default ApprovalsListItems;
