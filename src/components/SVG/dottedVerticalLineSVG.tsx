import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { RfH, RfW } from '../../utils/helpers';
import PropTypes from 'prop-types';
import { Colors } from '../../theme';

const DottedVerticalLineSVG = (props) => (
  <Svg
    width={RfW(2)}
    height={RfH(41)}
    viewBox="0 0 2 41"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      stroke={props.isDarkMode ? Colors.white : Colors.hexBlack}
      strokeDasharray="4 4"
      d="M1 -2.18557e-8L1 41"
    />
  </Svg>
);

DottedVerticalLineSVG.propTypes = {
  isDarkMode: PropTypes.bool
};

DottedVerticalLineSVG.defaultProps = {
  isDarkMode: false
};

export default DottedVerticalLineSVG;
