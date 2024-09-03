import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '../../theme';
import PropTypes from 'prop-types';
import { RfH, RfW } from '../../utils/helpers';

const ReAttachmentDocSVG = (props) => (
  <Svg width={25} height={25} xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      d="m16.054 8.785-.84-.84-6.889 6.889a2.197 2.197 0 0 0 0 3.103 2.197 2.197 0 0 0 3.104 0l9.252-9.252a3.349 3.349 0 0 0 .987-2.384c0-.9-.35-1.747-.987-2.383a3.349 3.349 0 0 0-2.384-.988c-.9 0-1.747.351-2.384.988L4.664 15.167a4.518 4.518 0 0 0-1.332 3.216c0 1.214.473 2.356 1.332 3.215A4.518 4.518 0 0 0 7.88 22.93a4.518 4.518 0 0 0 3.216-1.332l8.885-8.886-.84-.84-8.886 8.886a3.338 3.338 0 0 1-2.375.984c-.898 0-1.741-.35-2.376-.984a3.338 3.338 0 0 1-.984-2.375c0-.898.35-1.741.984-2.376l11.25-11.249a2.185 2.185 0 0 1 3.086 0 2.185 2.185 0 0 1 0 3.087l-9.252 9.252a1.007 1.007 0 0 1-1.423-1.423l6.89-6.889Z"
      fill={props.isDarkMode ? Colors.white : Colors.black}
      fillRule="nonzero"
    />
  </Svg>
);
ReAttachmentDocSVG.propTypes = {
  isDarkMode: PropTypes.bool
};

ReAttachmentDocSVG.defaultProps = {
  isDarkMode: false
};
export default ReAttachmentDocSVG;
