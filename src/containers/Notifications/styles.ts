import { StyleSheet } from 'react-native';
import { Colors } from '../../theme';
import { RfW, RfH } from '../../utils/helper';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  item_con: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: RfW(24),
    paddingVertical: RfH(20)
  },
  notification_Settings_con: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: RfW(24),
    paddingVertical: RfH(20)
  }
});

export default styles;
