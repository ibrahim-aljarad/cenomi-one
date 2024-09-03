import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '../../theme';
import { RfH } from '../../utils/helpers';
import PropTypes from 'prop-types';

const ArrowDownSVG = (props) => (
  <Svg width={RfH(14)} height={RfH(10)}>
    <Path
      scale={RfH(1)}
      d="M13.531 1.781c.281-.281.281-.75 0-1.062a.745.745 0 0 0-1.062 0L7 5.969 1.531.719a.745.745 0 0 0-1.062 0 .745.745 0 0 0 0 1.062l6 5.75A.732.732 0 0 0 7 7.75a.732.732 0 0 0 .531-.219l6-5.75Z"
      fill={props?.isDarkMode ? Colors.white : Colors.black}
      fillRule="nonzero"
    />
  </Svg>
);

ArrowDownSVG.propTypes = {
  isDarkMode: PropTypes.bool
};

ArrowDownSVG.defaultProps = {
  isDarkMode: false
};

export default ArrowDownSVG;
