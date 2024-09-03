import { StyleSheet, Platform } from 'react-native';
import { Colors, FontSize, HEIGHT, WIDTH, Fonts, CommonStyles } from '../../theme';
import { BorderRadius } from '../../theme/sizes';
import { RfH, RfW } from '../../utils/helper';
import { deviceHeight } from '../../utils/helpers';

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
    // fontFamily: Fonts.regular,
    // fontSize: FontSize[20],
    fontSize: 18,
    ...CommonStyles?.regularFont400Style,
    textAlign: 'center',
    // color: Colors.app_black,
    fontWeight: 'normal',
    fontStyle: 'normal',
    paddingVertical: HEIGHT.H16
  },
  label1: {
    fontFamily: Fonts.w,
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
  },

  container: {
    justifyContent: 'flex-end',
    margin: 0,
    flex: 1,
    backgroundColor: Colors.containerBackgroundColor // Colors.blueTen,
  },
  innerView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadius.BR0,
    borderTopRightRadius: BorderRadius.BR0,
    paddingBottom: RfH(30)
  },
  crossView: {
    // marginRight: RfW(-12),
    // padding: RfH(12),
    // position: 'absolute',
    // right: 0,
    // top: 20,
    // paddingVertical: RfH(25),
  },
  continueContainer: { marginHorizontal: RfW(15), marginTop: RfH(45) },
  headerText: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: RfH(25)
  },
  header: {
    paddingTop: RfH(12),
    paddingHorizontal: RfW(24),
    backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadius.BR0,
    borderTopRightRadius: BorderRadius.BR0
  },
  scrollView: {
    flex: 1,
    maxHeight: deviceHeight() - deviceHeight() / 4
  },
  dotView: {
    backgroundColor: Colors.grayScale,
    width: RfW(6),
    height: RfH(6),
    borderRadius: 3,
    marginTop: RfH(8),
    marginRight: RfW(10)
  }
});
