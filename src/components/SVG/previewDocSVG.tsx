import * as React from 'react';
import { Colors } from '../../theme';
import PropTypes from 'prop-types';
import { RfH, RfW } from '../../utils/helpers';
import Svg, { G, Path, Circle } from 'react-native-svg';

const PreviewDocSVG = (props) => (
  <Svg width={25} height={25} xmlns="http://www.w3.org/2000/svg" {...props}>
    <G
      transform="translate(.5 .88)"
      stroke={props.isDarkMode ? Colors.white : Colors.black}
      fill="none"
      fillRule="evenodd">
      <Path
        d="M12 6.6c3.406 0 6.476 1.829 9.246 5.4-2.77 3.571-5.84 5.4-9.246 5.4-3.406 0-6.476-1.829-9.246-5.4C5.524 8.429 8.594 6.6 12 6.6Z"
        strokeWidth={1.2}
      />
      <Circle cx={12} cy={12} r={2.5} />
    </G>
  </Svg>
);
PreviewDocSVG.propTypes = {
  isDarkMode: PropTypes.bool
};

PreviewDocSVG.defaultProps = {
  isDarkMode: false
};
export default PreviewDocSVG;
