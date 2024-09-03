import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '../../theme';
import { RfH, RfW } from '../../utils/helpers';
import PropTypes from 'prop-types';

const InfoCircleSVG = (props) => (
  <Svg
    width={RfW(18)}
    height={RfH(18)}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M9 17A8 8 0 109 1a8 8 0 000 16zM9 5.805v3.2M9 12.195h.006"
      stroke={props?.isDarkMode ? Colors.white : Colors.black}
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

InfoCircleSVG.propTypes = {
  isDarkMode: PropTypes.bool
};

InfoCircleSVG.defaultProps = {
  isDarkMode: false
};

export default InfoCircleSVG;
