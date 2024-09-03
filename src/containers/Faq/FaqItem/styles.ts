import { StyleSheet } from 'react-native';

import { BorderRadius } from '../../../theme/sizes';
import { RfH, RfW } from '../../../utils/helper';

const styles = StyleSheet.create({
  item_con: {
    padding: 15,
    marginHorizontal: RfW(20),
    marginBottom: RfH(16)
  },

  topTitle: {
    flex: 1,
    flexDirection: 'row'
  }
});
export default styles;
