import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CommonStyles } from '../../theme';
import { RfH, RfW } from '../../utils/helper';
import CustomText from '../CustomText';

const CustomLabelHeading = (props: any) => {
  const { headingText, containerStyle = {} } = props || {};
  return (
    <View style={{ ...styles.container, ...containerStyle }}>
      <CustomText
        fontSize={20}
        styling={{ ...CommonStyles.regularFont400Style, lineHeight: RfH(22) }}>
        {headingText || ''}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: RfW(24),
    paddingBottom: RfH(15),
    borderBottomWidth: RfW(1),
    borderBottomColor: 'rgba(164, 177, 182, 0.25)'
  }
});

export default CustomLabelHeading;
