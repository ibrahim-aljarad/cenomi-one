import { StyleSheet } from 'react-native';
import { Colors } from '../../theme';
import { RfW, RfH } from '../../utils/helper';
import { BorderRadius, WIDTH } from '../../theme/sizes';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  stepperNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: RfH(20),
    paddingHorizontal: RfW(100)
  },
  stepperButton: {
    margin:20,
    width: RfW(30),
    height: RfW(30),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 1000,
  },
  stepperText: {
    color: 'white'
  },
  stepperDisableText: {
    color: 'gray'
  },
  stepperTextActive: {
    color: 'black'
  },
  item_con: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: RfW(24),
    paddingVertical: RfH(20)
  },
  no_faq_con: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: Colors.grayBorder,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    paddingVertical: RfH(15),
    lineHeight: RfH(25),
    paddingHorizontal: RfW(20)
  },
  headerrowCon: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: Colors.grayBorder,
    backgroundColor: Colors.grey9
  },
  paddingContainer: {
    paddingHorizontal: RfW(20),
    marginVertical: RfH(15),
  },
  scrollContainer: {
    paddingHorizontal: RfW(20),
    marginVertical: RfH(15),
    marginBottom: RfH(150),
  },
  borderSperator:{
    borderTopColor: Colors.lightGrey219,
    borderTopWidth: 1
  },
  formDropdown: {
    marginVertical: RfH(15),
  },
  scrollContainer: {
    marginBottom: RfH(25),
  },
  directionRowCenter: { flexDirection: 'row', alignItems: 'center' },
  uploadItemContainer: {
    borderRadius: BorderRadius.BR15,
    backgroundColor: Colors.white,
    padding: RfH(16),
    marginVertical: RfH(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  buttonStyle: {
    backgroundColor: Colors.primary,
    paddingHorizontal: WIDTH.W20,
    marginHorizontal: RfH(20),
  },
  continueButtonStyle: {
    backgroundColor: Colors.primary,
    paddingHorizontal: WIDTH.W20,
    marginHorizontal: 0,
  },
  takeImage: {
    flex: 1,
    marginVertical: RfH(25),
    alignSelf: 'center'
  }
});

export default styles;
