import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { RfH } from '../../utils/helpers';
import PropTypes from 'prop-types';
import { Colors } from '../../theme';

export const MinimiseSVG = (props) => (
  <Svg width={RfH(14)} height={RfH(2)}>
    <Path
      scale={RfH(1)}
      d="M1 1.05h12"
      stroke={props?.isDarkMode ? Colors.white : Colors.blueEight}
      strokeWidth={0.8}
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

MinimiseSVG.propTypes = {
  isDarkMode: PropTypes.bool
};

MinimiseSVG.defaultProps = {
  isDarkMode: false
};
