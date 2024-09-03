import { useIsFocused } from '@react-navigation/core';
import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import ShareImage from 'react-native-share';
import ViewShot, { captureRef } from 'react-native-view-shot';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CustomImage, CustomText, CustomTextInput } from '../../../components';
import AppPrimaryButton from '../../../components/AppPrimaryButton';
import CustomBottomSheet from '../../../components/CustomBottomSheet';
import CustomEditComment from '../../../components/CustomEditComment';
import GreetingsSeleton from '../../../components/SkeletonLoader/GreetingsSeleton';
import { Colors, CommonStyles, Images } from '../../../theme';
import { BorderRadius } from '../../../theme/sizes';
import { RfH, RfW, getColorWithOpacity } from '../../../utils/helper';
import { isValidUrl } from '../../../utils/helpers';
import { getMyProfileDetailsSelector } from '../../LoginHome/redux/selectors';
import { getGreetingsData } from '../../redux/actions';
import { getGreetingsDataSelector, isDarkModeSelector } from '../../redux/selectors';
import { localize } from '../../../locale/utils';

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector,
  greetingsData: getGreetingsDataSelector,
  myProileDetails: getMyProfileDetailsSelector
});

const Greetings = () => {
  const { isDarkMode, greetingsData, myProileDetails } = useSelector(stateSelector);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const ref = useRef();

  const [selectedItemInfo, setSelectedItemInfo] = useState({});
  const [isPreviewEnable, setIsPreviewEnable] = useState(false);
  const [isCheckedAddNameOnCard, setIsCheckedAddNameOnCard] = useState(false);
  const [nameInEnglish, setNameInEnglish] = useState('');
  const [nameInArbic, setNameInArbic] = useState('');
  const [message, setMessage] = useState('');

  const modalBgColor = Colors.modalForegroundColor;

  useEffect(() => {
    if (isFocused) {
      dispatch(getGreetingsData.trigger());
    }
  }, [isFocused]);

  const onPressItem = (item) => {
    setIsPreviewEnable(false);
    setIsCheckedAddNameOnCard(false);
    setMessage('');
    setSelectedItemInfo({ isVisible: true, ...(item || {}) });
  };

  const onRequestClose = () => {
    setSelectedItemInfo({ isVisible: false });
  };

  const onCommentChange = (text) => setMessage(text);

  const handleOnSubmit = () => {
    if (!isPreviewEnable) {
      setIsPreviewEnable(true);
    } else {
      // take a screen shot and share image
      shareImage();
    }
  };

  const onPressCheckBox = () => {
    if (!isCheckedAddNameOnCard) {
      setNameInEnglish(myProileDetails?.profile?.displayName || '');
      const removedTitle = myProileDetails?.profile?.localDisplayName.replace(/Mr\.|Ms\./g, '');
      setNameInArbic(removedTitle || '');
    } else {
      setNameInEnglish('');
      setNameInArbic('');
    }

    setIsCheckedAddNameOnCard(!isCheckedAddNameOnCard);
  };

  const shareImage = async () => {
    try {
      const uri = await captureRef(ref, {
        format: 'png',
        quality: 0.7
      });

      const shareOptions = {
        title: localize('wish.shareCard'),
        url: uri,
        failOnCancel: false
      };
      await ShareImage.open(shareOptions);

      setSelectedItemInfo({ isVisble: false });
    } catch (e) {
      console.log(e);
    }
  };

  const renderGreetingList = ({ item }) => {
    const { greetingCardImage } = item || {};
    return (
      <TouchableOpacity onPress={() => onPressItem(item)}>
        <CustomImage
          image={isValidUrl(greetingCardImage?.url, true)}
          imageHeight={RfW(156)}
          imageWidth={RfW(156)}
          imageResizeMode={'contain'}
          styling={{
            marginHorizontal: RfH(7.5),
            marginBottom: RfH(15)
          }}
        />
        <CustomImage
          image={Images.shareSquareIcon}
          imageHeight={RfW(24)}
          imageWidth={RfW(24)}
          imageResizeMode={'contain'}
          styling={{
            position: 'absolute',
            bottom: RfH(20),
            right: RfH(12)
          }}
        />
      </TouchableOpacity>
    );
  };

  const mainSection = () => {
    if (greetingsData === undefined) {
      return <GreetingsSeleton />;
    } else if (greetingsData?.length > 0) {
      return (
        <FlatList
          data={greetingsData || []}
          keyExtractor={(_, index) => index?.toString()}
          numColumns={2}
          renderItem={renderGreetingList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: RfH(15), paddingHorizontal: RfW(15) }}
        />
      );
    }

    return null;
  };

  const cardMainView = () => {
    const imageSize = RfW(253);
    return (
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.darkModeBackground : modalBgColor,
          paddingBottom: RfH(30)
        }}>
        <CustomImage
          image={isValidUrl(selectedItemInfo?.greetingCardImage?.url || '', true)}
          imageHeight={imageSize}
          imageWidth={imageSize}
          imageResizeMode={'contain'}
          styling={{ alignSelf: 'center', marginBottom: RfH(28) }}
        />

        <CustomText
          fontSize={14}
          color={Colors.white}
          styling={{
            ...CommonStyles.regularFont400Style,
            lineHeight: RfH(32),
            paddingLeft: RfW(24)
          }}>
          {localize('wish.addMessageHere')}
        </CustomText>
        <CustomEditComment
          usedForLeaveForm={true}
          label={localize('wish.addMessageHere')}
          placeholder={localize('wish.typeYourMessage')}
          onCommentChange={onCommentChange}
          isHideHederSection={true}
          containerStyle={{ marginTop: RfH(9) }}
        />

        <TouchableOpacity
          onPress={onPressCheckBox}
          style={{
            flexDirection: 'row',
            paddingHorizontal: RfW(24),
            paddingTop: RfH(20),
            alignItems: 'center'
          }}>
          <CustomImage
            image={isCheckedAddNameOnCard ? Images.checkboxSelect : Images.checkboxDeselect}
            imageHeight={RfW(16)}
            imageWidth={RfW(16)}
            imageResizeMode={'contain'}
          />
          <CustomText
            fontSize={14}
            color={Colors.white}
            styling={{
              ...CommonStyles.regularFont400Style,
              lineHeight: RfH(20.3),
              paddingLeft: RfW(5)
            }}>
            {localize('wish.addMyNameToTheGreetings')}
          </CustomText>
        </TouchableOpacity>
        {isCheckedAddNameOnCard ? (
          <>
            <CustomTextInput
              label={`Name (English)`}
              inputLabelStyle={{ color: Colors.grayTwo }}
              placeholder={''}
              textInputStyle={styles.textInputSty}
              value={nameInEnglish || ''}
              onChangeHandler={(value) => setNameInEnglish(value)}
              returnKeyType={'next'}
              autoCapitalize={'none'}
              topMargin={20}
              containerStyle={{ paddingHorizontal: RfW(24) }}
              isMandatory={false}
            />
            <CustomTextInput
              label={`Name (Arbic)`}
              inputLabelStyle={{ color: Colors.grayTwo }}
              placeholder={''}
              textInputStyle={styles.textInputSty}
              value={nameInArbic || ''}
              onChangeHandler={(value) => setNameInArbic(value)}
              returnKeyType={'next'}
              autoCapitalize={'none'}
              topMargin={20}
              containerStyle={{ paddingHorizontal: RfW(24) }}
              isMandatory={false}
            />
          </>
        ) : null}
      </View>
    );
  };

  const previewSection = () => {
    const imageSize = RfW(323);
    return (
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.darkModeBackground : modalBgColor,
          paddingBottom: RfH(30),
          alignItems: 'center'
        }}>
        <ViewShot ref={ref}>
          <ImageBackground
            source={{ uri: isValidUrl(selectedItemInfo?.greetingCardImage?.url || '', true) }}
            style={{
              height: imageSize,
              width: imageSize
            }}>
            <View style={{ flex: 1, justifyContent: 'flex-end', bottom: RfH(10) }}>
              <CustomText
                color={Colors.white}
                fontSize={12}
                styling={{
                  ...CommonStyles.regularFont400Style,
                  lineHeight: RfH(14),
                  textAlign: 'center',
                  paddingHorizontal: RfW(40)
                }}>
                {message}
              </CustomText>
              {isCheckedAddNameOnCard ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: RfW(15),
                    paddingTop: RfH(40)
                  }}>
                  <CustomText
                    color={Colors.white}
                    fontSize={14}
                    styling={{
                      ...CommonStyles.regularFont400Style,
                      lineHeight: RfH(14),
                      width: RfW(130)
                    }}>
                    {nameInEnglish || ''}
                  </CustomText>
                  <CustomText
                    color={Colors.white}
                    fontSize={14}
                    styling={{
                      ...CommonStyles.regularFont400Style,
                      lineHeight: RfH(14),
                      width: RfW(130),
                      textAlign: 'right'
                    }}>
                    {nameInArbic || ''}
                  </CustomText>
                </View>
              ) : null}
            </View>
          </ImageBackground>
        </ViewShot>
      </View>
    );
  };

  return (
    <View style={{}}>
      {mainSection()}
      <CustomBottomSheet
        title={`${selectedItemInfo?.title} card` || ''}
        // headerColor={Colors.transparent}
        isVisible={selectedItemInfo?.isVisible}
        onRequestClose={onRequestClose}>
        <ScrollView>
          <KeyboardAvoidingView
            behavior={Platform.select({ android: 'position', ios: 'position' })}
            keyboardVerticalOffset={Platform.OS === 'android' ? RfH(80) : RfH(150)}
            enabled>
            {isPreviewEnable ? previewSection() : cardMainView()}

            <View
              style={{
                ...styles.buttonContainer,
                backgroundColor: isDarkMode ? Colors.darkModeBackground : modalBgColor
              }}>
              <AppPrimaryButton
                buttonText={isPreviewEnable ? localize('wish.shareC') : localize('wish.previewC')}
                onPress={handleOnSubmit}
              />
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </CustomBottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  rowContainer: {
    backgroundColor: Colors.white,
    height: RfH(64),
    flexDirection: 'row',
    // flex: 1,
    borderRadius: BorderRadius.BR0,
    marginVertical: RfH(6),
    marginHorizontal: RfH(2),
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: RfW(16),
    paddingLeft: RfW(8)
  },
  iconbg: {
    backgroundColor: Colors.voiletLight,
    height: RfH(48),
    width: RfW(48),
    flexDirection: 'row',
    borderRadius: BorderRadius.BR0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  categoryContainer: {
    backgroundColor: Colors.white
  },
  buttonContainer: {
    paddingHorizontal: RfW(32),
    paddingBottom: RfH(30)
  },
  textInputSty: {
    fontSize: 14,
    color: Colors.app_black,
    ...CommonStyles.regularFont400Style
  }
});

export default Greetings;
