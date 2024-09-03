import { StyleSheet } from 'react-native';
import { Colors, HEIGHT, WIDTH } from '../../theme';

const styles = StyleSheet.create({
  calendarContainer: {
    marginTop: HEIGHT.H22,
    borderRadius: HEIGHT.H20,
    borderColor: Colors.grey,
    paddingBottom: HEIGHT.H10,
    paddingHorizontal: HEIGHT.H20
  },
  dateContainer: {
    height: WIDTH.W40,
    width: WIDTH.W40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.white
  },
  dotContainer: {
    height: HEIGHT.H10,
    width: HEIGHT.H10,
    borderRadius: HEIGHT.H5,
    backgroundColor: Colors.backgroundYellow,
    position: 'absolute',
    top: HEIGHT.H3,
    right: HEIGHT.H3
  }
});

export default styles;
