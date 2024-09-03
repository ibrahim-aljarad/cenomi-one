import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import { Colors } from '../../theme';

function ThumbsDownSVG(props) {
  return (
    <Svg
      width={16}
      height={15}
      viewBox="0 0 16 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M6.219 14c.812.156 1.593-.375 1.781-1.188l.063-.374c.187-1.032.78-1.97 1.593-2.626l.219-.187A2.932 2.932 0 0011 7.281V3.812c0-1-.5-1.937-1.313-2.5L8.47.532A2.9 2.9 0 006.813 0H3.75c-.813 0-1.5.688-1.5 1.5 0 .125.031.25.063.344a1.472 1.472 0 00-.844 2.187C.78 4.188.25 4.781.25 5.5c0 .5.219.906.563 1.188C.343 6.938 0 7.438 0 8a1.5 1.5 0 001.5 1.5H6c-.406.75-.719 1.531-.875 2.375l-.094.344c-.156.812.375 1.594 1.188 1.781zM15 11c.563 0 1-.438 1-1V3c0-.531-.438-1-1-1h-2c-.531 0-1 .469-1 1v7c0 .563.469 1 1 1h2z"
        fill={props.isSelected ? Colors.primary : Colors.emptyFill}
      />
    </Svg>
  );
}

ThumbsDownSVG.propTypes = {
  isDarkMode: PropTypes.bool,
  isSelected: PropTypes.bool
};

export default ThumbsDownSVG;
