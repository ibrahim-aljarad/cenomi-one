import React from "react";
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
import { localize } from "../../locale/utils";
import {
  formatStatus,
  getStatusStyle,
  STATUS_COLORS,
} from "../DiscrepancyList/util";
import { ListItemProps } from "./type";

const ListItem = (props: any) => {
  const { isDarkMode, item, onPressItem } = props;
  return (
    <>
      <TouchableOpacity
        style={[
          styles.item_con,
          {
            backgroundColor: isDarkMode ? Colors.darkModeButton : Colors.white,
          },
        ]}
        activeOpacity={0.8}
        onPress={() => onPressItem(item)}
      >
        <View style={{ flex: 1, marginRight: RfW(5), marginTop: RfH(5) }}>
          <CustomText
            fontSize={14}
            numberOfLines={2}
            color={isDarkMode ? Colors.black : Colors.black}
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
            color={isDarkMode ? Colors.black : Colors.black}
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
            color={isDarkMode ? Colors.black : Colors.black}
            styling={{
              ...CommonStyles.regularFont500Style,
              lineHeight: RfH(21),
            }}
          >
            {localize("discrepancy.mall")}: {item?.payload?.marketing_name}
          </CustomText>
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
              tintColor={isDarkMode ? Colors.white : Colors.black}
            />
            <CustomText
              fontSize={14}
              numberOfLines={4}
              color={isDarkMode ? Colors.black : Colors.black}
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
    </>
  );
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
