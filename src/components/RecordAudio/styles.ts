import { StyleSheet } from 'react-native';
import { Colors, FontSize, HEIGHT, WIDTH } from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    flexDirection: 'column',
    alignItems: 'center'
  },
  titleTxt: {
    marginTop: HEIGHT.H100,
    color: Colors.black,
    fontSize: FontSize[26]
  },
  viewRecorder: {
    flexDirection: 'row',
    marginTop: HEIGHT.H40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  recordBtnWrapper: {
    flexDirection: 'row'
  },
  viewPlayer: {
    marginTop: HEIGHT.H40,
    alignSelf: 'stretch',
    alignItems: 'center'
  },
  viewBarWrapper: {
    marginTop: HEIGHT.H28,
    marginHorizontal: WIDTH.W24,
    alignSelf: 'stretch'
  },
  viewBar: {
    backgroundColor: Colors.black,
    height: HEIGHT.H5,
    alignSelf: 'stretch'
  },
  viewBarPlay: {
    backgroundColor: Colors.formErrors,
    height: HEIGHT.H5,
    width: 0
  },
  playStatusTxt: {
    marginTop: HEIGHT.H8,
    color: Colors.black
  },
  playBtnWrapper: {
    flexDirection: 'row',
    marginTop: HEIGHT.H40
  },
  btn: {
    borderColor: Colors.black,
    borderWidth: 1
  },
  txt: {
    color: 'white',
    fontSize: 14,
    marginHorizontal: 8,
    marginVertical: 4
  },
  txtRecordCounter: {
    marginTop: 32,
    color: Colors.black,
    fontSize: 20,
    textAlignVertical: 'center',
    letterSpacing: 3
  },
  txtCounter: {
    marginTop: 12,
    color: Colors.white,
    fontSize: 20,
    textAlignVertical: 'center',
    letterSpacing: 3
  },
  buttonStyle: {
    backgroundColor: Colors.primary,
    paddingHorizontal: WIDTH.W20,
    marginHorizontal: 0
  }
});
