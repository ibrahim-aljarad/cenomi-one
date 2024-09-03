import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import { CustomText } from '../../../components';
import AppPrimaryButton from '../../../components/AppPrimaryButton';
import AppPrimaryOutLineButton from '../../../components/AppPrimaryOutLineButton';
import { Colors, CommonStyles } from '../../../theme';
import { BorderRadius } from '../../../theme/sizes';
import { RfH, RfW } from '../../../utils/helper';
import { localize } from '../../../locale/utils';

const GradeItem = (props: any) => {
  const { item, index, singleTitle } = props;

  return (
    <Shadow
      key={index.toString()}
      startColor={Colors.lightModeShadow}
      offset={[0, RfH(5)]}
      paintInside={true}
      style={{ width: '100%' }}
      containerStyle={{
        marginHorizontal: RfW(8),
        marginBottom: RfH(20)
      }}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {}}
        style={styles.propertyCardContainerImage}>
        <View
          style={{
            marginHorizontal: RfW(24),
            marginVertical: RfH(16)
          }}>
          <AppPrimaryButton
            buttonText={localize('hrRequest.grade2')}
            textColor={Colors.app_black}
            bgColor={Colors.voiletLight}
            isNoElevation={true}
          />

          <CustomText
            color={Colors.app_black}
            fontSize={16}
            styling={{
              marginVertical: RfH(16),
              ...CommonStyles.regularFont400Style
            }}>
            {'Anna Maria Smith'}
          </CustomText>

          <CustomText
            color={Colors.black}
            fontSize={14}
            numberOfLines={1}
            styling={{
              lineHeight: 16,
              marginTop: RfH(3),
              ...CommonStyles.regularFont400Style
            }}>
            {'Female'}
          </CustomText>
          <CustomText
            color={Colors.black}
            fontSize={14}
            numberOfLines={1}
            styling={{
              lineHeight: 16,
              marginTop: RfH(3),
              ...CommonStyles.regularFont400Style
            }}>
            {'Winchester School KSA'}
          </CustomText>

          <View
            style={{
              alignItems: 'center',
              marginTop: RfH(12)
            }}>
            <AppPrimaryOutLineButton
              width={RfW(226)}
              height={RfH(40)}
              borderRadius={BorderRadius.BR0}
              buttonText={localize('hrRequest.requestForClaim')}
            />
          </View>
        </View>
      </TouchableOpacity>
    </Shadow>
  );
};
const styles = StyleSheet.create({
  propertyCardContainerImage: {
    borderRadius: BorderRadius.BR0,
    width: RfW(268),
    backgroundColor: Colors.white
  }
});

export default GradeItem;
