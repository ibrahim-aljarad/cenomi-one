import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import { RfH, RfW } from '../../utils/helpers';

const PendingStatusIconSVG = (props) => (
  <Svg
    width={RfW(11)}
    height={RfH(11)}
    viewBox="0 0 11 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.5 0C2.47 0 0 2.47 0 5.5S2.47 11 5.5 11 11 8.53 11 5.5 8.53 0 5.5 0zm0 10.102A4.615 4.615 0 01.898 5.5 4.615 4.615 0 015.5.898 4.615 4.615 0 0110.102 5.5 4.607 4.607 0 015.5 10.102zm.351-7.838v3.48L7.51 7.415a.452.452 0 010 .636.447.447 0 01-.312.137.447.447 0 01-.312-.137L5.09 6.255a.522.522 0 01-.1-.15v-.012a.345.345 0 01-.037-.162V2.264c0-.249.2-.449.45-.449.249 0 .448.2.448.45z"
      fill="#E97500"
    />
  </Svg>
);
PendingStatusIconSVG.propTypes = {
  isDarkMode: PropTypes.bool
};

PendingStatusIconSVG.defaultProps = {
  isDarkMode: false
};
export default PendingStatusIconSVG;
