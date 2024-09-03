import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import { Colors } from '../../theme';

function ThumbsUpSVG(props) {
  return (
    <Svg
      width={16}
      height={15}
      viewBox="0 0 16 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M9.781 1.031c.813.188 1.344.969 1.188 1.782l-.094.343A7.558 7.558 0 0110 5.5h4.5c.813 0 1.5.688 1.5 1.5 0 .594-.344 1.094-.813 1.344.344.281.563.687.563 1.156 0 .75-.531 1.344-1.219 1.5.125.219.219.469.219.75 0 .688-.438 1.25-1.063 1.438.032.093.063.218.063.312a1.5 1.5 0 01-1.5 1.5H9.187a2.868 2.868 0 01-1.656-.5l-1.218-.781A3.053 3.053 0 015 11.219V7.75c0-.938.406-1.781 1.125-2.344l.219-.187c.812-.688 1.406-1.594 1.593-2.657L8 2.22c.188-.813.969-1.344 1.781-1.188zM1 6h2c.531 0 1 .469 1 1v7c0 .563-.469 1-1 1H1c-.563 0-1-.438-1-1V7c0-.531.438-1 1-1z"
        fill={props.isSelected ? Colors.primary : Colors.emptyFill}
      />
    </Svg>
  );
}

ThumbsUpSVG.propTypes = {
  isDarkMode: PropTypes.bool,
  isSelected: PropTypes.bool
};

export default ThumbsUpSVG;
