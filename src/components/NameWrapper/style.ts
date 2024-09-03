import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { STANDARD_SCREEN_SIZE } from '../../utils/constants';
import { Colors, Fonts } from '../../theme';

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    fontFamily: Fonts.regularFont,
    fontSize: RFValue(40, STANDARD_SCREEN_SIZE),
    fontWeight: 'bold',
    fontStyle: 'normal',
    color: Colors.primaryBlack,
    textAlign: 'center'
  }
});

export default styles;
