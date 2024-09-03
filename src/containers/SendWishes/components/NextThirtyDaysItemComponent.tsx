import React from 'react';
import { View } from 'react-native';
import { CustomText } from '../../../components';
import { Colors, CommonStyles } from '../../../theme';
import { RfH, RfW, getColorWithOpacity } from '../../../utils/helper';
import ProfileImageSection from '../../Home/components/ProfileImageSection';

const NextThirtyDaysItemComponent = ({ item }) => {
  const profileData = {
    firstName: item?.first_name,
    lastName: item?.last_name,
    photo: item?.photo
  };
  return (
    <View style={{ width: RfW(120), alignItems: 'center', marginRight: RfW(20) }}>
      <ProfileImageSection imageSize={RfH(64)} labelFontSize={18} passedProfileData={profileData} />
      <CustomText
        fontSize={20}
        numberOfLines={1}
        color={Colors.white}
        styling={{
          ...CommonStyles.regularFont500Style,
          lineHeight: RfH(19.2),
          paddingTop: RfH(19)
        }}>
        {item?.display_name || ''}
      </CustomText>
      <CustomText
        fontSize={16}
        numberOfLines={1}
        color={getColorWithOpacity(Colors.white, 0.75)}
        styling={{
          ...CommonStyles.regularFont400Style,
          lineHeight: RfH(12),
          paddingTop: RfH(8)
        }}>
        {item?.work_relationships[0]?.legalEmployerName}
      </CustomText>
    </View>
  );
};

export default NextThirtyDaysItemComponent;
