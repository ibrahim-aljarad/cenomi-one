import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import { RfH, RfW } from '../../utils/helpers';

const DeliveryStatusIconSVG = (props) => (
  <Svg
    width={RfW(10)}
    height={RfH(8)}
    viewBox="0 0 10 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.887 1.011c.147.14.151.37.009.515L3.623 7.889a.374.374 0 01-.532 0L.104 4.86a.359.359 0 01.009-.514.375.375 0 01.524.008l2.72 2.76L9.363 1.02a.375.375 0 01.524-.009z"
      fill="#00B8F0"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.033.1a.359.359 0 01.014.514L3.656 5.159a.374.374 0 01-.53.007l-1.39-1.363a.359.359 0 010-.515.375.375 0 01.524 0l1.12 1.1L7.51.113A.375.375 0 018.032.1z"
      fill="#00B8F0"
    />
  </Svg>
);
DeliveryStatusIconSVG.propTypes = {
  isDarkMode: PropTypes.bool
};

DeliveryStatusIconSVG.defaultProps = {
  isDarkMode: false
};
export default DeliveryStatusIconSVG;
