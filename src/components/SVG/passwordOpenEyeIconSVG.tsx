import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { RfH } from '../../utils/helpers';
import PropTypes from 'prop-types';
import { Colors } from '../../theme';

const PasswordOpenEyeIconSVG = (props) => (
  <Svg width={RfH(16)} height={RfH(16)} xmlns="http://www.w3.org/2000/svg" {...props}>
    <G
      scale={RfH(1)}
      stroke={props?.isDarkMode ? Colors.white : Colors.blueNine}
      strokeWidth={0.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="0,0"
      fill="none"
      fillRule="evenodd">
      <Path d="M8 10.387A2.384 2.384 0 0 1 5.613 8 2.384 2.384 0 0 1 8 5.613 2.384 2.384 0 0 1 10.387 8 2.384 2.384 0 0 1 8 10.387Z" />
      <Path d="M14.073 9.727c.6-.94.6-2.52 0-3.46C12.547 3.867 10.353 2.48 8 2.48S3.453 3.867 1.927 6.267c-.6.94-.6 2.52 0 3.46 1.526 2.4 3.72 3.786 6.073 3.786s4.547-1.386 6.073-3.786Z" />
    </G>
  </Svg>
);

PasswordOpenEyeIconSVG.propTypes = {
  isDarkMode: PropTypes.bool
};

PasswordOpenEyeIconSVG.defaultProps = {
  isDarkMode: false
};

export default PasswordOpenEyeIconSVG;
