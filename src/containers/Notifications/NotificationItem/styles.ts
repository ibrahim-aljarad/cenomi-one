import { StyleSheet } from 'react-native';

import { Colors } from '../../../theme';
import { BorderRadius } from '../../../theme/sizes';
import { RfH, RfW } from '../../../utils/helper';

const styles = StyleSheet.create({
  lisView: {
    backgroundColor: Colors.appBackground,
    flex: 1
  },
  item_con: {
    padding: 12,
    marginHorizontal: RfW(24),
    marginVertical: RfH(10),
    borderRadius: BorderRadius.BR0
    // borderWidth: 1
  },
  dotView: {
    backgroundColor: Colors.orange,
    width: RfW(6),
    height: RfH(6),
    borderRadius: BorderRadius.BR5
  },

  rightCellView: {
    // paddingLeft: RfH(16),
    // paddingRight: RfH(16),
    alignItems: 'flex-start',
    flex: 1
  },
  topTitle: {
    flex: 1,
    flexDirection: 'row'
  },

  progressView: {
    flexDirection: 'row',
    width: '60%',
    flexWrap: 'wrap',
    justifyContent: 'flex-end'
  }
});
export default styles;
