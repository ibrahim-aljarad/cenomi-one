import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '../../theme';
import { RfH } from '../../utils/helpers';
import PropTypes from 'prop-types';

const ArrowUpSVG = (props) => (
  <Svg width={RfH(14)} height={RfH(8)}>
    <Path
      scale={RfH(1)}
      d="M.469 6.219c-.281.281-.281.75 0 1.062a.745.745 0 0 0 1.062 0L7 2.031l5.469 5.25a.745.745 0 0 0 1.062 0 .745.745 0 0 0 0-1.062l-6-5.75A.732.732 0 0 0 7 .25a.732.732 0 0 0-.531.219l-6 5.75Z"
      fill={props?.isDarkMode ? Colors.white : Colors.black}
      fillRule="nonzero"
    />
  </Svg>
);

ArrowUpSVG.propTypes = {
  isDarkMode: PropTypes.bool
};

ArrowUpSVG.defaultProps = {
  isDarkMode: false
};

export default ArrowUpSVG;
