import * as React from 'react';
import { RfH, RfW } from '../../utils/helpers';
import PropTypes from 'prop-types';
import { Colors } from '../../theme';
import Svg, { Rect, Path } from 'react-native-svg';

const RadioButtonCheckedSVG = (props) => (
  <Svg
    width={RfW(20)}
    height={RfH(20)}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Rect width={20} height={20} rx={10} fill="#0067D3" />
    <Path
      d="M14 8l-5.333 5L6 10.5"
      stroke="#fff"
      strokeWidth={0.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

RadioButtonCheckedSVG.propTypes = {
  isDarkMode: PropTypes.bool
};

RadioButtonCheckedSVG.defaultProps = {
  isDarkMode: false
};

export default RadioButtonCheckedSVG;
