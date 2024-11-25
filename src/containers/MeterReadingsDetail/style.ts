import { StyleSheet } from 'react-native';
import { Colors } from '../../theme';
import { RfW, RfH } from '../../utils/helper';
import { BorderRadius, WIDTH } from '../../theme/sizes';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  scrollContainer: {
    paddingHorizontal: RfW(20),
    marginVertical: RfH(15),
    marginBottom: RfH(150),
  },
  uploadItemContainer: {
    borderRadius: BorderRadius.BR15,
    backgroundColor: Colors.white,
    padding: RfH(16),
    marginVertical: RfH(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  directionRowCenter: { flexDirection: 'row', alignItems: 'center' },
  submitButtonStyle: {
    backgroundColor: Colors.primary,
    paddingHorizontal: WIDTH.W20,
    marginHorizontal: RfH(20),
  },
});

export default styles;
