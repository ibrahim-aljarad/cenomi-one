import * as React from 'react';

import Svg, { Path } from 'react-native-svg';

import { Colors } from '../../theme';
import PropTypes from 'prop-types';
import { RfH } from '../../utils/helpers';
import { createStructuredSelector } from 'reselect';
import { isDarkModeSelector } from '../../containers/redux/selectors';
import { useSelector } from 'react-redux';

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector
});

const BenefitsIconSVG = (props) => {
  const { isDarkMode } = useSelector(stateSelector);
  return (
    <Svg
      width={RfH(26)}
      height={RfH(26)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M14.5083 18.3333C14.875 18.3333 15.1875 18.2014 15.4458 17.9375C15.7042 17.6736 15.8333 17.3583 15.8333 16.9917C15.8333 16.625 15.7037 16.3125 15.4445 16.0542C15.1852 15.7958 14.8704 15.6667 14.5 15.6667C14.1389 15.6667 13.8264 15.7963 13.5625 16.0556C13.2986 16.3148 13.1667 16.6296 13.1667 17C13.1667 17.3611 13.2986 17.6736 13.5625 17.9375C13.8264 18.2014 14.1417 18.3333 14.5083 18.3333ZM9.45 18.2167L15.7167 11.95L14.55 10.7834L8.28335 17.05L9.45 18.2167ZM9.50833 13.3333C9.87499 13.3333 10.1875 13.2014 10.4458 12.9375C10.7042 12.6736 10.8333 12.3583 10.8333 11.9917C10.8333 11.625 10.7037 11.3125 10.4445 11.0542C10.1852 10.7958 9.87037 10.6667 9.5 10.6667C9.13888 10.6667 8.82638 10.7963 8.5625 11.0556C8.29862 11.3148 8.16667 11.6296 8.16667 12C8.16667 12.3611 8.29862 12.6736 8.5625 12.9375C8.82638 13.2014 9.14166 13.3333 9.50833 13.3333ZM5.66665 22C5.21665 22 4.82637 21.8347 4.49582 21.5042C4.16527 21.1736 4 20.7834 4 20.3334V3.66665C4 3.21665 4.16527 2.82638 4.49582 2.49583C4.82637 2.16528 5.21665 2 5.66665 2H14.35L20 7.65V20.3334C20 20.7834 19.8347 21.1736 19.5042 21.5042C19.1736 21.8347 18.7833 22 18.3333 22H5.66665ZM13.5167 8.43333V3.66665H5.66665V20.3334H18.3333V8.43333H13.5167Z"
        fill={props.isFocused ? Colors.white : isDarkMode ? Colors.white : Colors.white}
      />
    </Svg>
  );
};

BenefitsIconSVG.propTypes = {
  isFocused: PropTypes.bool
};

BenefitsIconSVG.defaultProps = {
  isFocused: false
};

export default BenefitsIconSVG;
