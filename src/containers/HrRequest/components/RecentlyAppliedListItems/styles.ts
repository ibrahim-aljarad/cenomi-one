import { Platform, StyleSheet } from 'react-native';
import { RfH, RfW } from '../../../../utils/helpers';
import { Colors, Fonts } from '../../../../theme';
import { BorderRadius } from '../../../../theme/sizes';

const styles = StyleSheet.create({
  requestCellView: {
    borderRadius: BorderRadius.BR15,
    backgroundColor: Colors.white,
    marginHorizontal: RfW(24),
    marginTop: RfH(23)
  },
  topHeader: {
    flex: 1,
    paddingTop: RfH(12),
    paddingBottom: RfH(12),
    borderBottomWidth: 1,
    borderColor: Colors.grayLine,
    alignItems: 'center',
    paddingRight: RfW(16),
    paddingLeft: RfW(16),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cellContainerView: {
    flex: 1,

    paddingTop: RfH(13),
    paddingHorizontal: RfW(16),
    paddingBottom: RfH(10)
  },
  imageStyle: {
    borderRadius: BorderRadius.BR0,
    overflow: 'visible',
    width: 'auto'
  },
  cell2ContainerView: {
    flex: 1,
    paddingTop: RfH(11),
    paddingBottom: RfH(20)
  },
  lisView: {
    backgroundColor: Colors.appBackground,
    flex: 1
  },
  desBold: {
    textTransform: 'uppercase',
    lineHeight: RfH(20)
  },
  dateTitle: {
    lineHeight: RfH(22)
  },
  desReg: {
    lineHeight: RfH(16)
  },
  dotView: {
    width: RfH(4),
    height: RfH(4),
    backgroundColor: Colors.black,
    borderRadius: RfH(2),
    marginRight: RfW(4),
    marginTop: RfH(7)
  },
  dateText: {
    fontFamily: Fonts.boldFont,
    lineHeight: RfH(16)
  },
  leftCellView: {},
  rightCellView: {
    // paddingLeft: RfH(16),
    // paddingRight: RfH(16),
    alignItems: 'flex-start',
    flex: 1
  },
  topTitle: {
    flex: 1,
    paddingTop: RfH(2)
  },
  imageView: {
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  statusButton: {
    flexDirection: 'row',
    paddingHorizontal: RfW(8),
    paddingVertical: RfH(4.5),
    borderRadius: BorderRadius.BR0,
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
