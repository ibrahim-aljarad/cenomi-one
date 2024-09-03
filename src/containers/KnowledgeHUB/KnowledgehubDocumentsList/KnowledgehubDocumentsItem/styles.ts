import { StyleSheet } from 'react-native';

import { Colors } from '../../../../theme';
import { BorderRadius } from '../../../../theme/sizes';
import { RfH } from '../../../../utils/helper';

const styles = StyleSheet.create({
  lisView: {
    backgroundColor: Colors.appBackground,
    flex: 1
  },
  item_con: {
    paddingVertical: 12,
    height: RfH(64),
    borderRadius: BorderRadius.BR0,
    borderBottomWidth: 1,
    borderColor: Colors.grayBorder
  },

  rightCellView: {
    // paddingLeft: RfH(16),
    // paddingRight: RfH(16),
    alignItems: 'flex-start',
    flex: 1
  },
  topTitle: {
    marginHorizontal: RfH(4),
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },

  progressView: {
    flexDirection: 'row',
    width: '60%',
    flexWrap: 'wrap',
    justifyContent: 'flex-end'
  }
});
export default styles;
