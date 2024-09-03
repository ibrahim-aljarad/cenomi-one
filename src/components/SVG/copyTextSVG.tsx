import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { RfH, RfW } from '../../utils/helpers';
import PropTypes from 'prop-types';
import { Colors } from '../../theme';

const CopyTextSVG = (props) => (
  <Svg
    width={RfW(16)}
    height={RfH(22)}
    viewBox="0 0 17 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M16.688 2.219L14.78.313A1.017 1.017 0 0014.062 0H8.97c-1.125 0-2 .906-2 2v8C7 11.125 7.875 12 9 12h6c1.094 0 2-.875 2-2V2.937c0-.28-.125-.53-.313-.718zM15.5 10c0 .281-.25.5-.5.5H8.969a.494.494 0 01-.5-.5V2.031c0-.281.219-.5.5-.5h4L13 3c0 .563.438 1 1 1h1.469v6h.031zm-6 4c0 .281-.25.5-.5.5H2.969a.494.494 0 01-.5-.5V6.031c0-.281.25-.5.5-.5H6V4H2.969c-1.094 0-2 .906-2 2L1 14c0 1.125.875 2 2 2h6c1.094 0 2-.875 2-2v-1H9.5v1z"
      fill="#0067D3"
    />
  </Svg>
);

CopyTextSVG.propTypes = {
  isDarkMode: PropTypes.bool
};

CopyTextSVG.defaultProps = {
  isDarkMode: false
};

export default CopyTextSVG;
