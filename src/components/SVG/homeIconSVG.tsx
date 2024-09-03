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

const HomeIconSVG = (props) => {
  const { isDarkMode } = useSelector(stateSelector);
  return (
    <Svg
      width={RfH(26)}
      height={RfH(26)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M5.66665 19.3333H9.16667V13.1667H14.8333V19.3333H18.3333V9.83333L12 5.08333L5.66665 9.83333V19.3333ZM4 21V9L12 3L20 9V21H13.1667V14.8333H10.8333V21H4Z"
        fill={props.isFocused ? Colors.white : isDarkMode ? Colors.white : Colors.white}
      />
    </Svg>
  );
};

HomeIconSVG.propTypes = {
  isFocused: PropTypes.bool
};

HomeIconSVG.defaultProps = {
  isFocused: false
};

export default HomeIconSVG;
