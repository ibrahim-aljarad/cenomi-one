import { StyleSheet, StatusBar, Platform } from 'react-native';
import { RfH, RfW } from '../../utils/helpers';
import { Colors, CommonStyles } from '../../theme';
import { getColorWithOpacity } from '../../utils/helper';

const styles = StyleSheet.create({
  mainContainer: {
    height: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
  },
  headerContainer: {
    paddingVertical: RfH(15),
    justifyContent: 'center',
    alignItems: 'center'
  },
  leftContainer: {
    position: 'absolute',
    paddingVertical: RfH(15),
    paddingHorizontal: RfW(18),
    left: RfW(5),
    justifyContent: 'center'
  },
  headerText: {
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginLeft: RfW(8)
    // textAlign: 'center',
  },
  rightContainer: {
    position: 'absolute',
    right: RfW(14),
    flexDirection: 'row',
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default styles;
