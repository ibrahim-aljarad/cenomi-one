import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RfH, RfW, getColorWithOpacity } from '../../../utils/helper';
import { Colors, CommonStyles, Images } from '../../../theme';
import { CustomImage, CustomText } from '../../../components';
import { isRTL, localize } from '../../../locale/utils';
import { BorderRadius } from '../../../theme/sizes';

const NeedHelpPopup = (props: any) => {
  const { onPressOptions, isDarkMode } = props || {};
  const listItem = (usedFor) => {
    const icon = usedFor === 'faq' ? Images.loginFaq : Images.loginForgotPassword;
    const title =
      usedFor === 'faq' ? localize('common.faqHelp') : localize('common.forgotpassword');
    const subTitle =
      usedFor === 'faq'
        ? localize('login.findAnswerToFaq')
        : localize('login.resetYourPasswordHere');

    const darkCard = {
      backgroundColor: isDarkMode
        ? Colors.darkModeButton
        : getColorWithOpacity(Colors.midnightExpress, 0.24),
      borderRadius: BorderRadius.BR15
    };

    return (
      <TouchableOpacity
        style={[styles.innerContainer, darkCard]}
        onPress={() => onPressOptions(usedFor)}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: RfW(48),
              width: RfW(48)
            }}>
            <CustomImage
              image={icon}
              imageHeight={30}
              imageWidth={30}
              tintColor={isDarkMode ? Colors.white : Colors.white}
            />
          </View>
          <View style={{ paddingLeft: RfH(16) }}>
            <CustomText
              color={Colors.white}
              fontSize={16}
              styling={{
                ...CommonStyles.regularFont400Style,
                lineHeight: RfH(20)
              }}>
              {title || ''}
            </CustomText>
            <CustomText
              fontSize={12}
              styling={{
                ...CommonStyles.regularFont400Style,
                lineheight: RfH(14.4),
                paddingTop: RfH(3),
                color: getColorWithOpacity(Colors.white, 0.75)
              }}>
              {subTitle || ''}
            </CustomText>
          </View>
        </View>
        <CustomImage
          image={isRTL() ? Images.arrowLeft : Images.arrowRight}
          imageHeight={15}
          imageWidth={13}
          imageResizeMode={'contain'}
          tintColor={isDarkMode ? Colors.white : Colors.white}
        />
      </TouchableOpacity>
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
      {listItem('forgotPassword')}
      <View style={{ height: RfH(16) }} />
      {listItem('faq')}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: RfH(50),
    paddingHorizontal: RfW(24)
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingVertical: RfH(8),
    paddingLeft: RfH(8),
    paddingRight: RfH(20)
  }
});

export default NeedHelpPopup;
