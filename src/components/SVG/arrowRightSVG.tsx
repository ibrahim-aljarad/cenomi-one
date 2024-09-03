import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '../../theme';
import { RfH, RfW } from '../../utils/helpers';
import PropTypes from 'prop-types';

const ArrowRightSVG = (props) => (
  <Svg
    width={RfW(8)}
    height={RfH(14)}
    viewBox="0 0 8 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M7.531 6.469c.282.312.282.781 0 1.062l-6 6c-.312.313-.781.313-1.062 0a.684.684 0 010-1.031l5.468-5.469-5.468-5.5A.684.684 0 01.469.5.684.684 0 011.5.5l6.031 5.969z"
      fill="#8B8B89"
    />
  </Svg>
);

ArrowRightSVG.propTypes = {
  isDarkMode: PropTypes.bool
};

ArrowRightSVG.defaultProps = {
  isDarkMode: false
};

export default ArrowRightSVG;
