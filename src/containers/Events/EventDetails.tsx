import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { BackHandler, Platform, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { isEmpty } from 'lodash';
import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-snap-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CustomImage, CustomRenderHtml, CustomText, IconButtonWrapper } from '../../components';
import AppPrimaryButton from '../../components/AppPrimaryButton';
import AppPrimaryOutLineButton from '../../components/AppPrimaryOutLineButton';
import { isRTL, localize } from '../../locale/utils';
import { Colors, CommonStyles, Images } from '../../theme';
import COLORS from '../../theme/colors';
import { BorderRadius } from '../../theme/sizes';
import { EVENT_NAME, trackEvent } from '../../utils/analytics';
import { CONFIG_CONSTANT } from '../../utils/constants';
import {
  RfH,
  RfW,
  getColorWithOpacity,
  getDateFormat,
  getImageUrl,
  getTimeFormat,
  openLinkInBrowser
} from '../../utils/helper';
import { callTo, deviceWidth, isDisplayWithNotch } from '../../utils/helpers';
import { cancelAcknowledge, getEventsDetails, submitAcknowledge } from '../Home/redux/actions';
import {
  getAcknowledgeDataSelector,
  getCancelledAcknowledgeDataSelector,
  getEventsDetailsSelector
} from '../Home/redux/selectors';
import { isDarkModeSelector } from '../redux/selectors';
import CustomModal from '../../components/CustomModal';
import AddToCalendarButton from './AddToCalendarButton';
import EventDetailsSkeleton from '../../components/SkeletonLoader/EventDetailsSkeleton';
import WrapperContainer from '../../components/WrapperContainer';
// import TermsandConditionsModal from './components/TermsandConditionsModal';

const offerCategoriesstateSelector = createStructuredSelector({
  eventsDetailsData: getEventsDetailsSelector,
  isDarkMode: isDarkModeSelector,
  acknowledgeData: getAcknowledgeDataSelector,
  cancelledAcknowledgeData: getCancelledAcknowledgeDataSelector
});

