import { StyleSheet, Platform } from 'react-native';

import { deviceHeight, RfH, RfW } from '../../../../utils/helpers';
import { Colors } from '../../../../theme';
import { BorderRadius } from '../../../../theme/sizes';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    margin: 0,
    flex: 1,
    backgroundColor: Colors.containerBackgroundColor // Colors.blueTen,
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
  }
});

export default styles;
