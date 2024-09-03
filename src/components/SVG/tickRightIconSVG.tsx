import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import { Colors } from '../../theme';
import { RfH, RfW } from '../../utils/helpers';

const TickRightIconSVG = (props) => (
  <Svg
    width={RfW(19)}
    height={RfH(13)}
    viewBox="0 0 19 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M17.5 1L6.156 12 1 7"
      stroke={props.isDarkMode ? Colors.white : Colors.primary}
      strokeWidth={1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
TickRightIconSVG.propTypes = {
  isDarkMode: PropTypes.bool
};

TickRightIconSVG.defaultProps = {
  isDarkMode: false
};

export default TickRightIconSVG;
