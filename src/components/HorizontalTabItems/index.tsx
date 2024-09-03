import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Colors, CommonStyles } from "../../theme";
import { BorderRadius } from "../../theme/sizes";
import { RfW, getColorWithOpacity } from "../../utils/helper";
import { RfH } from "../../utils/helpers";
import CustomText from "../CustomText";
import { localize } from "../../locale/utils";

interface PropTypes {
  containerStyle: object;
  isDarkMode: boolean;
  isSelectedItem: boolean;
  item: { isSelect: boolean; isVisible: boolean; name: string; value: string };
  onPress: (item: { isSelect: boolean; name: string; value: string }) => void;
}

function HorizontalTabItems(props: PropTypes) {
  const { onPress, item, isDarkMode, containerStyle = {} } = props;
  const isSelect = item?.isSelect;
  const isVisible = item?.isVisible || true;
  return isVisible ? (
    <TouchableOpacity
      onPress={() => {
        onPress(item);
      }}
      style={[
        {
          backgroundColor: isSelect
            ? Colors.darkPurple
            : isDarkMode
            ? Colors.darkModeBackground
            : getColorWithOpacity(Colors.midnightExpress, 0.24),
          // borderColor: isSelect ? Colors.primary : isDarkMode ? Colors.white : Colors.app_black
        },
        styles.categoryView,
        containerStyle,
      ]}
    >
      <CustomText
        fontSize={14}
        color={
          isSelect ? Colors.white : isDarkMode ? Colors.white : Colors.white
        }
        styling={
          isSelect
            ? CommonStyles.regularFont500Style
            : CommonStyles.regularFont400Style
        }
      >
        {localize(item?.name)}
      </CustomText>
    </TouchableOpacity>
  ) : null;
}

HorizontalTabItems.propTypes = {
  onPress: PropTypes.func,
  item: PropTypes.object,
  isDarkMode: PropTypes.bool,
  isSelectedItem: PropTypes.bool,
  containerStyle: PropTypes.object,
};

HorizontalTabItems.defaultProps = {
  onPress: null,
  item: {},
  isDarkMode: false,
  isSelectedItem: false,
  containerStyle: {},
};
const styles = StyleSheet.create({
  categoryView: {
    height: RfH(31),
    borderRadius: BorderRadius.BR5,
    marginHorizontal: RfW(5),
    paddingHorizontal: RfW(15),
    // borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HorizontalTabItems;
