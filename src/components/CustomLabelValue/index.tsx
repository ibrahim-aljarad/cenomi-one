import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors, CommonStyles } from '../../theme';
import { RfH, RfW } from '../../utils/helper';
import CustomText from '../CustomText';

const CustomLabelValue = (props: any) => {
  const { label, value, containerStyle } = props || {};
  return (
    <View style={containerStyle ? containerStyle : styles.container}>
      <CustomText
        fontSize={12}
        styling={{
          ...CommonStyles.regularFont400Style,
          lineHeight: RfH(16),
          paddingBottom: RfH(5),
          color: Colors.grayTwo
        }}>
        {label || 'Label'}
      </CustomText>
      <CustomText
        fontSize={16}
        styling={{
          ...CommonStyles.regularFont400Style,
          lineHeight: RfH(22),
          color: Colors.grayTwo
        }}>
        {value || 'Value'}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: RfW(24),
    paddingTop: RfH(20)
  }
});

export default CustomLabelValue;
