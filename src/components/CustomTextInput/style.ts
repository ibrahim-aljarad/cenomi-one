import { StyleSheet } from 'react-native';
import { Colors, CommonStyles } from '../../theme';

const styles = StyleSheet.create({
  textInputContainer: {
    marginTop: 28
  },
  labelViewStyle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputStyle: {
    fontSize: 16,
    flex: 1,
    width: '100%',
    // fontWeight: 'normal',
    // fontStyle: 'normal',
    textAlign: 'left',
    color: Colors.black,
    padding: 0,
    ...CommonStyles.regularFont400Style
  },
  textInputInnerContainer: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: Colors.grey
  },
  iconContainer: {
    paddingLeft: 16,
    paddingBottom: 12,
    justifyContent: 'center'
    // paddingRight: 5
  },
  iconStyle: {
    width: 20,
    height: 16,
    resizeMode: 'contain'
  },
  errorTextStyle: {
    fontSize: 15,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 22,
    marginTop: 10,
    letterSpacing: 0,
    textAlign: 'left',
    color: Colors.formErrors
  },
  infoIconStyle: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginLeft: 10
  },
  detailIconStyle: {
    width: 18,
    height: 18,
    marginRight: 5
  },
  inputLabelOptionalStyle: {
    fontSize: 15,
    fontStyle: 'italic',
    color: Colors.grey2
  }
});

export default styles;
