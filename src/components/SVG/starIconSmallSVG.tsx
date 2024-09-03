import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { RfH } from '../../utils/helpers';
import PropTypes from 'prop-types';
import { Colors } from '../../theme';

const StarIconSmallSVG = (props) => (
  <Svg width={RfH(16)} height={RfH(15)} xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      scale={RfH(1)}
      d="M8.668 1.242a.885.885 0 0 0-1.586 0l-1.777 3.61-4.02.574C.575 5.536.301 6.438.82 6.93L3.72 9.746l-.684 3.992c-.137.711.63 1.258 1.258.903l3.582-1.86 3.582 1.86c.629.328 1.395-.192 1.258-.93l-.684-3.965L14.93 6.93c.52-.492.246-1.395-.465-1.504l-4.02-.574-1.777-3.61Z"
      fill={
        props?.isRated
          ? Colors.yellowOrange
          : props?.isDarkMode
          ? Colors.darkModeButton
          : Colors.silverGray
      }
      fillRule="nonzero"
    />
  </Svg>
);

StarIconSmallSVG.propTypes = {
  isDarkMode: PropTypes.bool,
  isRated: PropTypes.bool,
  style: PropTypes.array
};

StarIconSmallSVG.defaultProps = {
  isDarkMode: false,
  isRated: false
};

export default StarIconSmallSVG;
