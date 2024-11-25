import { Platform, StyleSheet } from 'react-native';
import { RfH, RfW } from '../../../utils/helpers';
import { Colors } from '../../../theme';
import { BorderRadius } from '../../../theme/sizes';
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },

  timeSheetCardContainer: {
    marginTop: RfH(22),
    paddingVertical: RfH(21),
    minHeight: RfH(50),
    backgroundColor: Colors.white,
    shadowColor: Colors.platformShadowColor,
    borderRadius: BorderRadius.BR0,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 0.1,
    shadowOpacity: 0.2
  },

  statusButton: {
    flexDirection: 'row'
  },
  topTitle: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: RfH(21),
    borderColor: Colors.roxyBrown
  },
  spaceHeight: {
    paddingTop: RfH(4)
  },
  labelView: {
    paddingHorizontal: RfH(21),
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  itemView: {
    paddingTop: RfH(21),
    paddingHorizontal: RfH(21),
    backgroundColor: 'transparent'
  },
  buttonView: { paddingHorizontal: RfW(8), marginTop: RfH(21) },
  lineHeight: {
    height: 1,
    backgroundColor: Colors.lightCyan
  },
  bottomButtonContainer: {
    borderTopLeftRadius: RfW(20),
    borderTopRightRadius: RfW(20),
    paddingHorizontal: RfW(5),
    paddingTop: RfH(10),
    paddingBottom: RfH(20),
    backgroundColor: Colors.white,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: -3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.1)',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
      },
    }),
}
});
export default styles;
