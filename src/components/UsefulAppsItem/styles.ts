import { StyleSheet } from 'react-native';
import { Colors } from '../../theme';
import { BorderRadius } from '../../theme/sizes';

import { RfW, RfH } from '../../utils/helpers';

const styles = StyleSheet.create({
  ocaAppCard: {
    borderRadius: BorderRadius.BR0,
    width: RfH(65),
    alignItems: 'center',
    justifyContent: 'center',
    height: RfH(65),
    backgroundColor: Colors.white
  }
});

export default styles;
