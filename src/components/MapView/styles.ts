import { StyleSheet } from 'react-native';
import { Colors, HEIGHT, WIDTH } from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  pdf: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  container1: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  bubble: {
    backgroundColor: Colors.bubbleColor,
    paddingHorizontal: WIDTH.W18,
    paddingVertical: WIDTH.W12,
    borderRadius: 20
  },
  latlng: {
    width: WIDTH.W200,
    alignItems: 'stretch'
  },
  button: {
    width: WIDTH.W80,
    paddingHorizontal: WIDTH.W12,
    alignItems: 'center',
    marginHorizontal: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: HEIGHT.H20,
    backgroundColor: 'transparent'
  }
});

export default styles;
