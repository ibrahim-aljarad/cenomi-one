import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../theme';
import { RfH, isDisplayWithNotch } from '../../utils/helpers';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.white,
    paddingTop: isDisplayWithNotch() ? RfH(30) : RfH(10),
    flex: 1
  },
  gridItemView: {
    marginHorizontal: 10,
    width: (Dimensions.get('window').width - 104) / 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  gridItemView2: {
    marginHorizontal: 10,
    width: (Dimensions.get('window').width - 104) / 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: RfH(-30)
  }
});

export default styles;
