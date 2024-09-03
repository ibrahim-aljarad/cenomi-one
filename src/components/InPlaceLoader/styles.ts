import { StyleSheet } from 'react-native';
import { Colors, HEIGHT, WIDTH } from '../../theme';

const styles = StyleSheet.create({
  modalBackground: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    flex: 1,
    zIndex: 999999999,
    elevation: 1,
    width: '100%',
    top: 0,
    bottom: 0
  },
  activityIndicatorWrapper: {
    backgroundColor: Colors.white,
    height: HEIGHT.H100,
    width: WIDTH.W160,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    marginTop: 5,
    color: Colors.backgroundYellow,
    textAlign: 'center',
    letterSpacing: -0.5
  }
});

export default styles;
