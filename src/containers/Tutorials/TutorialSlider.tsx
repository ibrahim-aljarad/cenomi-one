import React from 'react';
import { Image, ImageBackground, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { CustomImage, CustomText } from '../../components';
import AppPrimaryButton from '../../components/AppPrimaryButton';
import { localize } from '../../locale/utils';
import { Colors, CommonStyles, Images } from '../../theme';
import { BorderRadius } from '../../theme/sizes';
import { RfH, RfW } from '../../utils/helper';
import { deviceWidth } from '../../utils/helpers';

const TutorialSlider = (props: any) => {
  const { isDarkMode, bulletsSelectedColor, bulletsUnSelectedColor, onStarted } = props || {};
  const TutorialSlideData = [
    {
      source: Images.tutorial_1,
      title: localize('tutorial.decisionNow'),
      desc: localize('tutorial.takeDecisionNowOnTheGo')
    },
    {
      source: Images.tutorial_1,
      title: localize('tutorial.decisionNow'),
      desc: localize('tutorial.takeDecisionNowOnTheGo')
    },
    {
      source: Images.tutorial_1,
      title: localize('tutorial.decisionNow'),
      desc: localize('tutorial.takeDecisionNowOnTheGo')
    },
    {
      source: Images.tutorial_1,
      title: localize('tutorial.redeemOffersNow'),
      desc: localize('tutorial.redeemExclusivePartnerOfferDesc')
    },
    {
      source: Images.tutorial_1,
      title: localize('tutorial.serviceNow'),
      desc: localize('tutorial.applyManageLeaveMsg')
    },
    {
      source: Images.tutorial_1,
      title: localize('tutorial.serviceNow'),
      desc: localize('tutorial.applyServiceRequestMsg')
    }
  ];

  const DecisionsItems = [
    {
      activeIndex: 0,
      name: localize('tutorial.receiveNotification'),
      icon: Images.receiveNotification
    },
    {
      activeIndex: 1,
      name: localize('tutorial.reviewDetails'),
      icon: Images.reviewDetails
    },
    {
      activeIndex: 2,
      name: localize('tutorial.approveRequest'),
      icon: Images.approveRequest
    }
  ];

  const totalItems = TutorialSlideData.length;

  const renderNextButton = () => {
    return (
      //   <View style={{ justifyContent: 'center' }}>
      <View style={styles.gettingStartedButton}>
        <CustomImage
          image={Images.arrowRightWhite}
          imageWidth={RfW(10)}
          imageHeight={RfH(16)}
          imageResizeMode={'contain'}
          displayLoader={false}
          styling={{
            overflow: 'hidden'
          }}
        />
      </View>
      //   </View>
    );
  };
  const renderSkipButton = () => {
    return (
      <TouchableOpacity onPress={onStarted}>
        <CustomText
          styling={{
            ...CommonStyles.semiboldFontStyle,
            ...styles.skipText,
            color: isDarkMode ? Colors.white : Colors.white
          }}>
          {localize('common.skip')}
        </CustomText>
      </TouchableOpacity>
    );
  };

  const renderSliderItem = ({ item, index }) => {
    return (
      <>
        <View key={index}>
          <ImageBackground height={RfH(388)} source={item.source} resizeMode="cover">
            <Image width={deviceWidth()} height={RfH(388)} style={styles.lotteView} />
          </ImageBackground>
          <View style={styles.heading}>
            <CustomText
              styling={{
                ...CommonStyles.regularFont600Style,
                ...styles.headingBigText,
                color: isDarkMode ? Colors.white : Colors.white
              }}>
              {item.title}
            </CustomText>
            <CustomText
              styling={{
                ...styles.smallText,
                ...CommonStyles.regularFont400Style,
                color: isDarkMode ? Colors.white : Colors.white
              }}>
              {item.desc}
            </CustomText>
          </View>
          {index <= 2 &&
            DecisionsItems.map((element) => {
              return (
                <View
                  style={[
                    {
                      height: RfH(48),
                      flexDirection: 'row',
                      borderRadius: BorderRadius.BR0,
                      marginVertical: RfH(5),
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingRight: RfW(24),
                      paddingLeft: RfW(24)
                    }
                  ]}>
                  <View
                    style={{
                      backgroundColor: Colors.lightPurpleColor,
                      height: RfH(48),
                      width: RfW(48),
                      flexDirection: 'row',
                      borderRadius: BorderRadius.BR0,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                    <CustomImage
                      image={element.icon}
                      imageWidth={RfW(20)}
                      imageHeight={RfH(25)}
                      imageResizeMode={'contain'}
                      displayLoader={false}
                      styling={{
                        overflow: 'hidden'
                      }}
                      tintColor={Colors.black}
                    />
                  </View>

                  <CustomText
                    fontSize={16}
                    // color={index == element.activeIndex ? Colors.app_black : Colors.grayLight}
                    numberOfLines={2}
                    styling={{
                      flex: 1,
                      paddingLeft: RfW(10),
                      ...CommonStyles.regularFont400Style,
                      color:
                        index === element.activeIndex
                          ? isDarkMode
                            ? Colors.white
                            : Colors.white
                          : Colors.grayLight
                    }}>
                    {element.name}
                  </CustomText>
                </View>
              );
            })}
        </View>
        {index === totalItems - 1 && (
          <View style={[{ justifyContent: 'center' }, styles.loginContainer]}>
            <AppPrimaryButton buttonText={localize('common.loginC')} onPress={onStarted} />
          </View>
        )}
      </>
    );
  };

  return (
    <AppIntroSlider
      data={TutorialSlideData || []}
      renderItem={renderSliderItem}
      renderNextButton={renderNextButton}
      renderSkipButton={renderSkipButton}
      activeDotStyle={{ backgroundColor: bulletsSelectedColor }}
      dotStyle={{ backgroundColor: bulletsUnSelectedColor }}
      showSkipButton={true}
      showDoneButton={false}
    />
  );
};

const styles = StyleSheet.create({
  heading: {
    textAlign: 'left',
    width: deviceWidth(),
    paddingHorizontal: RfW(24),
    marginBottom: RfH(15),
    marginTop: RfH(55)
  },
  headingBigText: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'left',
    lineHeight: 30,
    color: Colors.app_black
  },
  smallText: {
    fontSize: 14,
    paddingTop: RfH(5),
    textAlign: 'left',
    opacity: 0.5,
    lineHeight: 20,
    color: Colors.app_black
  },
  lotteView: {
    alignSelf: 'center'
  },
  skipText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
    marginTop: RfH(Platform.OS === 'ios' ? 17 : 11),
    marginLeft: RfW(Platform.OS === 'ios' ? 15 : 10)
  },
  gettingStartedText: {
    fontSize: 14,
    color: Colors.white
  },
  gettingStartedButton: {
    width: RfH(48),
    height: RfH(48),
    backgroundColor: Colors.app_black,
    borderRadius: BorderRadius.BR0,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: RfW(10),
    bottom: RfH(5)
  },
  loginContainer: {
    marginHorizontal: RfW(32),
    position: 'absolute',
    width: deviceWidth() - RfW(64),
    bottom: RfH(82)
  }
});

export default TutorialSlider;
