import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import { Colors } from '../../theme';
import { RfH } from '../../utils/helpers';

const UsernameIconSVG = (props) => (
  <Svg width={RfH(16)} height={RfH(16)} xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      scale={RfH(1)}
      d="M9.187 8.906c-.84 0-1.245.469-2.625.469s-1.78-.469-2.624-.469A3.939 3.939 0 0 0 0 12.844v.75C0 14.37.63 15 1.406 15H11.72c.776 0 1.406-.63 1.406-1.406v-.75a3.939 3.939 0 0 0-3.938-3.938Zm2.532 4.688H1.406v-.75a2.536 2.536 0 0 1 2.532-2.532c.427 0 1.122.47 2.624.47 1.515 0 2.195-.47 2.625-.47a2.536 2.536 0 0 1 2.532 2.532v.75ZM6.562 8.437a4.22 4.22 0 0 0 0-8.437 4.22 4.22 0 0 0 0 8.437Zm0-7.03a2.817 2.817 0 0 1 2.813 2.812A2.817 2.817 0 0 1 6.562 7.03 2.817 2.817 0 0 1 3.75 4.22a2.817 2.817 0 0 1 2.812-2.813Z"
      fill={props.isDarkMode ? Colors.white : Colors.blueNine}
      fillRule="nonzero"
      stroke={props.isDarkMode ? 'none' : Colors.white}
      strokeWidth={0.5}
    />
  </Svg>
);

UsernameIconSVG.propTypes = {
  isDarkMode: PropTypes.bool
};

UsernameIconSVG.defaultProps = {
  isDarkMode: false
};

export default UsernameIconSVG;
