import * as React from 'react';
import { Colors } from '../../theme';
import PropTypes from 'prop-types';
import { RfH } from '../../utils/helpers';
import Svg, { Path } from 'react-native-svg';

const ClaimPendingSVG = (props) => (
  <Svg width={RfH(16)} height={RfH(15)} xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      scale={RfH(1)}
      d="m7.438 6.869 1.676 2.513a.439.439 0 0 1-.12.607.439.439 0 0 1-.608-.12l-1.75-2.626a.456.456 0 0 1-.074-.268V3.038c0-.216.197-.438.438-.438.24 0 .438.222.438.438v3.83ZM14 7a7 7 0 0 1-7 7 7 7 0 0 1-7-7 7 7 0 0 1 7-7 7 7 0 0 1 7 7ZM7 .875a6.125 6.125 0 1 0 0 12.25A6.125 6.125 0 0 0 7 .876Z"
      fill={props.isDarkMode ? Colors.white : Colors.black}
      fillRule="nonzero"
    />
  </Svg>
);
ClaimPendingSVG.propTypes = {
  isDarkMode: PropTypes.bool
};

ClaimPendingSVG.defaultProps = {
  isDarkMode: false
};
export default ClaimPendingSVG;
