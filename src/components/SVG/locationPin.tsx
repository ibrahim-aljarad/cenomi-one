import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '../../theme';
import { RfH } from '../../utils/helpers';
import PropTypes from 'prop-types';

const LocationPinSVG = (props) => (
  <Svg width={RfH(11)} height={RfH(15)}>
    <Path
      scale={RfH(1)}
      d="M5.25.75A5.251 5.251 0 0 0 0 6c0 2.105.738 2.707 4.703 8.477a.672.672 0 0 0 .547.273c.191 0 .41-.082.547-.273C9.762 8.707 10.5 8.105 10.5 6A5.251 5.251 0 0 0 5.25.75Zm0 12.195c-.492-.71-.902-1.312-1.285-1.86-2.38-3.39-2.653-3.8-2.653-5.085 0-2.16 1.778-3.937 3.938-3.937S9.187 3.84 9.187 6c0 1.285-.273 1.695-2.652 5.086-.383.547-.793 1.148-1.285 1.86Zm0-9.132A2.194 2.194 0 0 0 3.062 6c0 1.203.985 2.188 2.188 2.188A2.194 2.194 0 0 0 7.437 6 2.194 2.194 0 0 0 5.25 3.813Zm0 3.062A.864.864 0 0 1 4.375 6c0-.492.383-.875.875-.875s.875.383.875.875a.864.864 0 0 1-.875.875Z"
      fill={props?.isDarkMode ? Colors.white : Colors.blueEight}
      fillRule="nonzero"
    />
  </Svg>
);

LocationPinSVG.propTypes = {
  isDarkMode: PropTypes.bool
};

LocationPinSVG.defaultProps = {
  isDarkMode: false
};

export default LocationPinSVG;
