import * as React from 'react';
import { Colors } from '../../theme';
import PropTypes from 'prop-types';
import { RfH } from '../../utils/helpers';
import Svg, { Path } from 'react-native-svg';

const ClaimAnnualLimitSVG = (props) => (
  <Svg width={RfH(13)} height={RfH(16)} xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      scale={RfH(1)}
      d="M5.688 8.055 4.245 9.496a.434.434 0 0 1-.617 0 .434.434 0 0 1 0-.617L5.816 6.69a.434.434 0 0 1 .618 0l2.187 2.188a.434.434 0 0 1 0 .617.434.434 0 0 1-.617 0l-1.441-1.44v3.319c0 .24-.197.438-.463.438a.456.456 0 0 1-.437-.438l.024-3.32ZM3.5 1.75h5.25V.437a.438.438 0 0 1 .875 0V1.75h.875c.965 0 1.75.783 1.75 1.75v8.75c0 .965-.785 1.75-1.75 1.75H1.75A1.75 1.75 0 0 1 0 12.25V3.5c0-.967.783-1.75 1.75-1.75h.875V.437a.438.438 0 0 1 .875 0V1.75ZM.875 12.25c0 .484.392.875.875.875h8.75a.874.874 0 0 0 .875-.875v-7H.875v7Zm0-8.75v.875h10.5V3.5a.874.874 0 0 0-.875-.875H1.75a.875.875 0 0 0-.875.875Z"
      fill={props.isDarkMode ? Colors.white : Colors.black}
      fillRule="nonzero"
    />
  </Svg>
);
ClaimAnnualLimitSVG.propTypes = {
  isDarkMode: PropTypes.bool
};

ClaimAnnualLimitSVG.defaultProps = {
  isDarkMode: false
};
export default ClaimAnnualLimitSVG;
