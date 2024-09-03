import React from 'react';
import { Linking, StyleSheet, TouchableOpacity, View } from 'react-native';
import { CustomImage, CustomText } from '../../../components';
import AppPrimaryButton from '../../../components/AppPrimaryButton';
import { Colors, CommonStyles, Images } from '../../../theme';
import { RfH, RfW, getColorWithOpacity } from '../../../utils/helper';
import { createStructuredSelector } from 'reselect';
import { useSelector } from 'react-redux';
import { callTo, getPublicContactDetails, mailTo } from '../../../utils/helpers';
import { getPublicStaticDataSelector } from '../../redux/selectors';
import { localize } from '../../../locale/utils';

const stateSelector = createStructuredSelector({
  publicStaticData: getPublicStaticDataSelector
});

const CallCenterPopup = (props: any) => {
  const { onPressGoit, isDarkMode, sourceFrom } = props || {};

  const { publicStaticData } = useSelector(stateSelector);
  const { contactDetails } = publicStaticData || {};

  const detailInfo = getPublicContactDetails(contactDetails, sourceFrom);

  const onPressOptions = (usedFor) => {
    if (usedFor === 'call') {
      callTo(detailInfo?.phone);
    }
    if (usedFor === 'email') {
      mailTo(detailInfo?.email);
    }
  };

  const listItem = (usedFor) => {
    const icon = usedFor === 'call' ? Images.loginCall : Images.loginEmail;
    const title = usedFor === 'call' ? detailInfo?.phone : detailInfo?.email;

    return (
      <View style={[styles.innerContainer]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* <CustomImage image={icon} imageHeight={48} imageWidth={48} /> */}
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: RfW(48),
              width: RfW(48),
              backgroundColor: isDarkMode ? Colors.darkModeButton : Colors.lightPurple
            }}>
            <CustomImage
              image={icon}
              imageHeight={20}
              imageWidth={20}
              tintColor={isDarkMode ? Colors.white : Colors.black}
            />
          </View>
          <TouchableOpacity
            style={{ paddingLeft: RfH(16) }}
            onPress={() => onPressOptions(usedFor)}>
            <CustomText
              color={Colors.white}
              fontSize={16}
              styling={{
                ...CommonStyles.regularFont400Style,
                lineHeight: RfH(20),
                textDecorationLine: 'underline'
              }}>
              {title || ''}
            </CustomText>
          </TouchableOpacity>
        </View>
        {usedFor === 'call' ? (
          <CustomText
            fontSize={12}
            styling={{
              ...CommonStyles.regularFont400Style,
              lineHeight: RfH(14.4),
              color: Colors.white
            }}>
            {localize('login.chargesApplicable')}
          </CustomText>
        ) : null}
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.modalForegroundColor
        }
      ]}>
      <View
        style={{
          alignItems: 'center',
          marginTop: -RfH(10),
          marginBottom: RfH(21)
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: RfW(60),
            width: RfW(60),
            backgroundColor: isDarkMode ? Colors.darkModeButton : Colors.lightPurple
          }}>
          <CustomImage
            image={Images.loginCallCenter}
            imageHeight={22}
            imageWidth={22}
            tintColor={isDarkMode ? Colors.white : Colors.black}
          />
        </View>
        <CustomText
          fontSize={20}
          color={Colors.white}
          styling={{
            ...CommonStyles.regularFont500Style,
            lineheight: RfH(22),
            paddingTop: RfH(30),
            paddingBottom: RfH(6)
          }}>
          {detailInfo?.title || ''}
        </CustomText>
        <CustomText
          fontSize={14}
          color={Colors.white}
          styling={{
            ...CommonStyles.regularFont400Style,
            lineheight: RfH(22),
            paddingHorizontal: RfW(50),
            textAlign: 'center'
          }}>
          {detailInfo?.subTitle || ''}
        </CustomText>
      </View>
      {listItem('call')}
      <View style={{ height: RfH(16) }} />
      {listItem('email')}
      <View style={{ paddingTop: RfH(50) }}>
        <AppPrimaryButton buttonText={localize('common.gotItC')} onPress={onPressGoit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: RfH(50),
    paddingHorizontal: RfW(24),
    backgroundColor: Colors.primaryContainerColor
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: RfH(8)
  }
});

export default CallCenterPopup;
