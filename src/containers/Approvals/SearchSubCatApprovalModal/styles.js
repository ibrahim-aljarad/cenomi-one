import { StyleSheet, Dimensions, Platform } from 'react-native';
import { RfH, RfW, isDisplayWithNotch } from '../../../utils/helpers';
import { Colors, Fonts, CommonStyles } from '../../../theme';
import { RFValue } from 'react-native-responsive-fontsize';
import { STANDARD_SCREEN_SIZE } from '../../../utils/constants';
import { BorderRadius } from '../../../theme/sizes';

const styles = StyleSheet.create({
  container: {
    paddingTop: isDisplayWithNotch() ? RfH(20) : Platform.OS === 'ios' ? RfH(15) : RfH(0),
    flex: 1,
    backgroundColor: Colors.white
  },
  innerView: {
    flex: 1,
    paddingTop: RfH(35),
    paddingHorizontal: RfW(24)
  },
  searchContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.BR0,
    paddingLeft: RfW(20),
    paddingRight: RfW(11),
    backgroundColor: 'rgba(48,47,76,0.05)',
    marginTop: RfH(20),
    marginBottom: RfH(28)
  },
  textStyle: {
    flex: 1,
    marginLeft: RfW(10),
    fontFamily: Fonts.regularFont,
    fontSize: RFValue(16, STANDARD_SCREEN_SIZE),
    fontStyle: 'normal',
    textAlign: 'left',
    color: Colors.blackFour,
    paddingVertical: Platform.OS === 'ios' ? RfH(11) : RfH(8),
    ...CommonStyles.regularFontStyle
  },
  header: {
    paddingVertical: RfH(24),
    paddingHorizontal: RfW(24),
    backgroundColor: Colors.white,
    shadowColor: 'rgba(96,70,51,0.09)',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 6,
    shadowOpacity: 1,
    borderTopLeftRadius: BorderRadius.BR0,
    borderTopRightRadius: BorderRadius.BR0,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  gridItemView: {
    marginHorizontal: 10,
    width: (Dimensions.get('window').width - 104) / 4,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default styles;
