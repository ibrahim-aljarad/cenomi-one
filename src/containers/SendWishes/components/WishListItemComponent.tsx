import moment from 'moment';
import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CustomImage, CustomText, CustomWishesModal } from '../../../components';
import { Colors, CommonStyles, Images } from '../../../theme';
import { EMAIL_W1, wisheshCatEnum, wisheshForEnum } from '../../../utils/constants';
import {
  RfH,
  RfW,
  getColorWithOpacity,
  getEmailBytype,
  getWorkHomeMobilePhoneNumber
} from '../../../utils/helper';
import ProfileImageSection from '../../Home/components/ProfileImageSection';
import { isDarkModeSelector } from '../../redux/selectors';
import { localize } from '../../../locale/utils';
import { BorderRadius } from '../../../theme/sizes';

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector
});

const WishListItemComponent = ({ item, selectedCategory, onPressWish }) => {
  const { isDarkMode } = useSelector(stateSelector);

  const darkCard = {
    backgroundColor: isDarkMode
      ? Colors.darkModeButton
      : getColorWithOpacity(Colors.midnightExpress, 0.24),
    borderRadius: BorderRadius.BR15
  };

  const profileData = {
    firstName: item?.first_name,
    lastName: item?.last_name,
    photo: item?.photo
  };

  return (
    <>
      <View style={[styles.birthdayItemContainer, darkCard]}>
        <View style={{ alignItems: 'center' }}>
          <ProfileImageSection
            imageSize={RfH(64)}
            labelFontSize={18}
            passedProfileData={profileData}
          />
          <CustomImage
            image={Images.wish}
            imageHeight={26}
            imageWidth={27}
            styling={{ marginTop: RfH(9) }}
          />
        </View>
        <View style={{ paddingLeft: RfH(10), flex: 1 }}>
          <CustomText
            color={Colors.white}
            numberOfLines={2}
            fontSize={20}
            styling={{
              ...CommonStyles.regularFont500Style,
              lineHeight: RfH(20),
              paddingRight: RfH(18)
            }}>
            {item?.display_name || ''}
          </CustomText>
          <CustomText
            fontSize={16}
            color={getColorWithOpacity(Colors.white, 0.75)}
            styling={{
              ...CommonStyles.regularFont400Style,
              lineHeight: RfH(20),
              paddingRight: RfH(18),
              paddingTop: RfH(4)
            }}>
            {item?.work_relationships[0]?.legalEmployerName}
          </CustomText>

          <Pressable style={styles.wishHimContainer} onPress={() => onPressWish(item)}>
            <CustomText
              fontSize={16}
              color={Colors.white}
              styling={{
                ...CommonStyles.regularFont400Style,
                lineHeight: RfH(19),
                top: RfH(Platform.OS === 'android' ? 2.5 : 0)
              }}>
              {localize(item?.gender === 'F' ? 'wish.wishHer' : 'wish.wishHim')}
            </CustomText>
          </Pressable>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  birthdayItemContainer: {
    backgroundColor: Colors.white,
    padding: RfH(18),
    marginTop: RfH(20),
    flexDirection: 'row',
    marginHorizontal: RfW(24)
  },
  wishHimContainer: {
    alignSelf: 'flex-end',
    borderWidth: RfH(1),
    borderColor: Colors.white,
    paddingHorizontal: RfW(24),
    paddingTop: RfH(6),
    paddingBottom: RfH(5),
    marginTop: RfH(10)
  }
});

export default WishListItemComponent;
