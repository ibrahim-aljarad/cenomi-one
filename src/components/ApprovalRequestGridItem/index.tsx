import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors, CommonStyles } from '../../theme';

import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getApprovalTasksCountLoadingSelector } from '../../containers/Approvals/redux/selectors';
import { isDarkModeSelector } from '../../containers/redux/selectors';
import { BorderRadius } from '../../theme/sizes';
import { RfW } from '../../utils/helper';
import { RfH } from '../../utils/helpers';
import CustomBadge from '../CustomBadge';
import CustomImage from '../CustomImage';
import CustomText from '../CustomText';

const stateSelector = createStructuredSelector({
  approvalTasksCountDataLoading: getApprovalTasksCountLoadingSelector,
  isDarkMode: isDarkModeSelector
});

function ApprovalRequestGridItem(props) {
  const { approvalTasksCountDataLoading, isDarkMode } = useSelector(stateSelector);

  const {
    onPress,
    iconHeight,
    iconWidth,
    text,
    icon,
    badgeCount,
    loading = false,
    customTextstyle,
    item
  } = props;
  return (
    <View
      style={{
        alignItems: 'flex-start',
        width: '90%',
        flex: 1
      }}>
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity
          style={{
            backgroundColor: isDarkMode ? Colors.darkModeButton : Colors.white,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: BorderRadius.BR10,
            height: RfH(60),
            width: RfH(60)
          }}
          onPress={() => onPress(item)}
          activeOpacity={0.75}>
          <View style={styles.badge}>
            <CustomBadge
              loading={loading || approvalTasksCountDataLoading}
              count={badgeCount}
              isDarkMode={isDarkMode}
            />
          </View>
          <View
            style={{
              height: RfH(48),
              width: RfH(48),
              borderRadius: BorderRadius.BR0,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
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
          </View>
        </TouchableOpacity>
        <CustomText
          color={isDarkMode ? Colors.white : Colors.white}
          fontSize={12}
          numberOfLines={2}
          styling={{
            marginTop: RfH(12),
            justifyContent: 'center',
            textAlign: 'center',
            width: RfH(95),
            ...CommonStyles.regularFont500Style
            // ...customTextstyle
          }}>
          {text}
        </CustomText>
      </View>
    </View>
  );
}

ApprovalRequestGridItem.propTypes = {
  onPress: PropTypes.func,
  iconHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  iconWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  text: PropTypes.string,
  icon: PropTypes.any,
  loading: PropTypes.bool,
  customTextstyle: PropTypes.object
};

ApprovalRequestGridItem.defaultProps = {
  onPress: () => {},
  iconHeight: 60,
  iconWidth: 60,
  text: '',
  loading: false,
  customTextstyle: {}
};
const styles = StyleSheet.create({
  badge: {
    height: RfH(22),
    width: RfH(22),
    borderRadius: RfH(22) / 2,
    top: RfH(4),
    left: RfH(50),
    position: 'absolute',
    // backgroundColor: Colors.badge_bg,
    justifyContent: 'center',
    alignItems: 'center',
    // shadowOffset: {width: 2, height: 3},
    // shadowOpacity: 8,
    // shadowColor: Colors.platformShadowColor,
    // shadowRadius: 8,
    // elevation: 5,
    zIndex: 9999,
    paddingHorizontal: RfW(1)
  },

  notificationBadge: {
    top: -10
  }
});

export default ApprovalRequestGridItem;
