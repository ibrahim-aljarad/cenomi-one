import { useFocusEffect } from "@react-navigation/core";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import PropTypes from "prop-types";
import React from "react";
import { BackHandler, TouchableOpacity, View } from "react-native";
import { Colors, CommonStyles, Images } from "../../theme";
import { RfH, RfW } from "../../utils/helpers";
import CustomText from "../CustomText";
import IconButtonWrapper from "../IconButtonWrapper";
import styles from "./style";
import { isDarkModeSelector } from "../../containers/redux/selectors";
import { useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import CustomImage from "../CustomImage";
import { getItem } from "../../utils/storage";
import { LANGUAGE_KEY } from "../../utils/constants";
import { isRTL } from "../../locale/utils";
import { getColorWithOpacity } from "../../utils/helper";
import { BorderRadius } from "../../theme/sizes";

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector,
});
function HeaderSVG(props) {
  const { isDarkMode } = useSelector(stateSelector);

  const {
    containerStyle,
    containerStyle2,
    isBackButtonVisible,
    onBackPressHandler,
    titleText,
    titleStyle,
    isRightButtonVisible,
    isRightTextVisible,
    rightTextComponent,
    onRightButtonClickHandler,
    titleFont,
    rightIcon,
    rightIconHeight,
    rightIconWidth,
    leftIcon,
    leftIconHeight = RfW(10),
    leftIconWidth = RfW(10),

    isRight2BtnVisible,
    onRight2BtnClick,
    right2Icon,
    right2IconHeight,
    right2IconWidth,
    headerBackgroundColor,
    isBorderRadius,
  } = props;

  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const backFunction = () => {
    if (onBackPressHandler) {
      onBackPressHandler();
    } else {
      navigation.goBack();
    }
    return true;
  };

  useFocusEffect(
    React.useCallback(() => {
      console.log("useCallback>>hardwareBackPress");
      if (isFocused) {
        BackHandler.addEventListener("hardwareBackPress", backFunction);
      }
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", backFunction);
      };
    }, [isFocused])
  );

  const leftIconSection = () => {
    if (leftIcon) {
      return leftIcon;
    } else {
      return isRTL() ? Images.rightArrowNew : Images.leftArrowNew;
    }
  };

  return (
    <View>
      <View
        style={[
          {
            ...styles.headerContainer,
            backgroundColor: isDarkMode
              ? Colors.darkModeBackground
              : headerBackgroundColor,
            ...containerStyle,
            ...containerStyle2,
          },
          isBorderRadius
            ? {
                borderBottomLeftRadius: BorderRadius.BR15,
                borderBottomRightRadius: BorderRadius.BR15,
                // borderWidth: 2,
                // borderColor: Colors.calendarPrimaryColor
              }
            : {},
          // CommonStyles.card_elevation,
        ]}
      >
        {isBackButtonVisible && (
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.leftContainer}
            onPress={backFunction}
          >
            <View
              style={{
                height: RfW(24),
                width: RfW(24),
                borderRadius: RfW(24),
                backgroundColor: getColorWithOpacity(Colors.whiteSmoke, 0.18),
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CustomImage
                image={leftIconSection()}
                imageHeight={leftIconHeight}
                imageWidth={leftIconWidth}
                imageResizeMode={"contain"}
                tintColor={isDarkMode ? Colors.white : Colors.white}
              />
            </View>
          </TouchableOpacity>
        )}

        <CustomText
          numberOfLines={2}
          styling={{
            ...styles.headerText,
            ...titleStyle,
            ...CommonStyles.regularFont500Style,
            lineHeight: RfH(32),
          }}
          fontSize={titleFont}
          color={isDarkMode ? Colors.white : Colors.white}
        >
          {titleText || ""}
        </CustomText>

        <View style={styles.rightContainer}>
          {isRightTextVisible ? (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={onRightButtonClickHandler}
              style={{ paddingVertical: RfH(15), paddingHorizontal: RfW(10) }}
            >
              {/* <CustomText fontSize={16} styling={{ ...CommonStyles.regularFont400Style }}>
                {'Skip'}
              </CustomText> */}
              {rightTextComponent()}
            </TouchableOpacity>
          ) : null}

          {isRightButtonVisible && (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={onRightButtonClickHandler}
              style={{ paddingVertical: RfH(15), paddingHorizontal: RfW(10) }}
            >
              {rightIcon}
            </TouchableOpacity>
          )}

          {isRight2BtnVisible && (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={onRight2BtnClick}
              style={{
                marginLeft: RfW(7),
                paddingVertical: RfH(15),
                paddingHorizontal: RfW(10),
              }}
            >
              {right2Icon}
              {/* <IconButtonWrapper
                iconImage={right2Icon ? right2Icon : Images.search}
                iconWidth={right2IconWidth ? right2IconWidth : RfW(20)}
                iconHeight={right2IconHeight ? right2IconHeight : RfH(20)}
              /> */}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

HeaderSVG.propTypes = {
  containerStyle: PropTypes.any,
  containerStyle2: PropTypes.any,
  isBackButtonVisible: PropTypes.bool,
  onBackPressHandler: PropTypes.func,
  titleText: PropTypes.string.isRequired,
  titleStyle: PropTypes.any,
  isRightButtonVisible: PropTypes.bool,
  isRightTextVisible: PropTypes.bool,
  rightTextComponent: PropTypes.func,
  onRightButtonClickHandler: PropTypes.func,
  titleFont: PropTypes.any,
  rightIcon: PropTypes.any,
  leftIcon: PropTypes.any,
  rightIconHeight: PropTypes.any,
  rightIconWidth: PropTypes.any,
  isRight2BtnVisible: PropTypes.bool,
  onRight2BtnClick: PropTypes.func,
  right2Icon: PropTypes.any,
  right2IconHeight: PropTypes.any,
  right2IconWidth: PropTypes.any,
  headerBackgroundColor: PropTypes.string,
  isBorderRadius: PropTypes.bool,
};

HeaderSVG.defaultProps = {
  containerStyle: {},
  containerStyle2: {},
  isBackButtonVisible: true,
  onBackPressHandler: null,
  titleStyle: {},
  isRightButtonVisible: false,
  isRightTextVisible: false,
  rightTextComponent: null,
  onRightButtonClickHandler: null,
  titleFont: 18,
  isRight2BtnVisible: false,
  onRight2BtnClick: null,
  headerBackgroundColor: Colors.headerBgColor,
  isBorderRadius: true,
};

export default HeaderSVG;
