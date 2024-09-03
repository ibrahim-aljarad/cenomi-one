import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { CustomImage, CustomText } from '../../../components';
import { Colors, CommonStyles } from '../../../theme';
import { BorderRadius } from '../../../theme/sizes';
import { RfH, RfW } from '../../../utils/helpers';

const ImageWithTextCard = (props: any) => {
  const { headTitle, title, imagesrc } = props;
  return (
    <View
      style={{
        flex: 1,
        paddingBottom: RfH(15),
        paddingHorizontal: RfW(24)
      }}>
      <CustomText
        fontSize={20}
        color={Colors.app_black}
        styling={{ ...CommonStyles.regularFont400Style }}>
        {headTitle}
      </CustomText>
      <TouchableOpacity
        style={[
          {
            backgroundColor: Colors.white,
            height: RfH(151),
            width: RfW(327),
            flexDirection: 'row',
            flex: 1,
            borderRadius: BorderRadius.BR0,
            marginVertical: RfH(15),
            paddingHorizontal: RfW(8),
            alignItems: 'center'
          },
          CommonStyles.card_elevation
        ]}
        activeOpacity={0.8}
        onPress={() => {}}>
        <CustomImage
          image={imagesrc}
          imageWidth={RfW(172)}
          imageHeight={RfH(128)}
          imageResizeMode={'contain'}
          displayLoader={false}
          styling={{
            overflow: 'hidden',
            borderRadius: BorderRadius.BR0
          }}
        />
        <CustomText
          fontSize={16}
          color={Colors.black}
          numberOfLines={2}
          styling={{ flex: 1, ...CommonStyles.regularFont400Style }}>
          {title}
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default ImageWithTextCard;
