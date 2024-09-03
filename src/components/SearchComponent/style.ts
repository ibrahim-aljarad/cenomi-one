import { StyleSheet } from 'react-native';
import { RfH, RfW } from '../../utils/helpers';
import { Colors, Fonts } from '../../theme';
import { RFValue } from 'react-native-responsive-fontsize';
import { STANDARD_SCREEN_SIZE } from '../../utils/constants';
import { BorderRadius } from '../../theme/sizes';

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.BR10,
    paddingHorizontal: RfW(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // borderColor:Colors.grayLight,
    // borderWidth:1,
    paddingVertical: RfH(9),
    marginHorizontal: RfW(24),
    backgroundColor: Colors.graySevenLight
  },
  textStyle: {
    marginHorizontal: RfW(10),
    fontFamily: Fonts.mediumFont,
    fontSize: RFValue(16, STANDARD_SCREEN_SIZE),
    fontWeight: 'normal',
    fontStyle: 'normal',
    // lineHeight: 22,
    // letterSpacing: -0.41,
    textAlign: 'left',
    color: Colors.blackSecondary,
    flex: 1,
    padding: 0
    // backgroundColor:'green'
  },
  placeholderTextStyle: {
    marginHorizontal: RfW(10),
    fontFamily: Fonts.regularFont,
    fontSize: RFValue(16, STANDARD_SCREEN_SIZE),
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 22,
    // letterSpacing: -0.41,
    textAlign: 'left',
    color: Colors.grayLight,
    flex: 1,
    padding: 0
  }
});

export default styles;
