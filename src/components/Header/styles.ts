import { StyleSheet } from 'react-native';
import { Colors, FontSize, HEIGHT, Fonts } from '../../theme';
import { RfH, RfW } from '../../utils/helper';

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingTop: HEIGHT.H10,
    justifyContent: 'space-between',
    borderBottomWidth: 0.3,
    borderBottomColor: Colors.border
  },
  headerText: {
    fontFamily: Fonts.regular,
    fontSize: FontSize[17],
    fontWeight: 'bold',
    fontStyle: 'normal',
    color: Colors.black,
    textAlign: 'center'
  },
  subTitleText: {
    fontFamily: Fonts.regular,
    fontSize: FontSize[13],
    fontWeight: 'normal',
    fontStyle: 'normal',
    color: Colors.textGrey,
    textAlign: 'center'
  },
  leftContainer: {
    position: 'absolute',
    paddingVertical: RfH(15),
    paddingHorizontal: RfW(18),
    left: RfW(5),
    justifyContent: 'center'
  }
});

export default styles;
