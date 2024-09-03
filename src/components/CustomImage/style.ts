import { ImageStyle, StyleProp, StyleSheet } from 'react-native';
import { Colors } from '../../theme';

const getIconImageStyle = (
  iconHeight: number,
  iconWidth: number,
  backgroundColor?: string
): StyleProp<ImageStyle> => ({
  height: iconHeight,
  width: iconWidth,
  backgroundColor,
  resizeMode: 'contain'
});

const getLoaderImageStyle = (borderRadius: number) => ({
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  backgroundColor: Colors.lightGrey219,
  borderRadius
});

const styles = StyleSheet.create({
  loaderImg: { height: 15, width: 15 }
});

export default styles;

export { getIconImageStyle, getLoaderImageStyle };
