import { StyleSheet } from 'react-native';
import { Colors, FontSize, Fonts, HEIGHT, WIDTH } from '../../../theme';

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Colors.black,
    borderRadius: HEIGHT.H50,
    paddingVertical: HEIGHT.H14,
    marginHorizontal: WIDTH.W36,
    marginVertical: HEIGHT.H20,
    marginBottom: HEIGHT.H10
  },
  buttonLabel: {
    fontFamily: Fonts.regularFont,
    fontSize: FontSize[14],
    fontWeight: 'bold',
    fontStyle: 'normal',
    color: Colors.white,
    textAlign: 'center'
  },
  disabledButton: {
    backgroundColor: Colors.lightGrey219,
    opacity: 0.7
  },
  disabledText: {
    color: Colors.app_black,
    opacity: 0.7
  }
});
export default styles;
