import { StyleSheet } from 'react-native';
import { RfH } from '../../utils/helper';

const styles = StyleSheet.create({
  lottieContainer: {
    flex: 1,
    top: '50%',
    position: 'absolute',
    zIndex: 99,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  lottieStyle: {
    height: RfH(80),
    width: RfH(80),
    alignSelf: 'center'
  },
  videoPlayerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default styles;
