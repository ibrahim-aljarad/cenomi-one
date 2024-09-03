import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { RfH, RfW } from '../../utils/helpers';
import PropTypes from 'prop-types';
import { Colors } from '../../theme';

const GridMenuSVG = (props) => (
  <Svg width={RfW(28)} height={RfH(28)} xmlns="http://www.w3.org/2000/svg" {...props}>
    <G scale={RfH(1)} fill="none" fillRule="evenodd">
      <Path d="M28 0v28H0V0h28Z" fill="none" />
      <G
        stroke={props.isDarkMode ? Colors.white : Colors.black}
        strokeDasharray="0,0"
        strokeLinecap="round"
        strokeLinejoin="round">
        <Path d="M6 9.04c-1.105 0-2-.905-2-2.02A2.01 2.01 0 0 1 6 5c1.105 0 2 .904 2 2.02a2.01 2.01 0 0 1-2 2.02ZM6 16.02c-1.105 0-2-.905-2-2.02a2.01 2.01 0 0 1 2-2.02c1.105 0 2 .905 2 2.02a2.01 2.01 0 0 1-2 2.02ZM6 23c-1.105 0-2-.904-2-2.02a2.01 2.01 0 0 1 2-2.02c1.105 0 2 .905 2 2.02A2.01 2.01 0 0 1 6 23ZM14 9.04c-1.105 0-2-.905-2-2.02A2.01 2.01 0 0 1 14 5c1.105 0 2 .904 2 2.02a2.01 2.01 0 0 1-2 2.02ZM14 16.02c-1.105 0-2-.905-2-2.02a2.01 2.01 0 0 1 2-2.02c1.105 0 2 .905 2 2.02a2.01 2.01 0 0 1-2 2.02ZM14 23c-1.105 0-2-.904-2-2.02a2.01 2.01 0 0 1 2-2.02c1.105 0 2 .905 2 2.02A2.01 2.01 0 0 1 14 23ZM22 9.04c-1.105 0-2-.905-2-2.02A2.01 2.01 0 0 1 22 5c1.105 0 2 .904 2 2.02a2.01 2.01 0 0 1-2 2.02ZM22 16.02c-1.105 0-2-.905-2-2.02a2.01 2.01 0 0 1 2-2.02c1.105 0 2 .905 2 2.02a2.01 2.01 0 0 1-2 2.02ZM22 23c-1.105 0-2-.904-2-2.02a2.01 2.01 0 0 1 2-2.02c1.105 0 2 .905 2 2.02A2.01 2.01 0 0 1 22 23Z" />
      </G>
    </G>
  </Svg>
);

GridMenuSVG.propTypes = {
  isDarkMode: PropTypes.bool
};

GridMenuSVG.defaultProps = {
  isDarkMode: false
};

export default GridMenuSVG;
