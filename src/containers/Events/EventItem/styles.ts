import { Platform, StyleSheet } from 'react-native';

import { Colors, Fonts } from '../../../theme';
import { BorderRadius } from '../../../theme/sizes';
import { RfH, RfW } from '../../../utils/helper';

const styles = StyleSheet.create({
  lisView: {
    backgroundColor: Colors.appBackground,
    flex: 1
  },
  item_con: {
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    height: RfH(208),
    marginVertical: RfH(8),
    borderRadius: BorderRadius.BR12,
    alignItems: 'center',
    justifyContent: 'center'
  },

  progressView: {
    flexDirection: 'row',
    width: '60%',
    flexWrap: 'wrap',
    justifyContent: 'flex-end'
  },
  commItemShadow: {
    justifyContent: 'flex-end',
    paddingHorizontal: RfW(24),
    paddingBottom: RfH(24),
    borderRadius: BorderRadius.BR0
  },
  titleSubTitleContainer: {
    // position: 'absolute',
    // bottom: -RfH(15),
    // flex: 1,
    // width: '100%',
    // padding: RfW(5)
    justifyContent: 'flex-end',
    flex: 1
  },
  titleSubTitleContainer1: {
    position: 'absolute',
    bottom: -RfH(15),
    // flex: 1,
    width: '100%'
  },
  titleContainer: {
    // backgroundColor: Colors.white,
    // paddingHorizontal: RfW(15),
    // paddingVertical: RfH(21.5),
    // borderRadius: BorderRadius.BR12
    backgroundColor: Colors.white,
    paddingHorizontal: RfW(10),
    paddingVertical: RfH(14),
    borderRadius: BorderRadius.BR12,
    margin: RfW(5)
  },
  titleContainer1: {
    backgroundColor: Colors.white,
    paddingHorizontal: RfW(15),
    paddingVertical: RfH(21.5),
    borderBottomLeftRadius: BorderRadius.BR12,
    borderBottomRightRadius: BorderRadius.BR12
  },
  imageContainer: {
    borderRadius: BorderRadius.BR12,
    flex: 1,
    marginTop: RfH(15)
  }
});
export default styles;
