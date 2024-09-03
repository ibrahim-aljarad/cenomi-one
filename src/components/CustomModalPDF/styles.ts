import { StyleSheet } from 'react-native';
import { Colors } from '../../theme';
import { BorderRadius } from '../../theme/sizes';
import { RfH, RfW } from '../../utils/helper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  pdf: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  containertwo: {
    justifyContent: 'flex-end',
    margin: 0,
    flex: 1,
    width: '100%',
    height: '80%',
    backgroundColor: Colors.containerBackgroundColor // Colors.blueTen,
  },
  header: {
    paddingTop: RfH(12),
    paddingHorizontal: RfW(24),
    backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadius.BR0,
    borderTopRightRadius: BorderRadius.BR0
    // elevation:2,
  },
  innerView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '80%',
    backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadius.BR0,
    borderTopRightRadius: BorderRadius.BR0
    // paddingBottom: RfH(30)
  }
});

export default styles;
