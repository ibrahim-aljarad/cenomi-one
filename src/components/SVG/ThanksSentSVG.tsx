import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { RfH, RfW } from '../../utils/helpers';
import PropTypes from 'prop-types';

const ThanksSentSVG = (props) => (
  <Svg
    width={RfW(26)}
    height={RfH(26)}
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Circle cx={13} cy={13} r={12} stroke="#02CC87" />
    <Path
      d="M16.148 10.836l-4.463 4.328-2.03-1.967"
      stroke="#02CC87"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

ThanksSentSVG.propTypes = {
  isDarkMode: PropTypes.bool
};

ThanksSentSVG.defaultProps = {
  isDarkMode: false
};

export default ThanksSentSVG;
