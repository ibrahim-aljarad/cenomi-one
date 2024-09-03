import { StyleSheet, Platform } from 'react-native';
import { Colors, FontSize, HEIGHT, WIDTH, Fonts } from '../../theme';
import { RfH, RfW } from '../../utils/helper';

export const styles = StyleSheet.create({
  mainModal: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.windowTint,
    justifyContent: 'flex-end',
    borderWidth: 1
  },
  bottomContainer: {
    width: RfW(359),
    alignSelf: 'center',
    marginBottom: HEIGHT.H10
  },
  uploadMsgView: {
    borderRadius: WIDTH.W14,
    backgroundColor: Colors.primary
  },
  label: {
    fontFamily: Fonts.regular,
    fontSize: FontSize[20],
    textAlign: 'center',
    color: Colors.white,
    fontWeight: 'normal',
    fontStyle: 'normal',
    paddingVertical: HEIGHT.H16
  },
  label1: {
    fontFamily: Fonts.regular,
    fontSize: FontSize[13],
    fontWeight: '600',
    fontStyle: 'normal',
    textAlign: 'center',
    color: Colors.white,
    paddingVertical: HEIGHT.H16
  },
  saparator: {
    height: RfH(0.6),
    opacity: 0.5,
    backgroundColor: Colors.black
  },
  cancelView: {
    borderRadius: WIDTH.W14,
    marginTop: HEIGHT.H8,
    backgroundColor: Colors.primary
  },
  cancelLabel: {
    fontFamily: Fonts.regular,
    fontSize: FontSize[20],
    textAlign: 'center',
    color: Colors.white,
    fontWeight: 'normal',
    fontStyle: 'normal',
    paddingVertical: HEIGHT.H16
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.black,
    paddingTop: Platform.OS === 'ios' ? RfH(0) : HEIGHT.H10,
    justifyContent: 'space-between'
  },
  registrationContainer: {
    marginHorizontal: WIDTH.W36,
    backgroundColor: Colors.palette2,
    borderRadius: HEIGHT.H50,
    paddingVertical: HEIGHT.H18,
    alignItems: 'center'
  },
  registrationText: {
    fontFamily: Fonts.regular,
    fontSize: FontSize[13],
    fontWeight: 'bold',
    fontStyle: 'normal',
    color: Colors.white
  },
  imageView: {
    height: RfW(460),
    borderColor: Colors.lightGrey0,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: HEIGHT.H30
  },
  thumbView: {
    width: WIDTH.W74,
    height: WIDTH.W74,
    borderColor: Colors.darkGrey113,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: WIDTH.W16,
    borderWidth: RfW(1),
    marginRight: WIDTH.W16
  }
});
