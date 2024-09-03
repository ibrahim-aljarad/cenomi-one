import { StyleSheet } from 'react-native';
import { Colors } from '../../theme';

import { RfW, RfH } from '../../utils/helpers';

const styles = StyleSheet.create({
  badge: {
    height: RfH(22),
    width: RfH(22),
    borderRadius: RfH(22) / 2,
    top: RfH(4),
    left: RfH(50),
    position: 'absolute',
    backgroundColor: Colors.orange,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 8,
    shadowColor: Colors.platformShadowColor,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 9999,
    paddingHorizontal: RfW(1)
  }
});

export default styles;
