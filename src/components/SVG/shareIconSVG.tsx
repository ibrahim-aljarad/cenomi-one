import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { RfH } from '../../utils/helpers';
import PropTypes from 'prop-types';
import { Colors } from '../../theme';

const ShareIconSVG = (props) => (
  <Svg width={RfH(14)} height={RfH(14)} xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      scale={RfH(1)}
      d="M10.781 8.437c-.761 0-1.406.352-1.845.909L4.6 7.178a2.23 2.23 0 0 0 .087-.616c0-.205-.029-.41-.087-.615L8.936 3.78c.439.557 1.084.908 1.845.908a2.35 2.35 0 0 0 2.344-2.343A2.35 2.35 0 0 0 10.781 0a2.35 2.35 0 0 0-2.344 2.344c0 .205.03.41.088.615L4.19 5.127a2.318 2.318 0 0 0-1.845-.908A2.35 2.35 0 0 0 0 6.562a2.35 2.35 0 0 0 2.344 2.344c.761 0 1.406-.351 1.845-.908l4.336 2.168a2.23 2.23 0 0 0-.088.615 2.35 2.35 0 0 0 2.344 2.344 2.35 2.35 0 0 0 2.344-2.344 2.35 2.35 0 0 0-2.344-2.344Zm0-7.5c.762 0 1.406.645 1.406 1.407 0 .761-.644 1.406-1.406 1.406a1.426 1.426 0 0 1-1.406-1.406c0-.762.645-1.407 1.406-1.407ZM2.344 7.97A1.426 1.426 0 0 1 .937 6.562c0-.761.645-1.406 1.407-1.406.761 0 1.406.645 1.406 1.406 0 .762-.645 1.407-1.406 1.407Zm8.437 4.218a1.426 1.426 0 0 1-1.406-1.406c0-.761.645-1.406 1.406-1.406.762 0 1.406.645 1.406 1.406 0 .762-.644 1.406-1.406 1.406Z"
      fill={props?.isDarkMode ? Colors.white : Colors.black}
      fillRule="nonzero"
    />
  </Svg>
);

ShareIconSVG.propTypes = {
  isDarkMode: PropTypes.bool
};

ShareIconSVG.defaultProps = {
  isDarkMode: false
};

export default ShareIconSVG;
