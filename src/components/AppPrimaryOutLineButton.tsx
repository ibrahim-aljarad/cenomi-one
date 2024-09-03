import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Colors, CommonStyles } from '../theme';
import { BorderRadius } from '../theme/sizes';
import { RfH } from '../utils/helper';
import CustomText from './CustomText';
import { createStructuredSelector } from 'reselect';
import { isDarkModeSelector } from '../containers/redux/selectors';
import { useSelector } from 'react-redux';
import CustomImage from './CustomImage';

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector
});

const AppPrimaryOutLineButton = (props: any) => {
  const {
    buttonText,
    width,
    height,
    onPress,
    borderRadius = BorderRadius.BR15,
    icon,
    iconWidth,
    iconHeight
  } = props;
  const { isDarkMode } = useSelector(stateSelector);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          height: height,
          width: width,
          borderRadius: borderRadius,
          borderColor: isDarkMode ? Colors.white : Colors.white
        }
      ]}
      activeOpacity={0.4}
      onPress={onPress}>
      {icon ? (
        <CustomImage
          image={icon}
          imageWidth={iconWidth || 13}
          imageHeight={iconHeight || 13}
          imageResizeMode={'contain'}
          displayLoader={false}
          containerStyling={{ paddingRight: RfH(4) }}
          tintColor={isDarkMode ? Colors.white : Colors.white}
        />
      ) : null}
      <CustomText
        fontSize={14}
        color={isDarkMode ? Colors.white : Colors.white}
        styling={CommonStyles.regularFont400Style}>
        {buttonText}
      </CustomText>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    borderColor: Colors.app_black,
    borderWidth: 1,
    height: RfH(32),
    borderRadius: BorderRadius.BR15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  }
});

export default AppPrimaryOutLineButton;
