import { StyleSheet, Dimensions } from 'react-native';
import { RfH, RfW } from '../../utils/helpers';
import { Colors } from '../../theme';
import { BorderRadius } from '../../theme/sizes';

const styles = StyleSheet.create({
  sliderCard: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: RfW(6),
    overflow: 'hidden'
    // padding: RfH(2)
  },
  commItemShadow: {
    width: RfW(100),
    justifyContent: 'flex-end',
    paddingHorizontal: RfW(10),
    paddingVertical: RfH(10),
    borderRadius: BorderRadius.BR10
  },
  gridItemView: {
    width: (Dimensions.get('window').width - RfW(48)) / 4,
    paddingHorizontal: RfW(12),
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    flex: 1,
    // justifyContent: 'space-evenly',
    marginBottom: RfH(17)
  },
  serviceRequestContainerImage: {
    borderRadius: BorderRadius.BR0,
    paddingHorizontal: RfW(9),
    paddingVertical: RfH(8),
    alignItems: 'center',
    width: RfW(154),
    height: RfW(64)
  },
  expoTouchViewNew: {
    borderRadius: BorderRadius.BR0,
    overflow: 'hidden',
    //  marginRight: RfW(24),
    width: Dimensions.get('window').width - RfW(70),
    marginTop: RfH(15),
    height: RfH(145),
    justifyContent: 'center',
    alignItems: 'center'
  },
  ocaAppContainer: {
    marginLeft: RfW(12),
    flex: 1,
    alignItems: 'center'
  },
  offerCardContainerImage: {
    borderRadius: BorderRadius.BR0,
    width: RfW(148)
  },
  propertyCardContainerImage: {
    borderRadius: BorderRadius.BR0,
    width: RfW(205)
  },
  advantageLogoView: {
    position: 'absolute',
    top: RfH(80),
    right: RfW(12),
    zIndex: 1,
    backgroundColor: Colors.white,
    borderColor: Colors.black,
    borderWidth: RfH(1),
    borderRadius: BorderRadius.BR0,
    overflow: 'hidden',
    height: RfH(30),
    width: RfH(30),
    justifyContent: 'center',
    alignItems: 'center',
    padding: RfH(2)
  },
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
