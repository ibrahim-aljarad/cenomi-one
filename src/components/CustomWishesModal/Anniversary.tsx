import React, { useState } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import CustomImage from '../CustomImage';
import { Colors, CommonStyles, HEIGHT, Images, WIDTH } from '../../theme';
import { RfH, RfW } from '../../utils/helper';
import CustomText from '../CustomText';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { deviceWidth } from '../../utils/helpers';
import { localize } from '../../locale/utils';
import LottieView from 'lottie-react-native';
import { LOTTIE_JSON_FILES } from '../../utils/constants';

const Anniversary = ({ modalInfo, isDarkMode }) => {
  const { data } = modalInfo || {};
  const [isOpenedGift, setIsOpenedGift] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  // const totalBirthdayList = ['', '', '', ''];

  const renderSliderItem = ({ item }) => {
    return (
      <View
        style={{
          paddingTop: RfH(20),
          backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.primaryContainerColor
        }}>
        {/* <CustomImage
          image={isOpenedGift ? Images.openedGiftIcon : Images.birthdayGiftIcon}
          imageWidth={isOpenedGift ? 356 : 182}
          imageHeight={isOpenedGift ? 385 : 216}
          imageResizeMode={'contain'}
          displayLoader={false}
          containerStyling={{ alignItems: 'center', alignSelf: 'center' }}
          submitFunction={() => {
            setIsOpenedGift(true);
          }}
        /> */}

        <LottieView
          style={[
            styles.lottieView,
            Platform.OS === 'ios'
              ? { height: HEIGHT.H200, width: HEIGHT.H200, marginBottom: RfH(20) }
              : {}
          ]}
          source={
            // isDarkMode ? LOTTIE_JSON_FILES.loaderDarkModeJson : LOTTIE_JSON_FILES.loaderJson
            LOTTIE_JSON_FILES.workAnniversaryJson
          }
          resizeMode="contain"
          loop={true}
          autoPlay
        />

        <CustomText
          fontSize={14}
          styling={{
            ...CommonStyles.regularFont400Style,
            //   textAlign: 'center',
            lineHeight: RfH(22),
            paddingTop: RfH(3),
            paddingHorizontal: RfW(26)
          }}>
          {`${localize('common.dear')} ${item?.name},\n\n${localize(
            'wish.congrateTodayMarkYour'
          )} ${item?.workPeriod} ${localize('wish.anniversaryMessage')}`}
        </CustomText>
      </View>
    );
  };

  if (data && data?.length > 0) {
    return (
      <>
        <ScrollView>
          <View style={{ paddingBottom: RfH(100) }}>
            <Carousel
              data={data}
              renderItem={renderSliderItem}
              sliderWidth={deviceWidth()}
              itemWidth={deviceWidth()}
              onSnapToItem={(index) => setActiveSlide(index)}
            />
          </View>
        </ScrollView>

        <Pagination
          dotsLength={data?.length}
          activeDotIndex={activeSlide}
          containerStyle={{
            //   backgroundColor: 'rgba(0, 0, 0, 0.25)',
            position: 'absolute',
            bottom: RfH(60),
            justifyContent: 'center',
            alignSelf: 'center'
          }}
          dotStyle={{
            width: RfH(15),
            height: RfH(15),
            borderRadius: RfH(10),
            marginHorizontal: -RfH(5),
            backgroundColor: '#1D1237'
          }}
          inactiveDotStyle={{
            width: RfH(20),
            height: RfH(20),
            borderRadius: RfH(10),
            marginHorizontal: -RfH(5),
            backgroundColor: '#000'
          }}
          // inactiveDotOpacity={0.05}
          // inactiveDotScale={0.6}
        />
      </>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  lottieView: {
    height: WIDTH.W280,
    width: WIDTH.W280,
    alignSelf: 'center'
  }
});

export default Anniversary;
