import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  BackHandler,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';

import { isEmpty } from 'lodash';
import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-snap-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CustomImage, CustomRenderHtml, CustomText, IconButtonWrapper } from '../../components';
import AppPrimaryButton from '../../components/AppPrimaryButton';
import { isRTL, localize } from '../../locale/utils';
import { Colors, CommonStyles, Images } from '../../theme';
import COLORS from '../../theme/colors';
import { BorderRadius } from '../../theme/sizes';
import { EVENT_NAME, trackEvent } from '../../utils/analytics';
import { RfH, RfW, getColorWithOpacity, getImageUrl } from '../../utils/helper';
import { callTo, deviceWidth, isDisplayWithNotch } from '../../utils/helpers';
import { getOffersDetails } from '../Home/redux/actions';
import { getOfferCategoriesSelector, getOffersDetailsSelector } from '../Home/redux/selectors';
import { isDarkModeSelector } from '../redux/selectors';
import TermsandConditionsModal from './components/TermsandConditionsModal';
import WrapperContainer from '../../components/WrapperContainer';

const offerCategoriesstateSelector = createStructuredSelector({
  offerCategoriesData: getOfferCategoriesSelector,
  offersDetails: getOffersDetailsSelector,
  isDarkMode: isDarkModeSelector
});

const BenefitsDetails = (props: any) => {
  const { id } = props.route.params;
  const { offerCategoriesData, offersDetails, isDarkMode } = useSelector(
    offerCategoriesstateSelector
  );
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const totalItems = offersDetails?.gallery?.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [categoryName, setCategoryName] = useState('');

  const [termsAndConditionModal, setTermsAndConditionModal] = useState(false);

  useEffect(() => {
    trackEvent(EVENT_NAME.SCREEN_BENEFITS_DETAILS);
    dispatch(getOffersDetails.trigger({ id }));
  }, []);

  useEffect(() => {
    if (offersDetails?.categories?.length > 0 && offersDetails?.categories[0]?.id) {
      getCategoryName(offersDetails?.categories[0]?.id);
    }
  }, [offerCategoriesData]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);

  const handleBackButtonClick = () => {
    handleBack();
    return true;
  };

  const handleBack = () => {
    navigation.goBack();
  };
  const handleCall = () => {
    offersDetails?.contactNumber ? callTo(offersDetails?.contactNumber) : {};
  };
  const handleExplor = () => {
    trackEvent(EVENT_NAME.PRESSED_BENEFITS_EXPLORE);
    offersDetails?.url ? Linking.openURL(offersDetails?.url) : {};
  };
  const handleTermsAndCondtion = () => {
    trackEvent(EVENT_NAME.PRESSED_BENEFITS_TERMSCOND);
    if (offersDetails?.termsAndConditions) {
      setTermsAndConditionModal(true);
    }
  };

  const getCategoryName = (categoryId) => {
    const catItem = offerCategoriesData?.find((item) => {
      return categoryId === item?.id;
    });

    setCategoryName(catItem ? catItem?.name : '');
  };
  return (
    <WrapperContainer>
      <SafeAreaView
        style={{
          ...styles.mainContainer,
          backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.transparent
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.mainView}>
            <View
              style={{
                height: RfH(325),
                width: RfW(375),
                backgroundColor: isDarkMode
                  ? Colors.darkModeBackground
                  : Colors.primaryContainerColor
              }}>
              <ScrollView>
                <View style={{ paddingBottom: RfH(100) }}>
                  <Carousel
                    data={offersDetails?.gallery || []}
                    renderItem={({ item }) => {
                      return (
                        <CustomImage
                          imageHeight={RfH(325)}
                          imageWidth={RfW(375)}
                          image={getImageUrl(item?.url)}
                          imageResizeMode={'contain'}
                          containerStyling={{
                            overflow: 'hidden'
                          }}
                        />
                      );
                    }}
                    sliderWidth={deviceWidth()}
                    itemWidth={deviceWidth()}
                    onSnapToItem={(index) => setCurrentIndex(index)}
                  />
                </View>
              </ScrollView>
              <View style={styles.backButtonPhoneContainer}>
                <TouchableOpacity
                  activeOpacity={0.75}
                  onPress={handleBack}
                  style={styles.backButtonContainer}>
                  <CustomImage
                    imageWidth={RfW(15)}
                    imageHeight={RfW(15)}
                    image={isRTL() ? Images.rightArrowNew : Images.leftArrowNew}
                    tintColor={Colors.white}
                  />
                </TouchableOpacity>
                {offersDetails?.contactNumber ? (
                  <TouchableOpacity
                    activeOpacity={0.75}
                    onPress={handleCall}
                    style={styles.phoneContainer}>
                    <CustomImage
                      imageWidth={RfW(16)}
                      imageHeight={RfH(16)}
                      image={Images.callbenefit}
                      tintColor={Colors.white}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
              {totalItems && (
                <View style={styles.countOuterContainer}>
                  <View
                    style={[
                      styles.countContainer,
                      {
                        backgroundColor: isDarkMode
                          ? Colors.darkModeButton
                          : getColorWithOpacity(Colors.blueBayoux, 0.37)
                      }
                    ]}>
                    <CustomText
                      fontSize={14}
                      color={Colors.white}
                      styling={{
                        ...CommonStyles.regularFont400Style
                      }}>
                      {`${currentIndex + 1} of ${totalItems}`}
                    </CustomText>
                  </View>
                </View>
              )}
            </View>

            <View style={styles.titleInfoContainer}>
              <View style={{ flexDirection: 'row' }}>
                {offersDetails?.logo?.url ? (
                  <CustomImage
                    image={getImageUrl(offersDetails?.logo?.url)}
                    imageHeight={RfH(72)}
                    imageWidth={RfH(72)}
                    imageResizeMode={'cover'}
                    styling={{ borderRadius: BorderRadius.BR10 }}
                  />
                ) : (
                  <View style={{ height: RfH(72), width: RfH(72) }} />
                )}

                <View style={{ width: RfW(200) }}>
                  <CustomText
                    fontSize={20}
                    color={Colors.white}
                    numberOfLines={2}
                    styling={{
                      ...CommonStyles.regularFont500Style,
                      marginLeft: RfW(10),
                      lineHeight: RfH(24)
                    }}>
                    {offersDetails?.title}
                  </CustomText>

                  <View
                    style={{
                      ...styles.detailsCategoryView,
                      backgroundColor: isDarkMode
                        ? Colors.darkModeBorder
                        : getColorWithOpacity(Colors.blueBayoux, 0.37)
                    }}>
                    <CustomText
                      fontSize={12}
                      color={Colors.white}
                      styling={{
                        ...CommonStyles.regularFont500Style
                      }}>
                      {offersDetails?.categories?.length > 0
                        ? offersDetails?.categories[0]?.name
                        : ''}
                    </CustomText>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: RfH(20),
                  alignItems: 'center'
                }}>
                <CustomImage
                  imageHeight={RfH(14)}
                  imageWidth={RfW(14)}
                  image={Images.calendarblack}
                  displayLoader={false}
                  imageResizeMode={'contain'}
                  containerStyling={{
                    overflow: 'hidden'
                  }}
                  tintColor={isDarkMode ? Colors.white : Colors.white}
                />

                <CustomText
                  fontSize={14}
                  color={Colors.white}
                  numberOfLines={2}
                  styling={{
                    lineHeight: RfH(20),
                    paddingHorizontal: RfW(10),
                    ...CommonStyles.regularFont400Style
                  }}>
                  {offersDetails?.startDate && offersDetails?.endDate
                    ? (offersDetails?.startDate &&
                        moment(offersDetails?.startDate).format('DD-MMM-YYYY')) +
                      ' to ' +
                      (offersDetails?.endDate &&
                        moment(offersDetails?.endDate).format('DD-MMM-YYYY'))
                    : 'No Expiry'}
                </CustomText>
              </View>

              {offersDetails?.address ? (
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: RfH(8)
                  }}>
                  <CustomImage
                    imageHeight={RfH(14)}
                    imageWidth={RfW(14)}
                    image={Images.locationBlack}
                    displayLoader={false}
                    imageResizeMode={'contain'}
                    containerStyling={{
                      marginTop: RfH(5),
                      overflow: 'hidden'
                    }}
                    tintColor={isDarkMode ? Colors.white : Colors.white}
                  />
                  <CustomText
                    fontSize={14}
                    color={Colors.white}
                    numberOfLines={2}
                    styling={{
                      lineHeight: RfH(20),
                      paddingHorizontal: RfW(10),
                      ...CommonStyles.regularFont400Style
                    }}>
                    {offersDetails?.address}
                  </CustomText>
                </View>
              ) : null}
            </View>

            <View style={{ paddingBottom: RfH(20) }}>
              {offersDetails?.subtitle ? (
                <View
                  style={[
                    styles.whiteCardContainer,
                    { marginHorizontal: RfW(24), marginTop: RfH(15) }
                  ]}>
                  <CustomText
                    fontSize={14}
                    color={Colors.app_black}
                    numberOfLines={2}
                    styling={{
                      lineHeight: RfH(20),
                      ...CommonStyles.mediumFontStyle
                    }}>
                    {offersDetails?.subtitle}
                  </CustomText>
                </View>
              ) : null}

              {offersDetails?.howItWorks ? (
                <View style={styles.titleInfoContainer}>
                  <CustomText
                    fontSize={20}
                    color={isDarkMode ? Colors.white : Colors.white}
                    numberOfLines={2}
                    styling={{
                      marginVertical: RfH(10),
                      lineHeight: RfH(20),
                      ...CommonStyles.mediumFontStyle
                    }}>
                    {localize('common.howitWork')}
                  </CustomText>

                  <CustomRenderHtml
                    source={isEmpty(offersDetails?.howItWorks) ? '' : offersDetails?.howItWorks}
                    tagsStyles={{
                      body: {
                        whiteSpace: 'normal',
                        color: isDarkMode ? Colors.white : Colors.white,
                        fontSize: 14,
                        lineHeight: 22,
                        ...CommonStyles.regularFont400Style
                      }
                    }}
                  />
                </View>
              ) : null}

              {offersDetails?.description || offersDetails?.termsAndConditions ? (
                <View style={styles.titleInfoContainer}>
                  <CustomRenderHtml
                    source={isEmpty(offersDetails?.description) ? '' : offersDetails?.description}
                    tagsStyles={{
                      body: {
                        whiteSpace: 'normal',
                        color: isDarkMode ? Colors.white : Colors.white,
                        fontSize: 14,
                        lineHeight: 22,
                        ...CommonStyles.regularFont400Style
                      }
                    }}
                  />

                  {offersDetails?.termsAndConditions ? (
                    <TouchableOpacity
                      onPress={handleTermsAndCondtion}
                      style={styles.whiteCardContainer}>
                      <CustomText
                        fontSize={14}
                        numberOfLines={2}
                        color={Colors.darkPurple}
                        styling={{
                          lineHeight: RfH(20),
                          ...CommonStyles.mediumFontStyle
                        }}>
                        {localize('common.termsandConditions')}
                      </CustomText>
                    </TouchableOpacity>
                  ) : null}
                </View>
              ) : null}
            </View>
          </View>
        </ScrollView>
        {offersDetails?.url ? (
          <View
            style={{
              paddingTop: RfH(10),
              paddingBottom: RfH(Platform.OS === 'ios' ? 0 : 20),
              paddingHorizontal: RfW(32),
              backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.transparent
            }}>
            <AppPrimaryButton
              buttonText={localize('common.explore')}
              onPress={handleExplor}
              containerStyle={{ backgroundColor: Colors.darkPurple, borderRadius: RfH(15) }}
            />
          </View>
        ) : null}
        {termsAndConditionModal && (
          <TermsandConditionsModal
            isDarkMode={isDarkMode}
            isVisible={termsAndConditionModal}
            title={localize('common.termsandConditions')}
            onRequestClose={() => setTermsAndConditionModal(false)}
            module={offersDetails?.termsAndConditions}
          />
        )}
      </SafeAreaView>
    </WrapperContainer>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: isDisplayWithNotch() ? RfH(30) : RfH(10)
  },
  mainView: {
    flex: 1
  },
  detailsCategoryView: {
    backgroundColor: Colors.voiletLight,
    borderRadius: BorderRadius.BR5,
    paddingHorizontal: RfW(8),
    paddingVertical: RfH(5),
    flexWrap: 'wrap',
    marginLeft: RfW(10),
    marginTop: RfH(10),
    alignSelf: 'flex-start'
  },
  titleInfoContainer: {
    marginTop: RfH(15),
    padding: RfW(15),
    backgroundColor: getColorWithOpacity(Colors.midnightExpress, 0.37),
    marginHorizontal: RfW(23),
    borderRadius: RfW(15)
  },
  backButtonPhoneContainer: {
    position: 'absolute',
    top: RfH(42),
    left: RfW(24),
    right: RfW(24),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  backButtonContainer: {
    width: RfW(40),
    height: RfW(40),
    borderRadius: RfW(20),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: getColorWithOpacity(Colors.whiteSmoke, 0.18)
  },
  phoneContainer: {
    width: RfW(40),
    height: RfW(40),
    borderRadius: RfW(20),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.darkPurple
  },
  countOuterContainer: {
    position: 'absolute',
    bottom: RfH(53),
    left: RfW(24),
    right: RfW(24),
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  countContainer: {
    width: RfW(60),
    height: RfH(30),
    borderRadius: RfW(8),
    justifyContent: 'center',
    alignItems: 'center'
  },
  whiteCardContainer: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    height: RfH(50),
    borderRadius: RfW(15)
  }
});

export default BenefitsDetails;
