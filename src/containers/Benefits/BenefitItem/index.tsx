import { Colors, CommonStyles } from '../../../theme';
import { Image, ImageBackground, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RfH, RfW, getColorWithOpacity, getImageUrl } from '../../../utils/helper';

import { BorderRadius } from '../../../theme/sizes';
import { CustomImage, CustomText } from '../../../components';
import PropTypes from 'prop-types';
import { SCREEN_WIDTH } from '../../../constant';
import { isEmpty } from 'lodash';
import styles from './styles';
import { LinearGradient } from 'react-native-linear-gradient';

// const ITEM_WIDTH = SCREEN_WIDTH * 0.9;
// const ITEM_HEIGHT = (SCREEN_WIDTH * 0.9) / 1.3625;

const ITEM_WIDTH = RfW(327);
const ITEM_HEIGHT = RfH(240);

const BenefitItem = (props: any) => {
  const { clientBenefitsItem, onPressItem } = props;
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
  const imageSource = { uri: getImageUrl(clientBenefitsItem?.cardImages?.mobileImage?.url) };
  useEffect(() => {
    if (imageSource) {
      Image.getSize(imageSource.uri, (width, height) => {
        setImageWidth(width);
        setImageHeight(height);
      });
    }
  }, [imageSource]);

  // const viewAspectRatio = 16 / 9; // Set the desired aspect ratio of the view
  // const imageAspectRatio = imageWidth / imageHeight;
  const imageStyle = {
    width: '100%',
    height: ITEM_HEIGHT
  };

  return (
    !isEmpty(imageSource) && (
      <TouchableOpacity
        style={{
          width: ITEM_WIDTH,
          marginTop: RfH(20),
          height: ITEM_HEIGHT, // Set the desired aspect ratio of the view,
          borderRadius: BorderRadius.BR12
        }}
        activeOpacity={0.8}
        onPress={() => onPressItem(clientBenefitsItem)}>
        <ImageBackground
          style={imageStyle}
          imageStyle={{
            ...imageStyle,
            borderRadius: BorderRadius.BR12
          }}
          resizeMode="cover"
          onError={() => {}}
          onLoadEnd={() => {}}
          onLoadStart={() => {}}
          source={imageSource}>
          <LinearGradient
            style={{ flex: 1, height: RfH(140), borderRadius: BorderRadius.BR12 }}
            locations={[0.5, 1]}
            colors={[
              getColorWithOpacity(Colors.midnightExpress, 0.1),
              getColorWithOpacity(Colors.midnightExpress, 1)
            ]}>
            <View style={styles.titleSubTitleContainer}>
              <CustomText
                fontSize={12}
                color={Colors.white}
                numberOfLines={1}
                styling={{
                  lineHeight: 14,
                  ...CommonStyles.regularFont500Style,
                  marginLeft: RfW(16),
                  marginBottom: RfH(12)
                }}>
                {clientBenefitsItem?.subtitle}
              </CustomText>
              <View style={styles.titleContainer}>
                <CustomText
                  fontSize={18}
                  color={Colors.darkPurple}
                  numberOfLines={1}
                  styling={{
                    paddingTop: RfH(8),
                    lineHeight: 21,
                    ...CommonStyles.regularFont500Style
                  }}>
                  {clientBenefitsItem?.title}
                </CustomText>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    )
  );
};

BenefitItem.propTypes = {
  clientBenefitsItem: PropTypes.object,
  onPressItem: PropTypes.func
};
BenefitItem.defaultProps = {
  clientBenefitsItem: {},
  onPressItem: null
};
export default BenefitItem;
