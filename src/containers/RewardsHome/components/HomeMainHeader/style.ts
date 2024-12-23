import { Platform, StatusBar, StyleSheet } from 'react-native';
import { Colors } from '../../../../theme';
import { RfH, RfW, isDisplayWithNotch } from '../../../../utils/helpers';

const styles = StyleSheet.create({
  mainContainer: {
    height: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop:
      Platform.OS === 'ios'
        ? isDisplayWithNotch()
          ? RfH(50)
          : RfH(60)
        : isDisplayWithNotch()
        ? RfH(20)
        : RfH(17),
    paddingBottom: RfH(15),
    // borderBottomRightRadius:22,
    // borderBottomLeftRadius:22,
    justifyContent: 'space-between'
  },
  leftContainer: {
    flex: 1,
    paddingLeft: RfW(24),
    flexDirection: 'row',
    alignItems: 'center'
  },
  badge: {
    height: RfH(8),
    width: RfH(8),
    borderRadius: RfH(8) / 2,
    top: RfW(4),
    right: RfW(4),
    position: 'absolute',
    backgroundColor: 'rgba(235,95,44,0.8)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightContainer: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: RfH(10),
    height: RfH(40),
    width: RfH(40),
    marginHorizontal: RfW(12),
    justifyContent: 'center'
  },
  rightContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: RfW(24)
  },
  employeeCardIcon: {
    paddingHorizontal: RfW(10),
    marginRight: RfW(15)
  },
  notificationIcon: {
    // marginRight: RfW(5),
  },
  leftIconContainer: {
    // borderWidth: RfH(2),
    // borderColor: Colors.primary,
    // borderRadius: RfH(48) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: RfH(2)
  },
  headerTextContainer: {
    paddingHorizontal: RfW(10),
    justifyContent: 'center'
  },
  headerSubTextContainer: {
    flexDirection: 'row',
    alignItems: 'center'
    // width: '70%'
  }
});

export default styles;
