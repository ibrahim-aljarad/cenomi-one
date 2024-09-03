import * as React from 'react';
import { Colors } from '../../theme';
import PropTypes from 'prop-types';
import { RfH, RfW } from '../../utils/helpers';
import Svg, { G, Path } from 'react-native-svg';

const DeleteDocSVG = (props) => (
  <Svg width={25} height={25} xmlns="http://www.w3.org/2000/svg" {...props}>
    <G fill="none" fillRule="evenodd">
      <Path
        d="M18 8.88v10.5c0 .69-.28 1.315-.732 1.768a2.492 2.492 0 0 1-1.768.732h-6c-.69 0-1.315-.28-1.768-.732A2.492 2.492 0 0 1 7 19.38V8.88h11Z"
        stroke={props.isDarkMode ? Colors.white : Colors.black}
      />
      <Path
        stroke={props.isDarkMode ? Colors.white : Colors.primaryBlack}
        strokeLinecap="square"
        d="M5 5.88h15"
      />
    </G>
  </Svg>
);
DeleteDocSVG.propTypes = {
  isDarkMode: PropTypes.bool
};

DeleteDocSVG.defaultProps = {
  isDarkMode: false
};
export default DeleteDocSVG;
