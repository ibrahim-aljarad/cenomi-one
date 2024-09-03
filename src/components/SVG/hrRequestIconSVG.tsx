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

const HrRequestIconSVG = (props) => {
  const { isDarkMode } = useSelector(stateSelector);
  return (
    <Svg
      width={RfH(26)}
      height={RfH(26)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M6.4667 16.6667H13.1334V15H6.4667V16.6667ZM16.1334 16.6667H17.8V7.33335H16.1334V16.6667ZM6.4667 12.8333H13.1334V11.1667H6.4667V12.8333ZM6.4667 9H13.1334V7.33335H6.4667V9ZM3.66667 21C3.21667 21 2.8264 20.8347 2.49585 20.5042C2.16528 20.1736 2 19.7833 2 19.3333V4.66665C2 4.21665 2.16528 3.82638 2.49585 3.49583C2.8264 3.16528 3.21667 3 3.66667 3H20.6C21.05 3 21.4403 3.16528 21.7709 3.49583C22.1014 3.82638 22.2667 4.21665 22.2667 4.66665V19.3333C22.2667 19.7833 22.1014 20.1736 21.7709 20.5042C21.4403 20.8347 21.05 21 20.6 21H3.66667ZM3.66667 19.3333H20.6V4.66665H3.66667V19.3333Z"
        fill={props.isFocused ? Colors.white : isDarkMode ? Colors.white : Colors.white}
      />
    </Svg>
  );
};

HrRequestIconSVG.propTypes = {
  isFocused: PropTypes.bool
};

HrRequestIconSVG.defaultProps = {
  isFocused: false
};

export default HrRequestIconSVG;
