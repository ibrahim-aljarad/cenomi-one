import React from 'react';
import { I18nManager, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Colors, FontSize, Fonts } from '../../theme';
import { RFValue } from 'react-native-responsive-fontsize';
import { STANDARD_SCREEN_SIZE } from '../../constant';
import { createStructuredSelector } from 'reselect';
import { isDarkModeSelector } from '../../containers/redux/selectors';
import { useSelector } from 'react-redux';

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector
});

const CustomText = (props: any) => {
  const {
    fontSize,
    fontWeight,
    fontStyle,
    color,
    styling,
    fontFamily,
    numberOfLines,
    selectable,
    ...restProps
  } = props;

  const { isDarkMode } = useSelector(stateSelector);
  const finalStyle = {
    fontSize: RFValue(fontSize, STANDARD_SCREEN_SIZE),
    fontWeight,
    fontStyle,
    fontFamily,
    color: isDarkMode ? Colors.white : color ? color : Colors.app_black,
    writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
    textAlign: 'left',
    ...styling
  };
  return (
    <Text numberOfLines={numberOfLines} style={finalStyle} selectable={selectable} {...restProps}>
      {props.children}
    </Text>
  );
};
CustomText.propTypes = {
  fontSize: PropTypes.number,
  fontWeight: PropTypes.string,
  fontStyle: PropTypes.string,
  color: PropTypes.string,
  styling: PropTypes.object,
  fontFamily: PropTypes.string,
  children: PropTypes.any,
  numberOfLines: PropTypes.number,
  selectable: PropTypes.bool
};
CustomText.defaultProps = {
  fontSize: FontSize[12],
  color: Colors.black,
  styling: {},
  fontFamily: Fonts.NeoSansArabic,
  numberOfLines: 0,
  selectable: false
};

export default CustomText;
