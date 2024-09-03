import * as React from 'react';
import { Colors } from '../../theme';
import PropTypes from 'prop-types';
import { RfH } from '../../utils/helpers';
import Svg, { Path } from 'react-native-svg';

const ClaimRemainingSVG = (props) => (
  <Svg width={RfH(14)} height={RfH(16)} xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      scale={RfH(1)}
      d="M13.125 7a6.128 6.128 0 0 1-6.122 6.122A6.096 6.096 0 0 1 2.17 10.77a.437.437 0 1 1 .69-.538A5.222 5.222 0 0 0 7 12.25 5.255 5.255 0 0 0 12.25 7 5.256 5.256 0 0 0 7 1.75a5.229 5.229 0 0 0-4.535 2.625h2.348a.439.439 0 0 1 0 .875h-3.5a.438.438 0 0 1-.438-.438v-3.5a.437.437 0 1 1 .875 0v2.559A6.1 6.1 0 0 1 7.003.878 6.128 6.128 0 0 1 13.125 7Z"
      fill={props.isDarkMode ? Colors.white : Colors.black}
      fillRule="nonzero"
    />
  </Svg>
);
ClaimRemainingSVG.propTypes = {
  isDarkMode: PropTypes.bool
};

ClaimRemainingSVG.defaultProps = {
  isDarkMode: false
};
export default ClaimRemainingSVG;
