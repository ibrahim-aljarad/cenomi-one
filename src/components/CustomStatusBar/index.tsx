import React from 'react';
import { StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { isDarkModeSelector } from '../../containers/redux/selectors';
import { Colors } from '../../theme';
import { getColorWithOpacity } from '../../utils/helper';

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector
});

const CustomStatusBar = (props) => {
  const { isDarkMode } = useSelector(stateSelector);
  const { isHomePage, givenBackgroundColor = Colors.headerBgColor } = props || {};

  let backgroundColor = Colors.white;
  if (isDarkMode) {
    backgroundColor = Colors.darkModeBackground;
  }

  if (givenBackgroundColor) {
    backgroundColor = givenBackgroundColor;
  }
  return (
    <StatusBar
      backgroundColor={isHomePage ? Colors.transparent : backgroundColor}
      barStyle={isDarkMode ? 'light-content' : 'dark-content'}
    />
  );
};

export default CustomStatusBar;
