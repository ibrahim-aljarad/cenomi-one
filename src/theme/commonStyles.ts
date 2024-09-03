import { FontSize, WIDTH } from './sizes';
import { Platform, StyleSheet } from 'react-native';

import Colors from './colors';
import Font from './fonts';
import { RFValue } from 'react-native-responsive-fontsize';
import { RfW } from '../utils/helper';
import { STANDARD_SCREEN_SIZE } from '../utils/constants';

const CommonStyles = StyleSheet.create({
  inputLabelStyle: {
    fontSize: RFValue(12, STANDARD_SCREEN_SIZE),
    fontWeight: 'normal',
    fontFamily: Font.regularFont,
    fontStyle: 'normal',
    color: Colors.coolGrey
  },
  timeSlotStyle: {
    fontFamily: Font.regularFont,
    fontSize: RFValue(12, STANDARD_SCREEN_SIZE),
    fontWeight: 'normal',
    fontStyle: 'normal',
    color: Colors.coolGrey
  },
  inputColorDark: {
    color: Colors.blueFive,
    fontSize: 14,
    fontFamily: Font.regularFont
  },
  inputStyle: {
    fontSize: RFValue(14, STANDARD_SCREEN_SIZE),
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontFamily: Font.regularFont,
    color: Colors.blueEight,
    paddingHorizontal: WIDTH.W14
  },
  descriptionInputText: {
    fontFamily: Font.regularFont,
    fontSize: RFValue(15, STANDARD_SCREEN_SIZE),
    fontWeight: 'normal',
    color: Colors.black,
    paddingLeft: WIDTH.W10,
    fontStyle: 'italic',
    flex: 1,
    textAlignVertical: 'top'
  },
  dateSelectStyle: {
    fontSize: FontSize[12],
    color: Colors.grayLight
    // fontFamily: Font.regular,
    // fontSize: RFValue(12, STANDARD_SCREEN_SIZE),
    // fontWeight: 'normal',
    // fontStyle: 'normal',
    // color: Colors.coolGrey,
    // lineHeight:RfH(16)
    // backgroundColor:'red'
  },
  inputLabelOptionalStyle: {
    fontFamily: Font.regularFont,
    fontSize: RFValue(15, STANDARD_SCREEN_SIZE),
    fontStyle: 'italic',
    color: Colors.coolGrey
  },
  inputTextStyle: {
    color: Colors.grayLight,
    padding: 0,
    fontSize: RFValue(16, STANDARD_SCREEN_SIZE),
    lineHeight: RFValue(14, STANDARD_SCREEN_SIZE)
  },
  regularFontStyle: {
    fontWeight: 'normal',
    fontFamily: Font.regularFont
  },
  regularFont400Style: {
    fontWeight: '400',
    fontFamily: Font.regularFont
  },
  regularFont500Style: {
    fontWeight: '500',
    fontFamily: Font.regularFont
  },
  regularFont600Style: {
    fontWeight: '600',
    fontFamily: Font.regularFont
  },
  boldFontStyle:
    Platform.OS === 'ios'
      ? {
          fontWeight: 'bold',
          fontFamily: Font.boldFont
        }
      : {
          fontFamily: Font.boldFont
        },
  mediumFontStyle:
    Platform.OS === 'ios'
      ? {
          fontWeight: '500',
          fontFamily: Font.regularFont
        }
      : {
          fontFamily: Font.mediumFont
        },
  semiboldFontStyle:
    Platform.OS === 'ios'
      ? {
          fontWeight: '600',
          fontFamily: Font.regularFont
        }
      : {
          fontFamily: Font.semiBoldFont
        },
  card_elevation: {
    shadowOffset: { width: 0, height: 2 },
    shadowColor: Colors.hexBlack,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5
  },
  card_elevation_s: {
    shadowOffset: { width: 0, height: 1 },
    shadowColor: Colors.hexBlack,
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1
  },
  card_elevation_t: {
    shadowOffset: { width: 4, height: 4 },
    shadowColor: Colors.hexBlack,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5
  },
  paddingHorizontal_default: { paddingHorizontal: RfW(16) },
  marginHorizontal_default: { marginHorizontal: RfW(16) },
  absolute: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
});
export default CommonStyles;
