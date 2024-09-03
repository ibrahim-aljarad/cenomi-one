import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import { RfH, RfW } from '../../utils/helpers';
import { Colors } from '../../theme';

const MailDeliveryMoreOptions = (props) => (
  <Svg
    width={RfW(24)}
    height={RfH(24)}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M17 20.5H7c-3 0-5-1.5-5-5v-7c0-3.5 2-5 5-5h10c3 0 5 1.5 5 5v7c0 3.5-2 5-5 5z"
      fill="#7BBDFF"
      stroke={props.isDarkMode ? Colors.white : Colors.charlestonGreen}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M19 4l-5.03 5.34c-.95.88-2.508.88-3.458 0L5 4"
      fill={props.isDarkMode ? Colors.black : Colors.white}
    />
    <Path
      d="M19 4l-5.03 5.34c-.95.88-2.508.88-3.458 0L5 4"
      stroke={props.isDarkMode ? Colors.white : Colors.charlestonGreen}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      stroke={props.isDarkMode ? Colors.white : Colors.hexBlack}
      strokeWidth={1.5}
      strokeLinecap="round"
      d="M5.75 13.25L7.25 13.25"
    />
    <Path
      stroke={props.isDarkMode ? Colors.white : Colors.hexBlack}
      strokeWidth={1.5}
      strokeLinecap="round"
      d="M5.75 16.25L9.25 16.25"
    />
  </Svg>
);
MailDeliveryMoreOptions.propTypes = {
  isDarkMode: PropTypes.bool
};

MailDeliveryMoreOptions.defaultProps = {
  isDarkMode: false
};
export default MailDeliveryMoreOptions;
