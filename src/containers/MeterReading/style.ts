import { StyleSheet } from 'react-native';
import { Colors } from '../../theme';
import { BorderRadius } from '../../theme/sizes';
import { RfW, RfH, getColorWithOpacity } from '../../utils/helper';

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
    },
    srDetailItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: RfH(10),
    },
    srDetailLabel: {
      fontWeight: "bold",
    },
    srDetailValue: {
      color: Colors.darkGray,
    },
    meterCountContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: RfH(15),
    },
    meterCountLabel: {
      fontWeight: 'bold',
    },
    meterCountValue: {
      color: Colors.primary,
    },
    meterItemContainer: {
      padding: RfH(15),
      borderBottomWidth: 1,
      borderBottomColor: Colors.white,
    },
    meterItemContent: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    flatListContainer: {
      paddingHorizontal: RfW(15),
    },
    item_con: {
        flexDirection: "row",
        marginVertical: RfH(8),
        borderRadius: BorderRadius.BR15,
        paddingHorizontal: RfH(10),
        paddingVertical: RfH(15),
      },
      statusPill: {
        alignSelf: "flex-start",
        paddingHorizontal: RfW(12),
        paddingVertical: RfH(4),
        borderRadius: RfH(12),
        borderWidth: 1,
        backgroundColor: getColorWithOpacity("#7716FF", 0.1),
      },
  }
)

export default styles;
