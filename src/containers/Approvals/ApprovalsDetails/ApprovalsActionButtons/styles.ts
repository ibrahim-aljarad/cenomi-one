import { StyleSheet } from 'react-native';
import { BorderRadius } from '../../../../theme/sizes';
import { RfH, RfW } from '../../../../utils/helpers';
import { Colors } from '../../../../theme';

const styles = StyleSheet.create({
  shadowView: {
    borderRadius: BorderRadius.BR0,
    shadowOffset: {
      width: 3,
      height: 4
    },
    shadowRadius: 12,
    shadowOpacity: 2,
    shadowColor: 'rgba(105,50,206,0.3)'
  },
  spaceHeight: {
    paddingTop: RfH(4)
  },
  statusButton: {
    flexDirection: 'row'
  },
  topTitle: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: RfH(21),
    paddingTop: RfH(16),
    borderColor: Colors.roxyBrown
  },
  headerTwoContainer: {
    marginTop: RfH(22),
    paddingTop: RfH(4),
    paddingBottom: RfH(22),

    borderRadius: BorderRadius.BR0
  }
});
export default styles;
