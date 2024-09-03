import { StyleSheet } from 'react-native';
import { Colors } from '../../theme';
import { RfW } from '../../utils/helper';
import { isDisplayWithNotch, RfH } from '../../utils/helpers';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.white,
    paddingTop: isDisplayWithNotch() ? RfH(30) : RfH(10),
    flex: 1
  },
  leaveBalLeftView: {
    flex: 1,
    paddingVertical: RfH(14),
    paddingLeft: RfW(17.47),
    borderRightColor: Colors.grayBorder,
    borderRightWidth: 0.5,
    width: '55%'
  },
  leaveBalRightView: {
    flex: 1,
    paddingVertical: RfW(14),
    paddingHorizontal: RfW(7),
    borderLeftColor: Colors.grayBorder,
    borderLeftWidth: 0.5,
    alignItems: 'center'
  },
  empDetailsLeftView: {
    flex: 1,
    marginTop: RfH(10),
    marginLeft: RfW(21)
  },
  empDetailsRightView: {
    flex: 1,
    marginTop: RfW(10),
    marginLeft: RfW(16)
  }
});

export default styles;
