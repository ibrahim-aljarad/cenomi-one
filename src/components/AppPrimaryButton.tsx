import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Colors, CommonStyles } from '../theme';
import { BorderRadius } from '../theme/sizes';
import { RfH } from '../utils/helper';
import CustomText from './CustomText';
import CustomImage from './CustomImage';

const AppPrimaryButton = (props: any) => {
  const {
    buttonText,
    onPress,
    bgColor,
    textColor,
    isNoElevation,
    icon,
    iconWidth,
    iconHeight,
    iconColor,
    disabled = false,
    containerStyle = {},
    allowFontScaling = true
  } = props;

  // const imageProps = {
  //   image: {icon},
  //         imageWidth:{iconWidth || 13},
  //         imageHeight:{iconHeight || 13},
  //         imageResizeMode:{'contain'},
  //         displayLoader:{false},
  //         containerStyling:{{ paddingRight: RfH(4) }},
  //         tintColor:{iconColor ? iconColor : ''}
  // }

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isNoElevation ? {} : CommonStyles.card_elevation,
        { backgroundColor: bgColor ? bgColor : Colors.darkPurple, opacity: disabled ? 0.5 : 1 },
        containerStyle
      ]}
      activeOpacity={0.4}
      disabled={disabled}
      onPress={onPress}>
      {icon ? (
        <CustomImage
          image={icon}
          imageWidth={iconWidth || 13}
          imageHeight={iconHeight || 13}
          imageResizeMode={'contain'}
          displayLoader={false}
          containerStyling={{ paddingRight: RfH(4) }}
          tintColor={iconColor ? iconColor : ''}
        />
      ) : null}
      <CustomText
        allowFontScaling={allowFontScaling}
        fontSize={15}
        color={textColor ? textColor : Colors.white}
        styling={CommonStyles.regularFont400Style}>
        {buttonText}
      </CustomText>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.app_black,
    height: RfH(50),
    borderRadius: BorderRadius.BR15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  }
});

export default AppPrimaryButton;
