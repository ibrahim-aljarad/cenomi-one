import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { RfH } from '../../utils/helpers';
import PropTypes from 'prop-types';
import { Colors } from '../../theme';
import { isDarkModeSelector } from '../../containers/redux/selectors';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector
});

const MoreOptionsIconSVG = (props) => {
  const { isDarkMode } = useSelector(stateSelector);
  const iconColor = props.isFocused ? Colors.white : isDarkMode ? Colors.white : Colors.white;
  return (
    // <Svg
    //   width={RfH(26)}
    //   height={RfH(26)}
    //   viewBox="0 0 24 24"
    //   fill="none"
    //   xmlns="http://www.w3.org/2000/svg">
    //   <Path
    //     d="M12 20C11.45 20 10.9792 19.8042 10.5875 19.4125C10.1958 19.0208 10 18.55 10 18C10 17.45 10.1958 16.9792 10.5875 16.5875C10.9792 16.1958 11.45 16 12 16C12.55 16 13.0208 16.1958 13.4125 16.5875C13.8042 16.9792 14 17.45 14 18C14 18.55 13.8042 19.0208 13.4125 19.4125C13.0208 19.8042 12.55 20 12 20ZM12 14C11.45 14 10.9792 13.8042 10.5875 13.4125C10.1958 13.0208 10 12.55 10 12C10 11.45 10.1958 10.9792 10.5875 10.5875C10.9792 10.1958 11.45 10 12 10C12.55 10 13.0208 10.1958 13.4125 10.5875C13.8042 10.9792 14 11.45 14 12C14 12.55 13.8042 13.0208 13.4125 13.4125C13.0208 13.8042 12.55 14 12 14ZM12 8C11.45 8 10.9792 7.80417 10.5875 7.4125C10.1958 7.02083 10 6.55 10 6C10 5.45 10.1958 4.97917 10.5875 4.5875C10.9792 4.19583 11.45 4 12 4C12.55 4 13.0208 4.19583 13.4125 4.5875C13.8042 4.97917 14 5.45 14 6C14 6.55 13.8042 7.02083 13.4125 7.4125C13.0208 7.80417 12.55 8 12 8Z"
    //     fill={props.isFocused ? Colors.white : isDarkMode ? Colors.white : Colors.white}
    //   />
    // </Svg>
    <Svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M12.5 3.75H3.75V12.5H12.5V3.75Z"
        stroke={iconColor}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M26.25 3.75H17.5V12.5H26.25V3.75Z"
        stroke={iconColor}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M26.25 17.5H17.5V26.25H26.25V17.5Z"
        stroke={iconColor}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M12.5 17.5H3.75V26.25H12.5V17.5Z"
        stroke={iconColor}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

MoreOptionsIconSVG.propTypes = {
  isFocused: PropTypes.bool
};

MoreOptionsIconSVG.defaultProps = {
  isFocused: false
};

export default MoreOptionsIconSVG;
