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
  no_faq_con: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: Colors.grayBorder,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    paddingVertical: RfH(15),
    lineHeight: RfH(25),
    paddingHorizontal: RfW(20)
  },
  headerrowCon: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: Colors.grayBorder,
    backgroundColor: Colors.grey9
  }
});

export default styles;
