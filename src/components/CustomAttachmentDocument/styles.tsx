import { StyleSheet } from 'react-native';
import { RfH, RfW } from '../../utils/helper';
import { Colors } from '../../theme';
import { BorderRadius } from '../../theme/sizes';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: RfW(24),
    paddingTop: RfH(19)
  },
  documentItemContainer: {
    borderColor: Colors.grayBorder,
    borderWidth: RfH(1),
    borderRadius: BorderRadius.BR0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: RfH(16),
    paddingRight: RfW(10),
    paddingLeft: RfW(21),
    marginTop: RfH(12),
    backgroundColor: Colors.white
  },
  directionRowCenter: { flexDirection: 'row', alignItems: 'center' },
  uploadItemContainer: {
    borderRadius: BorderRadius.BR15,
    backgroundColor: Colors.white,
    padding: RfH(16),
    marginTop: RfH(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  addMoreTextContainer: {
    marginBottom: RfH(48),
    // width: '50%',
    // alignSelf: 'flex-end',
    marginTop: RfH(15)
  }
});

export default styles;
