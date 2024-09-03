import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { RfH, RfW } from '../../utils/helpers';
import PropTypes from 'prop-types';
import { Colors } from '../../theme';

const ClappingSVG = (props) => (
  <Svg
    width={RfW(13)}
    height={RfH(14)}
    viewBox="0 0 13 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M6.301 1a1.063 1.063 0 01.656.226 1.1 1.1 0 01.277.32l.672 1.176a.397.397 0 00.32.2l.025.001c.124 0 .24-.058.317-.158a1.068 1.068 0 011.522-.19c.112.09.204.2.278.334l1.075 1.885c.553.971.7 2.102.413 3.185a4.162 4.162 0 01-1.93 2.548 4.098 4.098 0 01-2.064.564 4.127 4.127 0 01-3.597-2.1L2.278 5.504a1.078 1.078 0 01-.135-.404 1.087 1.087 0 01.028-.424 1.081 1.081 0 01.914-.801.398.398 0 00.305-.242.407.407 0 00-.021-.359l-.227-.398a1.098 1.098 0 01.393-1.491 1.072 1.072 0 01.82-.11c.172.048.331.137.458.26a.399.399 0 00.604-.068c.01-.015.221-.248.345-.32A1.062 1.062 0 016.301 1z"
      fill="#fff"
    />
    <Path
      d="M6.301 1a1.063 1.063 0 01.656.226 1.1 1.1 0 01.277.32l.672 1.176a.397.397 0 00.32.2l.025.001c.124 0 .24-.058.317-.158a1.068 1.068 0 011.522-.19c.112.09.204.2.278.334l1.075 1.885c.553.971.7 2.102.413 3.185a4.162 4.162 0 01-1.93 2.548 4.098 4.098 0 01-2.064.564 4.127 4.127 0 01-3.597-2.1L2.278 5.504a1.078 1.078 0 01-.135-.404 1.087 1.087 0 01.028-.424 1.081 1.081 0 01.914-.801.398.398 0 00.305-.242.407.407 0 00-.021-.359l-.227-.398a1.098 1.098 0 01.393-1.491 1.072 1.072 0 01.82-.11c.172.048.331.137.458.26a.399.399 0 00.604-.068c.01-.015.221-.248.345-.32A1.062 1.062 0 016.301 1z"
      stroke="#FF8674"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4.922 5.783L4.18 4.48l-.409-.717a1.026 1.026 0 00-.62-.483 1.011 1.011 0 00-.777.103A1.046 1.046 0 002 4.798l1.214 2.13-.307-.536a1.022 1.022 0 00-1.018-.508 1.018 1.018 0 00-.854.758 1.05 1.05 0 00.102.786l1.987 3.485a4.097 4.097 0 002.483 1.93 4.044 4.044 0 003.102-.414 4.136 4.136 0 001.905-2.514 4.189 4.189 0 00-.409-3.142L9.126 4.881a1.032 1.032 0 00-.62-.497 1.01 1.01 0 00-1.087.372 1.043 1.043 0 00-.063 1.16l.628 1.088-1.987-3.479a1.03 1.03 0 00-.621-.482 1.009 1.009 0 00-.775.103 1.027 1.027 0 00-.477.629 1.05 1.05 0 00.102.785l.696 1.223z"
      fill="#fff"
    />
    <Path
      d="M4.922 5.783L4.18 4.48l-.409-.717a1.026 1.026 0 00-.62-.483 1.011 1.011 0 00-.777.103A1.046 1.046 0 002 4.798l1.214 2.13-.307-.536a1.022 1.022 0 00-1.018-.508 1.018 1.018 0 00-.854.758 1.05 1.05 0 00.102.786l1.987 3.485a4.097 4.097 0 002.483 1.93 4.044 4.044 0 003.102-.414 4.136 4.136 0 001.905-2.514 4.189 4.189 0 00-.409-3.142L9.126 4.881a1.032 1.032 0 00-.62-.497 1.01 1.01 0 00-1.087.372 1.043 1.043 0 00-.063 1.16l.628 1.088-1.987-3.479a1.03 1.03 0 00-.621-.482 1.009 1.009 0 00-.775.103 1.027 1.027 0 00-.477.629 1.05 1.05 0 00.102.785l.696 1.223z"
      stroke="#FF8674"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

ClappingSVG.propTypes = {
  isDarkMode: PropTypes.bool
};

ClappingSVG.defaultProps = {
  isDarkMode: false
};

export default ClappingSVG;
