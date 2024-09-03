import { StyleSheet } from 'react-native';
import { Colors } from '../../theme';
import { RfW } from '../../utils/helper';
import { isDisplayWithNotch, RfH } from '../../utils/helpers';
import { BorderRadius } from '../../theme/sizes';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.white,
    paddingTop: isDisplayWithNotch() ? RfH(30) : RfH(10),
    flex: 1
  },
  iconbg: {
    backgroundColor: Colors.voiletLight,
    height: RfH(48),
    width: RfW(48),
    flexDirection: 'row',
    borderRadius: BorderRadius.BR0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default styles;
