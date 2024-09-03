import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { RfH } from '../../utils/helpers';
import PropTypes from 'prop-types';
import { Colors } from '../../theme';

const StarIconBigSVG = (props) => (
  <Svg width={RfH(33)} height={RfH(32)} xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      scale={RfH(1)}
      d="m17.2 26.677 8.002 5.113c1.022.653 2.292-.319 1.989-1.523l-2.312-9.171a1.408 1.408 0 0 1 .45-1.42l7.176-6.023c.942-.792.456-2.37-.756-2.45l-9.37-.612a1.337 1.337 0 0 1-1.15-.856L17.734.859A1.32 1.32 0 0 0 16.5 0a1.32 1.32 0 0 0-1.234.859l-3.495 8.876a1.337 1.337 0 0 1-1.15.856l-9.37.613c-1.212.08-1.698 1.657-.756 2.449l7.176 6.023c.408.346.583.898.45 1.42L5.977 29.6c-.364 1.445 1.16 2.612 2.387 1.827l7.436-4.75a1.294 1.294 0 0 1 1.4 0Z"
      fill={
        props?.isRated
          ? Colors.yellowOrange
          : props?.isDarkMode
          ? Colors.darkModeButton
          : Colors.silverGray
      }
      fillRule="evenodd"
    />
  </Svg>
);

StarIconBigSVG.propTypes = {
  isDarkMode: PropTypes.bool,
  isRated: PropTypes.bool,
  style: PropTypes.object
};

StarIconBigSVG.defaultProps = {
  isDarkMode: false,
  isRated: false
};

export default StarIconBigSVG;
