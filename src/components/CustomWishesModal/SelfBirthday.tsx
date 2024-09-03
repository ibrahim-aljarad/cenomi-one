import React from 'react';
import { StyleSheet, View } from 'react-native';
import CustomImage from '../CustomImage';
import { Colors, CommonStyles, Images, WIDTH } from '../../theme';
import { RfH, RfW } from '../../utils/helper';
import CustomText from '../CustomText';
import { localize } from '../../locale/utils';
import LottieView from 'lottie-react-native';
import { LOTTIE_JSON_FILES } from '../../utils/constants';

const SelfBirthday = ({ modalInfo, isDarkMode }) => {
  const { name } = modalInfo || {};
  return (
    <View
      style={{
        paddingTop: RfH(50),
        backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.primaryContainerColor
      }}>
      {/* <CustomImage
        image={Images.birthdayWishIcon}
        imageWidth={374}
        imageHeight={268}
        imageResizeMode={'contain'}
        displayLoader={false}
        containerStyling={{ alignItems: 'center' }}
      />

      <CustomImage
        image={Images.birthdayCackeIcon}
        imageWidth={80}
        imageHeight={80}
        imageResizeMode={'contain'}
        displayLoader={false}
        containerStyling={{ alignItems: 'center', paddingTop: RfH(5) }}
      /> */}
      <LottieView
        style={styles.lottieView}
        source={
          // isDarkMode ? LOTTIE_JSON_FILES.loaderDarkModeJson : LOTTIE_JSON_FILES.loaderJson
          LOTTIE_JSON_FILES.birthdayJson
        }
        resizeMode="contain"
        loop={true}
        autoPlay
      />

      <CustomText
        fontSize={22}
        styling={{
          ...CommonStyles.regularFont500Style,
          textAlign: 'center',
          lineHeight: RfH(26),
          paddingTop: RfH(3)
        }}>
        {name || ''}
      </CustomText>

      <CustomText
        fontSize={16}
        styling={{
          ...CommonStyles.regularFont400Style,
          textAlign: 'center',
          lineHeight: RfH(19),
          paddingTop: RfH(30)
        }}>
        {localize('wish.wishYourBirthdayTitle')}
      </CustomText>

      <CustomText
        fontSize={14}
        styling={{
          ...CommonStyles.regularFont400Style,
          textAlign: 'center',
          lineHeight: RfH(22),
          paddingTop: RfH(30),
          paddingHorizontal: RfW(73)
        }}>
        {localize('wish.wishYourBirthdayDesc')}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  lottieView: {
    height: WIDTH.W280,
    width: WIDTH.W280,
    alignSelf: 'center'
  }
});

export default SelfBirthday;
