import * as React from 'react';
import Svg, { G, Circle, Path } from 'react-native-svg';
import { RfH } from '../../utils/helpers';
import PropTypes from 'prop-types';
import { Colors } from '../../theme';

const CheckIconSVG = (props) => (
  <Svg width={RfH(18)} height={RfH(18)} xmlns="http://www.w3.org/2000/svg" {...props}>
    <G fill="none" fillRule="evenodd" scale={RfH(1)}>
      <Circle
        cx={8}
        cy={8}
        r={7.6}
        fill={props.isEnabled ? Colors.blueNine : 'none'}
        stroke={props.isDarkMode ? Colors.white : Colors.blackFour}
        strokeWidth={0.8}
      />
      {props.isEnabled ? (
        <>
          <Path d="M2 2h12v12H2z" />
          <Path
            stroke="#FFF"
            strokeWidth={0.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m12 6-5.333 5L4 8.5"
          />
        </>
      ) : null}
    </G>
  </Svg>
);

CheckIconSVG.propTypes = {
  isDarkMode: PropTypes.bool,
  isEnabled: PropTypes.bool
};

CheckIconSVG.defaultProps = {
  isDarkMode: false,
  isEnabled: true
};

export default CheckIconSVG;
