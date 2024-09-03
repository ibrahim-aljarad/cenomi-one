import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import { RfH, RfW } from '../../utils/helpers';
import { Colors } from '../../theme';

const HrDocumentMoreOptions = (props) => (
  <Svg
    width={RfW(18)}
    height={RfH(24)}
    viewBox="0 0 18 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M2 1L1 3.5.5 21l2 2c2.667.167 8.7.5 11.5.5 2.8 0 3.167-1.667 3-2.5V8h-7V1H2z"
      fill="#7BBDFF"
    />
    <Path
      d="M17.11 5.906c.562.563.89 1.313.89 2.11V21c0 1.688-1.36 3-3 3H3c-1.688 0-3-1.313-3-3V3c0-1.64 1.313-3 3-3h6.984c.797 0 1.547.328 2.11.89l5.015 5.016zM10.5 1.641V6.75c0 .422.328.75.75.75h5.11a1.179 1.179 0 00-.329-.563L11.063 1.97a1.18 1.18 0 00-.563-.328zM16.5 21V9h-5.25A2.221 2.221 0 019 6.75V1.5H3c-.844 0-1.5.703-1.5 1.5v18c0 .844.656 1.5 1.5 1.5h12c.797 0 1.5-.656 1.5-1.5zM5.766 15l1.968 1.969 4.454-4.5c.28-.281.796-.281 1.078 0 .28.328.28.797 0 1.078L8.25 18.562c-.14.141-.328.188-.516.188-.187 0-.375-.047-.515-.188l-2.532-2.484c-.28-.328-.28-.797 0-1.078.282-.281.797-.281 1.079 0z"
      fill={props.isDarkMode ? Colors.white : Colors.blueFive}
    />
  </Svg>
);
HrDocumentMoreOptions.propTypes = {
  isDarkMode: PropTypes.bool
};

HrDocumentMoreOptions.defaultProps = {
  isDarkMode: false
};
export default HrDocumentMoreOptions;
