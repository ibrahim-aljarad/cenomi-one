import * as React from 'react';
import { RfH, RfW } from '../../utils/helpers';
import PropTypes from 'prop-types';
import { Colors } from '../../theme';
import Svg, { Rect } from 'react-native-svg';

const RadioButtonUncheckedSVG = (props) => (
  <Svg
    width={RfW(20)}
    height={RfH(20)}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Rect x={0.5} y={0.5} width={19} height={19} rx={9.5} fill="#fff" stroke="#A6B2B7" />
  </Svg>
);

RadioButtonUncheckedSVG.propTypes = {
  isDarkMode: PropTypes.bool
};

RadioButtonUncheckedSVG.defaultProps = {
  isDarkMode: false
};

export default RadioButtonUncheckedSVG;
