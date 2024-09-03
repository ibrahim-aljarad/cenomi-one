import { StyleSheet } from 'react-native';
import { Colors } from '../../../theme';

import { isDisplayWithNotch, RfH } from '../../../utils/helpers';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.white,
    paddingTop: isDisplayWithNotch() ? RfH(30) : RfH(0),
    flex: 1
  }
});

export default styles;
