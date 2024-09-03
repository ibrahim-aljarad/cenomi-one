import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '../../theme';
import { RfW } from '../../utils/helpers';
import PropTypes from 'prop-types';

const DateFilterIconSVG = (props) => (
  <Svg width={RfW(17)} height={RfW(17 * 0.79)} xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      scale={RfW(1)}
      d="M12.031 2.031h1.313c.355 0 .656-.3.656-.656 0-.355-.3-.656-.656-.656H12.03c-.355 0-.656.3-.656.656 0 .355.3.656.656.656Zm1.313 3.063H9.406c-.355 0-.656.3-.656.656 0 .355.3.656.656.656h3.938c.355 0 .656-.3.656-.656 0-.355-.3-.656-.656-.656ZM9.024.5H.601c-.493 0-.793.602-.465.984L3.062 4.93v3.883c0 .218.11.41.274.546l2.187 1.532c.137.082.247.109.383.109a.665.665 0 0 0 .656-.656V4.93l2.926-3.446C9.816 1.102 9.516.5 9.023.5ZM5.55 4.082l-.301.356v4.648l-.875-.629v-4.02l-.3-.355-1.942-2.27h5.36L5.55 4.083Zm7.793 5.387H9.406c-.355 0-.656.3-.656.656 0 .355.3.656.656.656h3.938c.355 0 .656-.3.656-.656 0-.355-.3-.656-.656-.656Z"
      fill={props?.isDarkMode ? Colors.white : Colors.darkByzantineBlue}
      fillRule="nonzero"
    />
  </Svg>
);

DateFilterIconSVG.propTypes = {
  isDarkMode: PropTypes.bool
};

DateFilterIconSVG.defaultProps = {
  isDarkMode: false
};

export default DateFilterIconSVG;
