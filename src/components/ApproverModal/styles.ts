import { StyleSheet } from 'react-native';
import { Colors } from '../../theme';
import { BorderRadius } from '../../theme/sizes';
import { RfH, RfW } from '../../utils/helper';


const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      popoverContent: {
        backgroundColor: Colors.white,
        padding: RfH(16),
        borderRadius: BorderRadius.BR15,
        width: '80%',
        alignItems: 'center',
      },
      statusContainer: {
        marginTop: RfH(8),
        paddingHorizontal: RfW(12),
        paddingVertical: RfH(4),
        borderRadius: RfH(12),
        borderWidth: 1,
      },
});

export default styles;
