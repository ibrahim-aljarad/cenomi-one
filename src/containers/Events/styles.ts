import { StyleSheet } from 'react-native';
import { Colors } from '../../theme';
import { BorderRadius } from '../../theme/sizes';
import { RfW, RfH } from '../../utils/helper';
import { isDisplayWithNotch } from '../../utils/helpers';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: isDisplayWithNotch() ? RfH(30) : RfH(10)
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
    paddingVertical: RfH(20),
    borderBottomWidth: 1,
    borderColor: Colors.grayBorder
  },
  mainView: {
    flex: 1
    // paddingTop: RfH(10),
  },

  categoryView: {
    height: RfH(31),
    borderRadius: RfH(15),
    marginHorizontal: RfW(5),
    paddingHorizontal: RfW(15),
    alignItems: 'center',
    justifyContent: 'center'
  },

  detailsCategoryView: {
    flexDirection: 'row',
    backgroundColor: Colors.voiletLight,

    marginTop: RfH(28),
    height: RfH(23),
    borderRadius: BorderRadius.BR0,
    paddingHorizontal: RfW(15),
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    flexWrap: 'wrap'
  },
  listView: {
    flex: 1
  }
});

export default styles;
