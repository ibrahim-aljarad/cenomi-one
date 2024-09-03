import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { RfH } from '../../utils/helpers';
import PropTypes from 'prop-types';
import { Colors } from '../../theme';

const AnalyticsIconSVG = (props) => (
  <Svg
    width={RfH(26)}
    height={RfH(26)}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M7 17H9V12H7V17ZM15 17H17V7H15V17ZM11 17H13V14H11V17ZM11 12H13V10H11V12ZM5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H19C19.55 3 20.0208 3.19583 20.4125 3.5875C20.8042 3.97917 21 4.45 21 5V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H5ZM5 19H19V5H5V19Z"
      fill={props.isFocused ? Colors.white : Colors.white}
    />
  </Svg>
);

AnalyticsIconSVG.propTypes = {
  isFocused: PropTypes.bool
};

AnalyticsIconSVG.defaultProps = {
  isFocused: false
};

export default AnalyticsIconSVG;
