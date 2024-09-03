// TODO: Page not in used

import type { PropsWithChildren } from 'react';
import React, { useRef, useState } from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { CustomImage, CustomText } from '../../components';
import AppPrimaryButton from '../../components/AppPrimaryButton';
import { localize } from '../../locale/utils';
import { Colors, CommonStyles, Images } from '../../theme';
import COLORS from '../../theme/colors';
import { BorderRadius } from '../../theme/sizes';
import { RfH, RfW, deviceWidth } from '../../utils/helpers';

type TutorialCarouselProps = PropsWithChildren<{
  items: { title: string; desc: string; source: string }[];
  bulletsSelectedColor: string;
  bulletsUnSelectedColor: string;
  onStarted: () => void;
  autoScroll: boolean;
  bulletsMargin: number;
  isDarkMode: boolean;
}>;

function TutorialCarousel({
  items,
  DecisionsItems,
  bulletsSelectedColor,
  bulletsUnSelectedColor,
  onStarted,
  autoScroll,
  isDarkMode
}: TutorialCarouselProps): JSX.Element {
  const totalItems = items.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const scrollViewRef = useRef(null);

  const onIndexChangeHandler = (index: number) => {
    scrollViewRef.current.scrollTo({
      x: index * deviceWidth(),
      y: 0,
      animated: true
    });
  };

  const slideImage = (dir: string) => {
    const newIndex = currentIndex + (dir === 'back' ? -1 : 1);
    onIndexChangeHandler(newIndex);
    setCurrentIndex(newIndex);
  };

  const onScroll = (event: { nativeEvent: { contentOffset: { x: any } } }) => {
    const currentOffset = event.nativeEvent.contentOffset.x;
    const direction = currentOffset > offset ? 'right' : 'left';
    setOffset(currentOffset);
    if (direction === 'left') {
      currentIndex > 0 && slideImage('back');
    } else {
      currentIndex < 4 && slideImage('next');
    }
  };

  return (
    <>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={200}
        pagingEnabled
        decelerationRate="fast"
        ref={scrollViewRef}
        scrollEnabled={true}
        onScrollEndDrag={(event: any) => {
          onScroll(event);
        }}>
        {items.map((item, index) => (
          <View key={index}>
            <ImageBackground height={RfH(388)} source={item.source} resizeMode="cover">
              <Image width={deviceWidth()} height={RfH(388)} style={styles.lotteView} />
            </ImageBackground>
            <View style={styles.heading}>
              <Text
                style={[
                  CommonStyles.regularFont600Style,
                  styles.headingBigText,
                  { color: isDarkMode ? Colors.white : Colors.app_black }
                ]}>
                {item.title}
              </Text>
              <Text
                style={[
                  styles.smallText,
                  CommonStyles.regularFont400Style,
                  { color: isDarkMode ? Colors.white : Colors.app_black }
                ]}>
                {item.desc}
              </Text>
            </View>
            {currentIndex <= 2 &&
              DecisionsItems.map((element) => {
                return (
                  <View
                    style={[
                      {
                        height: RfH(48),
                        flexDirection: 'row',
                        flex: 1,
                        borderRadius: BorderRadius.BR0,
                        marginVertical: RfH(5),
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingRight: RfW(24),
                        paddingLeft: RfW(24)
                      }
                    ]}>
                    <Shadow
                      startColor={Colors.lightModeShadow}
                      offset={[0, RfH(5)]}
                      paintInside={true}
                      style={{ width: '100%' }}
                      containerStyle={{}}>
                      <View
                        style={{
                          backgroundColor: COLORS.voiletLight,
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
                        />
                      </View>
                    </Shadow>

                    <CustomText
                      fontSize={16}
                      color={
                        currentIndex === element.activeIndex ? Colors.app_black : Colors.grayLight
                      }
                      numberOfLines={2}
                      styling={{
                        flex: 1,
                        paddingLeft: RfW(10),
                        ...CommonStyles.regularFont400Style
                      }}>
                      {element.name}
                    </CustomText>
                  </View>
                );
              })}
          </View>
        ))}
      </ScrollView>
      {currentIndex === totalItems - 1 && (
        <View style={[{ justifyContent: 'center' }, styles.loginContainer]}>
          <AppPrimaryButton buttonText={'LOGIN'} onPress={onStarted} />
        </View>
      )}
      <View style={styles.buttonView}>
        {currentIndex !== totalItems - 1 && (
          <TouchableOpacity onPress={onStarted}>
            <Text
              style={[
                CommonStyles.semiboldFontStyle,
                styles.skipText,
                { color: isDarkMode ? Colors.white : Colors.primary }
              ]}>
              {localize('common.skip')}
            </Text>
          </TouchableOpacity>
        )}
        <View style={styles.bullets}>
          {items.map((item, i) => (
            <View key={i}>
              <Text
                style={[
                  styles.bullet,
                  {
                    color: currentIndex === i ? bulletsSelectedColor : bulletsUnSelectedColor,
                    alignSelf: 'center'
                  }
                ]}>
                &bull;
              </Text>
            </View>
          ))}
        </View>
        {currentIndex !== totalItems - 1 && (
          <View style={{ justifyContent: 'center' }}>
            <TouchableOpacity
              style={styles.gettingStartedButton}
              onPress={() => slideImage('next')}>
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
            </TouchableOpacity>
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Colors.white,
    //  borderColor: Colors.lightGrey235,
    borderWidth: 0,
    marginTop: 0,
    flex: 1
  },

  loginButton: {
    paddingVertical: 10,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 32
  },
  loginContainer: {
    marginHorizontal: 32
  },
  gettingStartedButton: {
    width: RfH(48),
    height: RfH(48),
    backgroundColor: Colors.app_black,
    borderRadius: BorderRadius.BR0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  skipText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary
  },
  gettingStartedText: {
    fontSize: 14,
    color: Colors.white
  },
  buttonView: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    marginTop: 60,
    bottom: 20,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
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
  scrollView: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden'
  },
  bullets: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1
  },
  bullet: {
    paddingHorizontal: 1,
    fontSize: 35,
    color: Colors.grey,

    textShadowRadius: 1
  }
});

export default TutorialCarousel;
