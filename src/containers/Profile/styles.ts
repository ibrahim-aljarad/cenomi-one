import { StyleSheet } from 'react-native';
import { RfH } from '../../utils/helpers';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },

  updatePictureView: {
    position: 'absolute',
    right: RfH(-10),
    bottom: RfH(-10),
    padding: RfH(10)
  }
});

export default styles;
