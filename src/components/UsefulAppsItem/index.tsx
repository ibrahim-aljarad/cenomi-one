import PropTypes from 'prop-types';
import React from 'react';
import { Linking, TouchableOpacity, View } from 'react-native';
import { Colors, CommonStyles } from '../../theme';
import { BorderRadius } from '../../theme/sizes';
import { EVENT_NAME, trackEvent } from '../../utils/analytics';
import { RfH } from '../../utils/helpers';
import CustomImage from '../CustomImage';
import CustomText from '../CustomText';
import { createStructuredSelector } from 'reselect';
import { useSelector } from 'react-redux';
import { isDarkModeSelector } from '../../containers/redux/selectors';

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector
});

function UsefulAppsItem(props) {
  const { isDarkMode } = useSelector(stateSelector);

  const { source, iconHeight, iconWidth, text, website, icon, loading = false, isFromHome } = props;

  return (
    <View
      style={{
        alignItems: 'center',
        width: '100%',
        flex: 1,
        marginBottom: RfH(isFromHome ? 20 : 33)
      }}>
      <TouchableOpacity
        style={{
          backgroundColor: isDarkMode ? Colors.darkModeButton : Colors.white,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: BorderRadius.BR10,
          height: RfH(60),
          width: RfH(60),
          ...CommonStyles.card_elevation
        }}
        onPress={() => {
          if (source === 'homepage') {
            trackEvent(EVENT_NAME.PRESSED_USEFUL_APPS_FROM_HOME);
          } else {
            trackEvent(EVENT_NAME.PRESSED_USEFUL_APPS_FROM_MODAL);
          }
          website ? Linking.openURL(website) : {};
        }}
        activeOpacity={0.75}>
        <CustomImage
          image={icon}
          imageWidth={iconWidth}
          imageHeight={iconHeight}
          imageResizeMode={'contain'}
          displayLoader={false}
          styling={{ borderRadius: BorderRadius.BR0 }}
          containerStyling={{
            paddingVertical: 8.5,
            paddingHorizontal: 8.5
          }}
        />
      </TouchableOpacity>
      <CustomText
        color={isDarkMode ? Colors.white : Colors.white}
        fontSize={14}
        numberOfLines={2}
        styling={{
          marginTop: RfH(10),
          justifyContent: 'center',
          textAlign: 'center',
          ...CommonStyles.regularFont400Style,
          width: '90%'
        }}>
        {text}
      </CustomText>
    </View>
  );
}

UsefulAppsItem.propTypes = {
  iconHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  iconWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  text: PropTypes.string,
  website: PropTypes.string,
  source: PropTypes.string,
  icon: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  isFromHome: PropTypes.bool
};

UsefulAppsItem.defaultProps = {
  iconHeight: 60,
  iconWidth: 60,
  text: '',
  website: '',
  loading: false,
  source: '',
  isFromHome: false
};

export default UsefulAppsItem;
