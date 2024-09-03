import { StyleSheet } from 'react-native';
import { Colors } from '../../../theme';
import { BorderRadius } from '../../../theme/sizes';
import { RfW } from '../../../utils/helper';

import { isDisplayWithNotch, RfH } from '../../../utils/helpers';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.white,
    // paddingTop: isDisplayWithNotch() ? RfH(30) : RfH(10),
    flex: 1
  },
  dateContainer: {
    paddingHorizontal: RfW(24)
  },
  dateBgContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.BR15,
    paddingVertical: RfH(21),
    paddingLeft: RfW(16),
    paddingRight: RfW(25),
    alignItems: 'center'
  }
});

export default styles;
