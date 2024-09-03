import { DefaultTheme } from '@react-navigation/native';
import COLORS from './colors';

export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.primary,
    background: COLORS.white
  }
};
