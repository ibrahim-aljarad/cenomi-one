import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { CustomImage, CustomText } from '../../components';
import { Colors, CommonStyles, Images } from '../../theme';
import { BorderRadius } from '../../theme/sizes';
import { RfH, RfW, getDateFormat } from '../../utils/helper';

const ListItem = (props: any) => {
  const { isDarkMode, item, onPressItem } = props;

  const { title = '', publishedDate, imageUrl = '' } = item || {};

  return (
    <TouchableOpacity
      style={[
        styles.item_con,
        { backgroundColor: isDarkMode ? Colors.darkModeButton : Colors.white }
      ]}
      activeOpacity={0.8}
      onPress={() => onPressItem(item)}>
      <CustomImage
        image={imageUrl || ''}
        imageHeight={RfH(100)}
        imageWidth={RfH(90)}
        imageResizeMode={'contain'}
        styling={{ borderRadius: RfW(10), borderWidth: RfH(1), marginRight: RfW(10) }}
      />
      <View style={{ flex: 1, marginRight: RfW(5), marginTop: RfH(5) }}>
        <CustomText
          fontSize={18}
          numberOfLines={3}
          styling={{ ...CommonStyles.regularFont500Style, lineHeight: RfH(21) }}>
          {title}
        </CustomText>
        <View style={{ flexDirection: 'row', marginTop: RfH(10), alignItems: 'center' }}>
          <CustomImage
            image={Images.calendarGrey}
            imageHeight={RfH(20)}
            imageWidth={RfH(20)}
            imageResizeMode="contain"
            tintColor={isDarkMode ? Colors.white : Colors.grey8}
          />
          <CustomText
            fontSize={15}
            color={Colors.grey8}
            styling={{
              ...CommonStyles.regularFont500Style,
              lineHeight: RfH(21),
              marginLeft: RfW(5)
            }}>
            {publishedDate ? getDateFormat(publishedDate) : ''}
          </CustomText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  item: PropTypes.object,
  onPressItem: PropTypes.func,
  isDarkMode: PropTypes.bool
};
ListItem.defaultProps = {
  item: {},
  onPressItem: null,
  isDarkMode: false
};

const styles = StyleSheet.create({
  lisView: {
    backgroundColor: Colors.appBackground,
    flex: 1
  },
  item_con: {
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    marginVertical: RfH(8),
    borderRadius: BorderRadius.BR0,
    paddingHorizontal: RfH(10),
    paddingVertical: RfH(15),
    shadowColor: Colors.platformShadowColor,
    shadowOffset: {
      width: 3,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 1,
    elevation: 5
  },

  progressView: {
    flexDirection: 'row',
    width: '60%',
    flexWrap: 'wrap',
    justifyContent: 'flex-end'
  },
  commItemShadow: {
    justifyContent: 'flex-end',
    paddingHorizontal: RfW(24),
    paddingBottom: RfH(24),
    borderRadius: BorderRadius.BR0
  }
});

export default ListItem;
