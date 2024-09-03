import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { RfH } from '../../utils/helpers';
import PropTypes from 'prop-types';
import { Colors } from '../../theme';
import { createStructuredSelector } from 'reselect';
import { isDarkModeSelector } from '../../containers/redux/selectors';
import { useSelector } from 'react-redux';

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector
});

const ApprovalIconSVG = (props) => {
  const { isDarkMode } = useSelector(stateSelector);
  return (
    <Svg
      width={RfH(26)}
      height={RfH(26)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M10.8833 17.75L16.5833 12.05L15.45 10.9167L10.875 15.4917L8.45833 13.075L7.33333 14.2L10.8833 17.75ZM5.66665 22C5.21665 22 4.82637 21.8347 4.49582 21.5042C4.16527 21.1736 4 20.7834 4 20.3334V3.66665C4 3.21665 4.16527 2.82638 4.49582 2.49583C4.82637 2.16528 5.21665 2 5.66665 2H14.35L20 7.65V20.3334C20 20.7834 19.8347 21.1736 19.5042 21.5042C19.1736 21.8347 18.7833 22 18.3333 22H5.66665ZM13.5167 8.43333V3.66665H5.66665V20.3334H18.3333V8.43333H13.5167Z"
        fill={props.isFocused ? Colors.white : isDarkMode ? Colors.white : Colors.white}
      />
    </Svg>
  );
};

ApprovalIconSVG.propTypes = {
  isFocused: PropTypes.bool
};

ApprovalIconSVG.defaultProps = {
  isFocused: false
};

export default ApprovalIconSVG;
