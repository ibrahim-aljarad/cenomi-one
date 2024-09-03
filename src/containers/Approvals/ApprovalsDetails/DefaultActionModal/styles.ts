import { StyleSheet, Platform } from 'react-native';
import { RfH, RfW } from '../../../../utils/helpers';
import { Colors } from '../../../../theme';
import { BorderRadius } from '../../../../theme/sizes';

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
    // paddingBottom: RfH(30),
    // minHeight: RfH(500),
  },
  header: {
    paddingTop: RfH(12),
    paddingHorizontal: RfW(24),
    backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadius.BR0,
    borderTopRightRadius: BorderRadius.BR0
  },

  remarkTextView: {
    borderColor: Colors.grayLight,
    borderWidth: RfH(1),
    borderRadius: BorderRadius.BR0,
    height: RfH(87),
    paddingVertical: Platform.OS === 'ios' ? RfH(8) : RfH(0)
  }
});

export default styles;
