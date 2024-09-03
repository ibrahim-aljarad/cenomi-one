import * as React from 'react';
import { Colors } from '../../theme';
import PropTypes from 'prop-types';
import { RfH } from '../../utils/helpers';
import Svg, { Path } from 'react-native-svg';

const ClaimUtilizedSVG = (props) => (
  <Svg width={RfH(14)} height={RfH(16)} xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      scale={RfH(1)}
      d="M12.688.875a.438.438 0 0 0-.438.438v3.535A5.685 5.685 0 0 0 7 1.313 5.666 5.666 0 0 0 1.392 6.05a.438.438 0 1 0 .862.147A4.796 4.796 0 0 1 7 2.188a4.815 4.815 0 0 1 4.473 3.062h-3.16a.439.439 0 0 0-.438.438c0 .24.197.437.438.437h4.374c.241 0 .438-.197.438-.438V1.313a.438.438 0 0 0-.438-.437Zm-.463 6.568a.434.434 0 0 0-.503.359c-.366 2.323-2.362 4.01-4.747 4.01A4.815 4.815 0 0 1 2.502 8.75h3.186a.439.439 0 0 0 0-.875H1.313a.438.438 0 0 0-.438.438v4.374a.438.438 0 0 0 .875 0V9.152A5.686 5.686 0 0 0 7 12.688a5.685 5.685 0 0 0 5.608-4.74c.041-.24-.12-.464-.383-.505Z"
      fill={props.isDarkMode ? Colors.white : Colors.black}
      fillRule="nonzero"
    />
  </Svg>
);
ClaimUtilizedSVG.propTypes = {
  isDarkMode: PropTypes.bool
};

ClaimUtilizedSVG.defaultProps = {
  isDarkMode: false
};
export default ClaimUtilizedSVG;
