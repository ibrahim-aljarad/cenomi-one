import { StyleSheet, Platform } from 'react-native';

import { deviceHeight, RfH, RfW } from '../../utils/helpers';
import { Colors } from '../../theme';
import { BorderRadius } from '../../theme/sizes';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    margin: 0,
    flex: 1,
    backgroundColor: Colors.modalLayoutColor // Colors.blueTen,
  },
  innerView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadius.BR0,
    borderTopRightRadius: BorderRadius.BR0
    // paddingBottom: RfH(30)
  },
  crossView: {
    marginRight: RfW(-12),
    padding: RfH(12),
    position: 'absolute',
    right: 0,
    top: 24
  },
  continueContainer: { marginHorizontal: RfW(15), marginTop: RfH(45) },
  headerText: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: RfH(25)
  },
  header: {
    paddingTop: RfH(12),
    paddingHorizontal: RfW(24),
    backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadius.BR0,
    borderTopRightRadius: BorderRadius.BR0
    // elevation:2,
  },
  scrollView: {
    flex: 1,
    maxHeight: deviceHeight() - deviceHeight() / 4
  },
  dotView: {
    backgroundColor: Colors.grayScale,
    width: RfW(6),
    height: RfH(6),
    borderRadius: 3,
    marginTop: RfH(8),
    marginRight: RfW(10)
  }
});

export default styles;
