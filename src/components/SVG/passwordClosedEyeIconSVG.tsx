import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { RfH } from '../../utils/helpers';
import PropTypes from 'prop-types';
import { Colors } from '../../theme';

const PasswordClosedEyeIconSVG = (props) => (
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
      <Path d="M6.313 9.687a2.384 2.384 0 1 1 3.373-3.373L6.314 9.686Z" />
      <Path d="M11.88 3.847c-1.167-.88-2.5-1.36-3.88-1.36-2.353 0-4.547 1.386-6.073 3.786-.6.94-.6 2.52 0 3.46a9.55 9.55 0 0 0 1.806 2.114M5.613 13.02c.76.32 1.567.493 2.387.493 2.353 0 4.547-1.386 6.073-3.786.6-.94.6-2.52 0-3.46-.22-.347-.46-.674-.706-.98" />
      <Path d="M10.34 8.467a2.377 2.377 0 0 1-1.88 1.88M6.313 9.687l-4.98 4.98M14.667 1.333l-4.98 4.98" />
    </G>
  </Svg>
);

PasswordClosedEyeIconSVG.propTypes = {
  isDarkMode: PropTypes.bool
};

PasswordClosedEyeIconSVG.defaultProps = {
  isDarkMode: false
};

export default PasswordClosedEyeIconSVG;
