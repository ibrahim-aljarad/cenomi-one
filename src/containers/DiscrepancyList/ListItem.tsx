import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { CustomImage, CustomText } from '../../components';
import { Colors, CommonStyles, Fonts, Images } from '../../theme';
import { BorderRadius } from '../../theme/sizes';
import { RfH, RfW, getColorWithOpacity, getDateFormat } from '../../utils/helper';
import { CorporateCommCard } from '../Home/components/CorporateCommunication/CorporateCommCard';
import { localize } from '../../locale/utils';

const ListItem = (props: any) => {
  const { isDarkMode, index, item, readItems, onPressItem } = props;

  return (
    <TouchableOpacity
      style={[
        styles.item_con,
        {
          backgroundColor: isDarkMode
            ? Colors.darkModeButton
            : getColorWithOpacity(Colors.midnightExpress, 0.24)
        }
      ]}
      activeOpacity={0.8}
      onPress={() => onPressItem(item)}>
      <View style={{ flex: 1, marginRight: RfW(5), marginTop: RfH(5) }}>
        <CustomText
          fontSize={14}
          numberOfLines={2}
          color={Colors.white}
          styling={{ ...CommonStyles.regularFont500Style, lineHeight: RfH(21) }}>
          {localize('SR. No')}: {item?.service_request_id}
        </CustomText>
        <CustomText
          fontSize={14}
          numberOfLines={2}
          color={Colors.white}
          styling={{ ...CommonStyles.regularFont500Style, lineHeight: RfH(21) }}>
          {localize('discrepancy.mall')}: {item?.payload?.marketing_name}
        </CustomText>
        <CustomText
          fontSize={14}
          numberOfLines={2}
          color={Colors.white}
          styling={{ ...CommonStyles.regularFont500Style, lineHeight: RfH(21) }}>
          {localize('discrepancy.companyName')}: {item?.company_name}
        </CustomText>
        <View style={{ flexDirection: 'row', marginTop: RfH(10), alignItems: 'center' }}>
          <CustomImage
            image={Images.calendarGrey}
            imageHeight={RfH(18)}
            imageWidth={RfH(18)}
            imageResizeMode="contain"
            tintColor={isDarkMode ? Colors.white : Colors.white}
          />
          <CustomText
            fontSize={14}
            numberOfLines={4}
            color={Colors.white}
            styling={{
              ...CommonStyles.regularFont400Style,
              lineHeight: RfH(21),
              marginLeft: RfW(5)
            }}>
            {getDateFormat(item?.created_at)}
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
    // flex: 1,
    // width: '100%',
    marginVertical: RfH(8),
    borderRadius: BorderRadius.BR15,
    paddingHorizontal: RfH(10),
    paddingVertical: RfH(15)
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
  },
  viewMoreContainer: {
    backgroundColor: Colors.darkPurple,
    paddingHorizontal: RfW(13),
    paddingVertical: RfH(4),
    borderRadius: RfW(4),
    marginTop: RfH(11),
    alignSelf: 'flex-start'
  }
});

export default ListItem;
