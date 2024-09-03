import { StyleSheet } from 'react-native';
import { Colors, HEIGHT, WIDTH } from '../../theme';
import { RfH, RfW } from '../../utils/helpers';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.transparent,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: RfW(32)
  },
  noBookingView: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerContainer: {
    paddingHorizontal: WIDTH.W24,
    paddingVertical: WIDTH.W32
  },
  headerContainer1: { justifyContent: 'center', alignItems: 'center' },
  bottomBtnContainer: {
    width: '100%',
    position: 'absolute',
    bottom: RfH(36)
  }
});

export default styles;
