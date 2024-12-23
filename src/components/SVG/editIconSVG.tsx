import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import { Colors } from '../../theme';

const EditIconSVG = (props) => (
  <Svg
    width={17}
    height={17}
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M11.656 1.781a2.226 2.226 0 013.156 0l.407.407a2.226 2.226 0 010 3.156L9.03 11.53a2.15 2.15 0 01-.969.563L4.938 13a.708.708 0 01-.72-.219.708.708 0 01-.218-.719l.906-3.124a2.15 2.15 0 01.563-.97l6.187-6.187zm2.094 1.063a.736.736 0 00-1.031 0l-.938.906 1.469 1.469.906-.938a.736.736 0 000-1.031l-.406-.406zm-7.406 6.5l-.532 1.844 1.844-.532a.648.648 0 00.313-.187l4.218-4.219-1.437-1.438-4.219 4.22a.648.648 0 00-.187.312zM6.25 3a.76.76 0 01.75.75.74.74 0 01-.75.75h-3.5c-.719 0-1.25.563-1.25 1.25v8.5c0 .719.531 1.25 1.25 1.25h8.5c.688 0 1.25-.531 1.25-1.25v-3.5a.74.74 0 01.75-.75.76.76 0 01.75.75v3.5c0 1.531-1.25 2.75-2.75 2.75h-8.5A2.734 2.734 0 010 14.25v-8.5C0 4.25 1.219 3 2.75 3h3.5z"
      fill={props.isDarkMode ? Colors.white : Colors.blackFour}
    />
  </Svg>
);

EditIconSVG.propTypes = {
  isDarkMode: PropTypes.bool
};

EditIconSVG.defaultProps = {
  isDarkMode: false
};

export default EditIconSVG;
