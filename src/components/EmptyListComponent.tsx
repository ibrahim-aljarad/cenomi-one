import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Colors, CommonStyles } from '../theme';
import { BorderRadius, HEIGHT } from '../theme/sizes';
import { RfH, RfW } from '../utils/helper';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import { deviceHeight } from '../utils/helpers';

const EmptyListComponent = (props: any) => {
  const { errorText, errorSubText, icon, onPress } = props;

  return (
    <View
      style={{
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: RfW(72),
        height: deviceHeight() - RfH(150)
      }}>
      {icon && (
        <CustomImage
          image={icon}
          imageHeight={HEIGHT.H60}
          imageWidth={HEIGHT.H60}
          imageResizeMode={'contain'}
          styling={{ borderRadius: BorderRadius.BR0 }}
        />
      )}
      <CustomText
        fontSize={20}
        color={Colors.white}
        styling={{
          lineHeight: RfH(22),
          paddingTop: RfH(30),
          ...CommonStyles.regularFont500Style
        }}>
        {errorText}
      </CustomText>
      <CustomText
        fontSize={12}
        color={Colors.app_black}
        styling={{
          lineHeight: RfH(22),
          paddingTop: RfH(6),
          textAlign: 'center',
          ...CommonStyles.regularFont400Style
        }}>
        {errorSubText}
      </CustomText>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    height: RfH(48),
    borderRadius: BorderRadius.BR0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default EmptyListComponent;
