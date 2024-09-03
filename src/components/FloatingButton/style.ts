import { Platform, StyleSheet } from 'react-native';
import { Colors, HEIGHT, WIDTH } from '../../theme';

const styles = StyleSheet.create({
  container: {
    // borderWidth: HEIGHT.H10,
    // borderColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    width: HEIGHT.H60,
    position: 'absolute',
    height: HEIGHT.H60,
    backgroundColor: Colors.black,
    borderRadius: 50,
    bottom: Platform.OS === 'ios' ? HEIGHT.H130 : HEIGHT.H110,
    right: WIDTH.W30,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13
  }
});

export default styles;
