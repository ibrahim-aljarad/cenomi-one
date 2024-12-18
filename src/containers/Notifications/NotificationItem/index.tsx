import PropTypes from 'prop-types';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import styles from './styles';

import { Colors, CommonStyles, Images } from '../../../theme';
import { RfH, RfW, dateFormatFromNow, getColorWithOpacity } from '../../../utils/helper';
import { CustomImage, CustomText, IconButtonWrapper } from '../../../components';
import { isRTL } from '../../../locale/utils';
import { BorderRadius } from '../../../theme/sizes';

const NoticeListItems = (props: any) => {
  const { item, onPress, isDarkMode } = props;
  const isRead = item?.isRead;
  let backgroundColor = '';
  let borderColor = '';

  const darkCard = {
    backgroundColor: isDarkMode
      ? Colors.darkModeButton
      : getColorWithOpacity(Colors.white),
    borderRadius: BorderRadius.BR15
  };

  if (isRead) {
    backgroundColor = isDarkMode ? 'transparent' : Colors.white;
    borderColor = Colors.grayBorder;
  } else {
    backgroundColor = isDarkMode ? 'transparent' : Colors.kudosCardBg;
    borderColor = Colors.white;
  }

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => onPress(item)}
      style={[
        // {
        //   backgroundColor,
        //   borderColor
        // },
        styles.item_con,
        darkCard
      ]}>
      <View style={styles.topTitle}>
        <View style={{ flex: 6 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}>
            {!isRead ? <View style={styles.dotView} /> : <View style={{ width: RfW(6) }} />}
            <CustomText
              fontSize={14}
              color={isDarkMode ? Colors.white : Colors.black}
              styling={{
                lineHeight: RfH(20),
                marginLeft: 8,
                ...CommonStyles.regularFont500Style
              }}>
              {item?.title}
            </CustomText>
          </View>
          <CustomText
            fontSize={12}
            color={isDarkMode ? Colors.white : Colors.black}
            styling={{
              lineHeight: RfH(20),
              marginLeft: 14,
              ...CommonStyles.regularFont400Style
            }}>
            {item.content}
          </CustomText>
          <CustomText
            fontSize={12}
            color={Colors.black}
            styling={{
              lineHeight: RfH(20),
              marginLeft: 14,
              ...CommonStyles.regularFont400Style
            }}>
            {dateFormatFromNow(item.sendOn)}
          </CustomText>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
          <CustomImage
            image={isRTL() ? Images.arrowLeft : Images.arrowRight}
            imageWidth={RfW(8)}
            imageHeight={RfH(13)}
            imageResizeMode={'contain'}
            tintColor={isDarkMode ? Colors.white : Colors.black}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

NoticeListItems.propTypes = {
  item: PropTypes.object,
  onPress: PropTypes.func,
  isCompleted: PropTypes.bool,
  isDarkMode: PropTypes.bool
};
NoticeListItems.defaultProps = {
  onPress: null,
  item: {},
  isCompleted: false,
  isDarkMode: false
};
export default NoticeListItems;
