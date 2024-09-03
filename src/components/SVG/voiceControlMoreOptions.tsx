import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import { RfH, RfW } from '../../utils/helpers';
import { Colors } from '../../theme';

const VoiceControlMoreOptions = (props) => (
  <Svg
    width={RfW(16)}
    height={RfH(24)}
    viewBox="0 0 16 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M8 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"
      fill="#7BBDFF"
      stroke={props.isDarkMode ? Colors.white : Colors.blueFive}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15 10v2a7 7 0 11-14 0v-2M8 19v4M4 23h8"
      stroke={props.isDarkMode ? Colors.white : Colors.blueFive}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

VoiceControlMoreOptions.propTypes = {
  isDarkMode: PropTypes.bool
};

VoiceControlMoreOptions.defaultProps = {
  isDarkMode: false
};

export default VoiceControlMoreOptions;
