import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '../../theme';
import PropTypes from 'prop-types';
import { RfH, RfW } from '../../utils/helpers';

const DotOptionsSVG = (props) => (
  <Svg width={RfW(5)} height={RfH(19)} xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      d="M2.6 14.1a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm0-7a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm0-7a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z"
      fill={props.isDarkMode ? Colors.white : Colors.black}
      fillRule="evenodd"
    />
  </Svg>
);
DotOptionsSVG.propTypes = {
  isDarkMode: PropTypes.bool
};

DotOptionsSVG.defaultProps = {
  isDarkMode: false
};
export default DotOptionsSVG;
