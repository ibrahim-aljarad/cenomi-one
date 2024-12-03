import { StyleSheet } from 'react-native';
import { Colors } from '../../theme';
import { BorderRadius } from '../../theme/sizes';
import { RfH, RfW } from '../../utils/helper';
import { deviceHeight, deviceWidth } from '../../utils/helpers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  pdf: {
    width: deviceWidth(),
    height: '100%'
  },
  containertwo: {
    justifyContent: 'flex-end',
    margin: 0,
    // flex: 1,
    width: '100%',
    height: '94%',
    backgroundColor: Colors.containerBackgroundColor // Colors.blueTen,
  },
  header: {
    paddingTop: RfH(12),
    paddingHorizontal: RfW(24),
    backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadius.BR0,
    borderTopRightRadius: BorderRadius.BR0
    // elevation:2,
  },
  innerView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '94%',
    backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadius.BR0,
    borderTopRightRadius: BorderRadius.BR0
    // paddingBottom: RfH(30)
  },
  documentViewContainer: {
    height: '100%',
    backgroundColor: Colors.white
    // justifyContent: 'center'
  },
  emailHeader: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  emailLabel: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: '500',
  },
  emailBody: {
    paddingTop: 10,
  }
});

export default styles;
