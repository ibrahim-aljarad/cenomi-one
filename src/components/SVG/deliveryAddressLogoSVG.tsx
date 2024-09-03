import * as React from 'react';
import { RfH, RfW } from '../../utils/helpers';
import PropTypes from 'prop-types';
import { Colors } from '../../theme';
import Svg, { Circle } from 'react-native-svg';

const DeliveryAddressLogoSVG = (props) => (
  <Svg
    width={RfW(16)}
    height={RfH(22)}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Circle
      cx={6}
      cy={6}
      r={5.5}
      fill={Colors.blueEight}
      stroke={props.isDarkMode ? Colors.white : Colors.hexBlack}
    />
  </Svg>
);

DeliveryAddressLogoSVG.propTypes = {
  isDarkMode: PropTypes.bool
};

DeliveryAddressLogoSVG.defaultProps = {
  isDarkMode: false
};

export default DeliveryAddressLogoSVG;
