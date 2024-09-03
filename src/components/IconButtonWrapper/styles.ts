import { StyleSheet } from 'react-native';
import { HEIGHT, WIDTH, Colors } from '../../theme';

const getIconImageStyle = (iconHeight, iconWidth, backgroundColor) => ({
  height: iconHeight,
  width: iconWidth,
  backgroundColor,
  resizeMode: 'contain'
});

const getLoaderImageStyle = (borderRadius) => ({
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  backgroundColor: Colors.lightGrey219,
  borderRadius
});

const styles = StyleSheet.create({
  loaderImg: { height: 15, width: 15 },
  countText: { fontSize: WIDTH.W8, textAlign: 'center', color: Colors.snow },
  countbackground: {
    height: WIDTH.W16,
    width: WIDTH.W16,
    justifyContent: 'center',
    borderRadius: WIDTH.W8,
    backgroundColor: Colors.red,
    position: 'absolute',
    left: WIDTH.W12,
    bottom: HEIGHT.H8,
    borderWidth: 0.5,
    borderColor: Colors.snow
  }
});

export default styles;
export { getIconImageStyle, getLoaderImageStyle };
