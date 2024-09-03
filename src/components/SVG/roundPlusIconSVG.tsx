import * as React from 'react';
import Svg, { Defs, Rect, G, Use, Path } from 'react-native-svg';
import { Colors } from '../../theme';
import { RfH } from '../../utils/helpers';
import PropTypes from 'prop-types';

const RoundPlusIconSVG = (props) => (
  <Svg
    width={RfH(112)}
    height={RfH(112)}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}>
    <Defs>
      <Rect id="b" x={0} y={0} width={64} height={64} rx={32} />
    </Defs>
    <G fill="none" fillRule="evenodd">
      <G transform="translate(24 14)">
        <Use fill="#000" filter="url(#a)" xlinkHref="#b" />
        <Use
          stroke={props?.isDarkMode ? 'none' : Colors.gray97}
          strokeWidth={0.5}
          fill={props?.isDarkMode ? Colors.darkModeButton : Colors.white}
          xlinkHref="#b"
        />
      </G>
      <Rect width={48} height={48} rx={24} fill="#0067D3" transform="translate(32 22)" />
      <Path fill="none" d="M44 58h24V34H44z" fillOpacity={0} />
      <Path
        d="M63.875 46.5a.95.95 0 0 0-.938-.937h-6.25v-6.25a.95.95 0 0 0-.937-.938.95.95 0 0 0-.938.938v6.25h-6.25a.95.95 0 0 0-.937.937c0 .508.43.938.937.938h6.25v6.25c0 .507.43.937.938.937a.95.95 0 0 0 .937-.937v-6.25h6.25a.95.95 0 0 0 .938-.938Z"
        fill="#FFF"
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

RoundPlusIconSVG.propTypes = {
  isDarkMode: PropTypes.bool
};

RoundPlusIconSVG.defaultProps = {
  isDarkMode: false
};

export default RoundPlusIconSVG;
