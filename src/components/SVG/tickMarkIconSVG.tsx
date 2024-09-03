import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import { Colors } from '../../theme';
import { RfH } from '../../utils/helpers';

const TickMarkIconSVG = (props) => (
  <Svg width={RfH(15)} height={RfH(15)} xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      scale={RfH(1.1)}
      d="M9 1 3.667 6 1 3.5"
      stroke={props?.isDarkMode ? Colors.white : Colors.blueNine}
      strokeWidth={0.8}
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

TickMarkIconSVG.propTypes = {
  isDarkMode: PropTypes.bool
};

TickMarkIconSVG.defaultProps = {
  isDarkMode: false
};

export default TickMarkIconSVG;
