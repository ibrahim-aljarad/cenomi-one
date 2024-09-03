import React from 'react';
import { Shadow } from 'react-native-shadow-2';
import { RfH, RfW } from '../../../utils/helper';
import { BorderRadius } from '../../../theme/sizes';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { CustomImage, CustomText } from '../../../components';
import { Colors, CommonStyles, Images } from '../../../theme';
import { deviceWidth } from '../../../utils/helpers';

const PendingItemsComponents = (props: any) => {
  const { isDarkMode, onPressOnItem, item } = props || {};
  return (
    <TouchableOpacity
      onPress={() => onPressOnItem(item)}
      activeOpacity={0.9}
      style={{ marginBottom: RfH(15), paddingHorizontal: RfW(24) }}>
      <View
        style={[
          styles.serviceRequestsSectionContainerImage,
          {
            flexDirection: 'row',
            backgroundColor: isDarkMode ? Colors.darkModeButton : Colors.white
          }
        ]}>
        <CustomImage
          image={item?.icon || ''}
          imageHeight={RfH(81)}
          imageWidth={RfW(104)}
          imageResizeMode={'contain'}
        />
        <CustomText
          color={isDarkMode ? Colors.white : Colors.darkPurple}
          fontSize={15}
          numberOfLines={2}
          styling={{
            flex: 1,
            paddingLeft: RfH(20),
            ...CommonStyles.regularFont400Style,
            lineHeight: RfH(16.8)
          }}>
          {item?.name || item?.title || ''}
        </CustomText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  //
  serviceRequestsSectionContainerImage: {
    borderRadius: BorderRadius.BR10,
    paddingLeft: RfW(25),
    paddingRight: RfW(15),
    paddingVertical: RfH(11),
    alignItems: 'center',
    width: deviceWidth() - RfW(48)
  }
});

export default PendingItemsComponents;
