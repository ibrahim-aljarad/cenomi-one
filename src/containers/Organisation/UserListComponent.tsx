import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CustomText } from '../../components';
import { Colors, CommonStyles } from '../../theme';
import Config from '../../utils/config';
import { LOCAL_STORAGE_DATA_KEY } from '../../utils/constants';
import { RfH, RfW, getColorWithOpacity } from '../../utils/helper';
import { getSaveData } from '../../utils/helpers';
import ProfileImageSection from '../Home/components/ProfileImageSection';
import { isDarkModeSelector } from '../redux/selectors';

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector
});

const UserListComponent = (props: any) => {
  const {
    item,
    isBorderDisable = false,
    imageSize = RfH(54),
    nameFontSize = 16,
    isShowDepartmentName = false,
    containerStyle = {},
    userToken = '',
    onPressItem
  } = props || {};
  const { isDarkMode } = useSelector(stateSelector);

  const username = item?.username;
  let profilePic =
    userToken && username
      ? `${Config.API_BASE_URL}user/profile-image?token=${userToken}&username=${username}`
      : undefined;

  const profileData = {
    firstName: item?.firstName || item?.displayName,
    lastName: item?.lastName || '',
    photo: profilePic
  };

  const displayName = item?.displayName || `${item?.firstName} ${item?.lastName}`;
  const assignmentName = item?.assignments?.length > 0 ? item?.assignments[0]?.assignmentName : '';
  const departmentName = item?.assignments?.length > 0 ? item?.assignments[0]?.departmentName : '';

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={() => onPressItem && onPressItem()}
        style={[
          styles.birthdayItemContainer,
          !isBorderDisable
            ? { borderColor: getColorWithOpacity(Colors.white, 0.5), borderWidth: RfH(1) }
            : {},
          { backgroundColor: isDarkMode ? Colors.darkModeButton : Colors.transparent },
          containerStyle
        ]}>
        <View style={{ alignItems: 'center' }}>
          <ProfileImageSection
            imageSize={imageSize}
            labelFontSize={18}
            passedProfileData={profileData || ''}
          />
        </View>
        <View style={{ paddingLeft: RfW(14), flex: 1 }}>
          <CustomText
            color={Colors.white}
            numberOfLines={2}
            fontSize={nameFontSize}
            styling={{
              ...CommonStyles.regularFont500Style,
              lineHeight: RfH(20),
              paddingRight: RfH(18)
            }}>
            {displayName || ''}
          </CustomText>
          <CustomText
            fontSize={12}
            color={isShowDepartmentName ? Colors.white : getColorWithOpacity(Colors.white, 0.8)}
            numberOfLines={1}
            styling={{
              ...CommonStyles.regularFont400Style,
              lineHeight: RfH(20),
              paddingRight: RfH(18),
              paddingTop: RfH(3)
            }}>
            {assignmentName || ''}
          </CustomText>
          {isShowDepartmentName ? (
            <CustomText
              fontSize={14}
              color={getColorWithOpacity(Colors.white, 0.8)}
              styling={{
                ...CommonStyles.regularFont400Style,
                lineHeight: RfH(20),
                paddingRight: RfH(18),
                paddingTop: RfH(3)
              }}>
              {departmentName || ''}
            </CustomText>
          ) : null}
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  birthdayItemContainer: {
    padding: RfW(7),
    flexDirection: 'row',
    alignItems: 'center'
  },
  wishHimContainer: {
    alignSelf: 'flex-end',
    borderWidth: RfH(1),
    borderColor: Colors.primary,
    paddingHorizontal: RfW(24),
    paddingTop: RfH(6),
    paddingBottom: RfH(5),
    marginTop: RfH(10)
  }
});

export default UserListComponent;