const EventDetails = (props: any) => {
  const { id } = props.route.params;
  const { eventsDetailsData, isDarkMode, acknowledgeData, cancelledAcknowledgeData } = useSelector(
    offerCategoriesstateSelector
  );
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const totalItems = eventsDetailsData?.gallery?.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isApiTriggered, setIsApiTriggered] = useState(false);
  const [successModalInfo, setSuccessModalInfo] = useState({
    isVisible: false,
    title: '',
    subTitle: ''
  });

  useEffect(() => {
    if (id) {
      trackEvent(EVENT_NAME.SCREEN_EVENT_DETAILS);
      dispatch(getEventsDetails.trigger({ id }));
    }
  }, [id]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);

  useEffect(() => {
    if (!isEmpty(acknowledgeData) && isApiTriggered) {
      setIsApiTriggered(false);
      setSuccessModalInfo({
        isVisible: true,
        title: localize('event.rsvpConfirmed'),
        subTitle: localize('event.weAreExcitedToSee')
      });
    }
  }, [acknowledgeData]);

  useEffect(() => {
    if (!isEmpty(cancelledAcknowledgeData) && isApiTriggered) {
      setIsApiTriggered(false);
      setSuccessModalInfo({
        isVisible: true,
        title: localize('event.rsvpCancelled'),
        subTitle: ''
      });
    }
  }, [cancelledAcknowledgeData]);

  const handleBackButtonClick = () => {
    handleBack();
    return true;
  };

  const handleBack = () => {
    navigation.goBack();
  };
  const handleCall = () => {
    eventsDetailsData?.contactNumber ? callTo(eventsDetailsData?.contactNumber) : {};
  };
  const handleSendRsvp = () => {
    setIsApiTriggered(true);
    const data = {
      featureId: eventsDetailsData?.id,
      featureModule: CONFIG_CONSTANT.EVENTS,
      metadata: {}
    };

    dispatch(submitAcknowledge.trigger({ data }));
  };

  const handleCancelRsvp = () => {
    setIsApiTriggered(true);
    dispatch(cancelAcknowledge.trigger({ id: eventsDetailsData?.id }));
  };

  const handleAddToCalendar = () => {};

  const addressSection = () => {
    const isMapAddress =
      eventsDetailsData?.mapAddress && eventsDetailsData?.mapAddress !== '' ? true : false;
    if (eventsDetailsData?.address) {
      return (
        <TouchableOpacity
          disabled={!isMapAddress}
          onPress={() => openLinkInBrowser(eventsDetailsData?.mapAddress)}
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
            {eventsDetailsData?.address}
          </CustomText>
          {isMapAddress ? (
            <CustomImage
              imageHeight={RfH(12)}
              imageWidth={RfW(12)}
              image={Images.arrowRightblack}
              displayLoader={false}
              imageResizeMode={'contain'}
              containerStyling={{
                marginTop: RfH(5),
                overflow: 'hidden'
              }}
              tintColor={isDarkMode ? Colors.white : Colors.white}
            />
          ) : null}
        </TouchableOpacity>
      );
    }
  };

  const dateTextSection = () => {
    let dateText = '';
    if (
      moment(eventsDetailsData?.startDate || undefined).format('DD-MM-YYYY') ===
      moment(eventsDetailsData?.endDate || undefined).format('DD-MM-YYYY')
    ) {
      dateText = `${getDateFormat(eventsDetailsData?.startDate, 'Do MMMM')} at ${getTimeFormat(
        eventsDetailsData?.startDate
      )}`;
    } else {
      dateText = `${getTimeFormat(eventsDetailsData?.startDate)}, ${getDateFormat(
        eventsDetailsData?.startDate,
        'Do MMMM'
      )} to ${getTimeFormat(eventsDetailsData?.endDate)}, ${getDateFormat(
        eventsDetailsData?.endDate,
        'Do MMMM'
      )}`;
    }

    return (
      <CustomText
        fontSize={14}
        color={Colors.white}
        numberOfLines={2}
        styling={{
          lineHeight: RfH(20),
          paddingHorizontal: RfW(10),
          ...CommonStyles.regularFont400Style
        }}>
        {dateText}
      </CustomText>
    );
  };

  const buttonSection = () => {
    if (eventsDetailsData?.rsvpRequired) {
      return (
        <>
          {!eventsDetailsData?.isAcknowledged ? (
            <View
              style={{
                paddingTop: RfH(10),
                paddingBottom: RfH(Platform.OS === 'ios' ? 0 : 20),
                paddingHorizontal: RfW(32),
                // borderTopColor: Colors.grayBorder,
                // borderTopWidth: 0.8,
                backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.transparent
              }}>
              <AppPrimaryButton buttonText={`SEND RSVP`} onPress={handleSendRsvp} />
            </View>
          ) : (
            <View
              style={{
                paddingTop: RfH(10),
                paddingBottom: RfH(Platform.OS === 'ios' ? 0 : 20),
                paddingHorizontal: RfW(32),
                // borderTopColor: Colors.grayBorder,
                // borderTopWidth: 0.8,
                backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.transparent,
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}>
              <View style={{ width: RfH(150) }}>
                <AppPrimaryOutLineButton
                  height={RfH(50)}
                  buttonText={`CANCEL RSVP`}
                  onPress={handleCancelRsvp}
                />
              </View>
              <AddToCalendarButton
                eventData={eventsDetailsData}
                containerStyle={{ width: RfH(150) }}
                onPress={handleAddToCalendar}
              />
            </View>
          )}
        </>
      );
    }

    return null;
  };

  const mainSection = () => {
    if (eventsDetailsData === undefined) {
      return <EventDetailsSkeleton />;
    } else if (!isEmpty(eventsDetailsData)) {
      return (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.mainView}>
              <View
                style={{
                  height: RfH(335),
                  width: deviceWidth(),
                  backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.transparent
                }}>
                <View style={{}}>
                  <Carousel
                    data={eventsDetailsData?.gallery || []}
                    renderItem={({ item }) => {
                      return (
                        <CustomImage
                          imageHeight={RfH(335)}
                          imageWidth={deviceWidth()}
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
                  {eventsDetailsData?.contactNumber ? (
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
                    {totalItems > 1 ? (
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
                    ) : null}
                  </View>
                )}
              </View>

              {/* <View
                style={[
                  {
                    flex: 1,
                    width: RfW(375),
                    backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.transparent,
                    marginTop: RfH(-30),
                    borderTopLeftRadius: BorderRadius.BR0,
                    borderTopRightRadius: BorderRadius.BR0
                  }
                  // CommonStyles.card_elevation
                ]}>
                <View style={{ paddingHorizontal: RfW(24), paddingBottom: RfH(16) }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: RfH(28)
                    }}>
                    <CustomText
                      fontSize={20}
                      color={Colors.app_black}
                      numberOfLines={2}
                      styling={{
                        lineHeight: RfH(30),
                        // width: RfW(200),
                        ...CommonStyles.regularFont400Style
                      }}>
                      {eventsDetailsData?.title}
                    </CustomText>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: RfH(60),
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
                      tintColor={isDarkMode ? Colors.white : Colors.app_black}
                    />

                    {dateTextSection()}
                  </View>
                  {addressSection()}

                  {eventsDetailsData?.subtitle ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        marginVertical: RfH(28),
                        paddingHorizontal: RfW(12),
                        paddingVertical: RfW(16),
                        borderTopWidth: 1,
                        borderBottomWidth: 1,
                        borderColor: COLORS.grayLine
                      }}>
                      <CustomText
                        fontSize={14}
                        color={Colors.app_black}
                        numberOfLines={2}
                        styling={{
                          lineHeight: RfH(20),
                          ...CommonStyles.mediumFontStyle
                        }}>
                        {eventsDetailsData?.subtitle}
                      </CustomText>
                    </View>
                  ) : null}

                  {eventsDetailsData?.rsvpRequired ? (
                    <View
                      style={{
                        borderBottomColor: Colors.inactiveDotColor,
                        borderBottomWidth: RfH(1),
                        borderTopColor: Colors.inactiveDotColor,
                        borderTopWidth: RfH(1),
                        paddingVertical: RfH(16),
                        paddingHorizontal: RfW(12),
                        marginVertical: RfH(28),
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                      }}>
                      <CustomText
                        fontSize={14}
                        styling={{
                          ...CommonStyles.regularFont500Style,
                          lineHeight: RfH(20)
                        }}>
                        {localize('event.rsvpRequired')}
                      </CustomText>

                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <CustomImage
                          imageWidth={RfH(16)}
                          imageHeight={RfH(16)}
                          image={Images.rsvpIcon}
                          styling={{ bottom: 2 }}
                        />
                        <CustomText
                          fontSize={14}
                          color={Colors.app_black}
                          numberOfLines={2}
                          styling={{
                            paddingLeft: RfW(3),
                            ...CommonStyles.regularFont500Style
                          }}>
                          {`${eventsDetailsData?.rsvpCount || 0} RSVP’d`}
                        </CustomText>
                      </View>
                    </View>
                  ) : null}
                  <CustomRenderHtml
                    source={
                      isEmpty(eventsDetailsData?.description) ? '' : eventsDetailsData?.description
                    }
                    tagsStyles={{
                      body: {
                        whiteSpace: 'normal',
                        color: isDarkMode ? Colors.white : Colors.app_black,
                        fontSize: 14,
                        lineHeight: 22,
                        ...CommonStyles.regularFont400Style
                      }
                    }}
                  />

                  <View
                    style={{
                      marginTop: RfH(28)
                    }}>
                    {eventsDetailsData?.howItWorks ? (
                      <>
                        <CustomText
                          fontSize={20}
                          color={isDarkMode ? Colors.white : Colors.app_black}
                          numberOfLines={2}
                          styling={{
                            marginBottom: RfH(26),
                            lineHeight: RfH(20),
                            ...CommonStyles.mediumFontStyle
                          }}>
                          {localize('common.howitWork')}
                        </CustomText>

                        <CustomRenderHtml
                          source={
                            isEmpty(eventsDetailsData?.howItWorks)
                              ? ''
                              : eventsDetailsData?.howItWorks
                          }
                          tagsStyles={{
                            body: {
                              whiteSpace: 'normal',
                              color: isDarkMode ? Colors.white : Colors.app_black,
                              fontSize: 14,
                              lineHeight: 22,
                              ...CommonStyles.regularFont400Style
                            }
                          }}
                        />
                      </>
                    ) : null}
                  </View>
                </View>
              </View> */}

              <View style={styles.titleInfoContainer}>
                <View style={{ flexDirection: 'row' }}>
                  {/* {eventsDetailsData?.logo?.url ? (
                    <CustomImage
                      image={getImageUrl(eventsDetailsData?.logo?.url)}
                      imageHeight={RfH(72)}
                      imageWidth={RfH(72)}
                      imageResizeMode={'cover'}
                      styling={{ borderRadius: BorderRadius.BR10 }}
                    />
                  ) : (
                    <View style={{ height: RfH(72), width: RfH(72) }} />
                  )} */}

                  <View style={{ width: RfW(200) }}>
                    <CustomText
                      fontSize={20}
                      color={Colors.white}
                      numberOfLines={2}
                      styling={{
                        ...CommonStyles.regularFont500Style,
                        marginLeft: RfW(10)
                      }}>
                      {eventsDetailsData?.title}
                    </CustomText>

                    {/* <View
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
                        {eventsDetailsData?.categories?.length > 0
                          ? eventsDetailsData?.categories[0]?.name
                          : ''}
                      </CustomText>
                        </View> */}
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

                  {dateTextSection()}
                </View>
                {eventsDetailsData?.address ? addressSection() : null}
              </View>

              <View style={{ paddingBottom: RfH(20) }}>
                {eventsDetailsData?.subtitle ? (
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
                      {eventsDetailsData?.subtitle}
                    </CustomText>
                  </View>
                ) : null}

                {eventsDetailsData?.howItWorks ? (
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
                      source={
                        isEmpty(eventsDetailsData?.howItWorks) ? '' : eventsDetailsData?.howItWorks
                      }
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

                {eventsDetailsData?.description || eventsDetailsData?.termsAndConditions ? (
                  <View style={styles.titleInfoContainer}>
                    <CustomRenderHtml
                      source={
                        isEmpty(eventsDetailsData?.description)
                          ? ''
                          : eventsDetailsData?.description
                      }
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

                    {eventsDetailsData?.termsAndConditions ? (
                      <TouchableOpacity
                        // onPress={handleTermsAndCondtion}
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
          {buttonSection()}
        </>
      );
    }

    return null;
  };

  return (
    <WrapperContainer>
      <SafeAreaView
        style={{
          ...styles.mainContainer,
          backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.transparent
        }}>
        {mainSection()}

        {successModalInfo?.isVisible ? (
          <CustomModal
            title={successModalInfo?.title}
            subTitle={successModalInfo?.subTitle}
            modalVisible={successModalInfo?.isVisible}
            onRequestClose={() =>
              setSuccessModalInfo({ isVisible: false, title: '', subTitle: '' })
            }
            onRequestActionButton={() => {
              setSuccessModalInfo({ isVisible: false, title: '', subTitle: '' });
              dispatch(getEventsDetails.trigger({ id }));
            }}
          />
        ) : null}
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
    marginTop: RfH(10)
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

export default EventDetails;
