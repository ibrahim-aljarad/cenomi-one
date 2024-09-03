import { AppState, ScrollView, StyleSheet, View } from 'react-native';
import { BIRTHDAY_WISH_MSG, LOTTIE_JSON_FILES } from '../../utils/constants';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Colors, CommonStyles, Images, WIDTH } from '../../theme';
import { EVENT_NAME, trackEvent } from '../../utils/analytics';
import React, { useEffect, useRef, useState } from 'react';
import { RfH, RfW } from '../../utils/helper';
import { callTo, deviceWidth, mailTo, whatsappTo } from '../../utils/helpers';

import AppPrimaryButton from '../AppPrimaryButton';
import AppPrimaryOutLineButton from '../AppPrimaryOutLineButton';
import CustomImage from '../CustomImage';
import CustomText from '../CustomText';
import LottieView from 'lottie-react-native';
import { localize } from '../../locale/utils';

const OthersBirthday = ({ modalInfo, isDarkMode }) => {
  const { data } = modalInfo || {};

  const [activeSlide, setActiveSlide] = useState(0);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const lottieRef = useRef();
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App has come to the foreground!');
        if (lottieRef?.current) {
          lottieRef?.current?.play();
        }
      }
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);
  const phoneSection = (phone) => {
    if (phone) {
      return (
        <AppPrimaryOutLineButton
          height={RfH(48)}
          width={RfW(148)}
          icon={Images.callBlackIcon}
          iconWidth={RfH(13)}
          iconHeight={RfH(13)}
          buttonText={localize('common.callC')}
          onPress={() => {
            //   handleClose();
            trackEvent(EVENT_NAME.BIRTHDAY_WISH_CALL);

            callTo(phone);
          }}
        />
      );
    }

    return null;
  };

  const sendMail = (email) => {
    const subject = 'Birthday Wish';
    const body = BIRTHDAY_WISH_MSG;
    mailTo(email, subject, body);
  };

  const emailSection = (email, phone) => {
    if (email) {
      if (phone) {
        return (
          <AppPrimaryOutLineButton
            height={RfH(48)}
            width={RfW(148)}
            icon={Images.emailBlackIcon}
            iconWidth={RfH(15)}
            iconHeight={RfH(13)}
            buttonText={localize('common.emailC')}
            onPress={() => {
              //   handleClose();
              trackEvent(EVENT_NAME.BIRTHDAY_WISH_EMAIL);
              sendMail(email);
            }}
          />
        );
      } else {
        return (
          <View style={{ paddingTop: RfH(16), flex: 1 }}>
            <AppPrimaryButton
              height={RfH(48)}
              width={RfW(148)}
              icon={Images.emailBlackIcon}
              iconWidth={RfH(15)}
              iconHeight={RfH(13)}
              buttonText={localize('common.emailC')}
              onPress={() => {
                //   handleClose();
                trackEvent(EVENT_NAME.BIRTHDAY_WISH_EMAIL);
                sendMail(email);
              }}
              iconColor={Colors.white}
            />
          </View>
        );
      }
    }

    return null;
  };

  const whatsAppSection = (phone) => {
    if (phone) {
      return (
        <View style={{ paddingHorizontal: RfH(32), paddingTop: RfH(16) }}>
          <AppPrimaryButton
            height={RfH(48)}
            width={RfW(148)}
            icon={Images.whatsappWhiteIcon}
            iconWidth={RfH(15)}
            iconHeight={RfH(13)}
            buttonText={localize('common.whatsappC')}
            onPress={() => {
              //   handleClose();
              trackEvent(EVENT_NAME.BIRTHDAY_WISH_WHATSAPP);

              whatsappTo(phone, BIRTHDAY_WISH_MSG);
            }}
          />
        </View>
      );
    }

    return null;
  };

  const renderSliderItem = ({ item }) => {
    const { name, phone, email } = item || {};
    return (
      <>
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
            ref={lottieRef}
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
              paddingTop: RfH(28)
            }}>
            {localize('wish.wishYourColleagueBirthday')}
          </CustomText>

          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: RfW(32),
              paddingTop: RfH(32),
              justifyContent: 'space-between'
            }}>
            {phoneSection(phone)}
            {emailSection(email, phone)}
          </View>
          {whatsAppSection(phone)}
        </View>
      </>
    );
  };

  if (data && data?.length > 0) {
    return (
      <View style={{}}>
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
        />
      </View>
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

export default OthersBirthday;
