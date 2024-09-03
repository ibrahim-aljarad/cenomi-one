import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import { CustomImage, CustomText } from '../../../components';
import { Colors, CommonStyles, Images } from '../../../theme';
import { alertBox, RfH, RfW } from '../../../utils/helpers';
import AppPrimaryButton from '../../../components/AppPrimaryButton';
import { BorderRadius } from '../../../theme/sizes';
import { createStructuredSelector } from 'reselect';
import { isDarkModeSelector } from '../../redux/selectors';
import { useSelector } from 'react-redux';

const stateStructure = createStructuredSelector({
  isDarkMode: isDarkModeSelector
});

const TextCard = (props: any) => {
  const { textTitle, textValue, icon } = props;
  const { isDarkMode } = useSelector(stateStructure);
  return (
    <View
      style={[
        {
          backgroundColor: isDarkMode ? Colors.darkModeButton : Colors.white,
          flex: 1,
          borderRadius: BorderRadius.BR0
        },
        CommonStyles.card_elevation_t
      ]}>
      <CustomText
        fontSize={28}
        color={isDarkMode ? Colors.white : Colors.app_black}
        styling={{
          marginLeft: RfW(16),
          paddingTop: RfH(18),
          paddingBottom: RfH(4),
          lineHeight: RfH(22),
          ...CommonStyles.regularFont400Style
        }}>
        {textValue}
      </CustomText>
      <View
        style={[
          {
            backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.iconBgColor,
            flex: 1,
            flexDirection: 'row',
            margin: RfW(4),
            borderBottomLeftRadius: BorderRadius.BR0,
            borderBottomRightRadius: BorderRadius.BR0,
            alignItems: 'center'
          }
        ]}>
        <CustomImage
          image={icon}
          imageWidth={14}
          imageHeight={14}
          imageResizeMode={'contain'}
          displayLoader={false}
          containerStyling={{
            paddingLeft: RfW(12),
            paddingRight: RfW(3)
          }}
          tintColor={isDarkMode ? Colors.white : Colors.app_black}
        />
        <CustomText
          fontSize={16}
          color={isDarkMode ? Colors.white : Colors.app_black}
          styling={{
            lineHeight: RfH(22),
            ...CommonStyles.regularFont400Style
          }}>
          {textTitle}
        </CustomText>
      </View>
    </View>
  );
};

export default TextCard;
