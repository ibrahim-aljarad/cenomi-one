import { StyleSheet } from 'react-native';
import { Colors, HEIGHT, WIDTH } from '../../theme';
import { RfH, RfW } from '../../utils/helpers';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  payButton: {
    backgroundColor: Colors.black,
    borderRadius: HEIGHT.H50,
    paddingVertical: HEIGHT.H16,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  whatsAppButton: {
    paddingHorizontal: WIDTH.W40,
    borderColor: Colors.separator,
    borderWidth: 1,
    borderRadius: WIDTH.W30,
    paddingVertical: HEIGHT.H12
  },
  payButtonContainer: {
    alignItems: 'center',
    paddingHorizontal: WIDTH.W36,
    paddingVertical: HEIGHT.H20,
    width: '100%'
  },

  container: {
    backgroundColor: Colors.white,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: RfW(32)
  },
  noBookingView: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
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
