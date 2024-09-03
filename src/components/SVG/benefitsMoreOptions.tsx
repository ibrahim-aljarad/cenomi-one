import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import { RfH, RfW } from '../../utils/helpers';
import { Colors } from '../../theme';

const BenefitsMoreOptions = (props) => (
  <Svg
    width={RfW(22)}
    height={RfH(23)}
    viewBox="0 0 22 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21 5v2.42C21 9 20 10 18.42 10H15V3.01C15 1.9 15.91 1 17.02 1c1.09.01 2.09.45 2.81 1.17C20.55 2.9 21 3.9 21 5z"
      fill={props.isDarkMode ? Colors.black : Colors.white}
      stroke={props.isDarkMode ? Colors.white : Colors.blueFive}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1 6v14c0 .83.94 1.3 1.6.8l1.71-1.28c.4-.3.96-.26 1.32.1l1.66 1.67c.39.39 1.03.39 1.42 0l1.68-1.68c.35-.35.91-.39 1.3-.09l1.71 1.28c.66.49 1.6.02 1.6-.8V3c0-1.1.9-2 2-2H5C2 1 1 2.79 1 5v1z"
      fill="#7BBDFF"
      stroke={props.isDarkMode ? Colors.white : Colors.blueFive}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5.27 12.73l5.46-5.46"
      stroke={props.isDarkMode ? Colors.white : Colors.blueFive}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10.925 12.5h.009"
      stroke={props.isDarkMode ? Colors.white : Colors.blueFive}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5.194 7.5h.01"
      stroke={props.isDarkMode ? Colors.white : Colors.blackFour}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
BenefitsMoreOptions.propTypes = {
  isDarkMode: PropTypes.bool
};

BenefitsMoreOptions.defaultProps = {
  isDarkMode: false
};
export default BenefitsMoreOptions;
