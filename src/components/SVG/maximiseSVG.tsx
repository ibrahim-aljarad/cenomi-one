import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { RfH } from '../../utils/helpers';
import PropTypes from 'prop-types';
import { Colors } from '../../theme';

export const MaximiseSVG = (props) => (
  <Svg width={RfH(14)} height={RfH(14)}>
    <G
      scale={RfH(1)}
      stroke={props?.isDarkMode ? Colors.white : Colors.blueEight}
      strokeWidth={0.8}
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round">
      <Path d="M1 7h12M7 1v12" />
    </G>
  </Svg>
);

MaximiseSVG.propTypes = {
  isDarkMode: PropTypes.bool
};

MaximiseSVG.defaultProps = {
  isDarkMode: false
};
