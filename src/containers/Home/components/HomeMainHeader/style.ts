import { Platform, StatusBar, StyleSheet } from 'react-native';
import { RfH, RfW } from '../../../../utils/helpers';

import { Colors } from '../../../../theme';

const styles = StyleSheet.create({
  mainContainer: {
    height: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: RfH(10),
    justifyContent: 'space-between',
    marginHorizontal: RfW(24),
    marginTop: RfH(Platform.OS === 'ios' ? 60 : 24),
    borderRadius: RfW(10)
  },
  leftContainer: {
    flex: 1,
    paddingLeft: RfW(16),
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
    paddingRight: RfW(16)
  },
  employeeCardIcon: {
    paddingHorizontal: RfW(10),
    marginRight: RfW(15)
  },
  notificationIcon: {
    marginTop: RfH(5)
  },
  leftIconContainer: {
    // borderWidth: RfH(2),
    // borderColor: Colors.primary,
    // borderRadius: RfH(48) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: RfH(4)
  },
  headerTextContainer: {
    paddingHorizontal: RfW(10),
    justifyContent: 'center',
    width: '85%'
  },
  headerSubTextContainer: {
    // flexDirection: 'row',
    // alignItems: 'center'
  }
});

export default styles;
