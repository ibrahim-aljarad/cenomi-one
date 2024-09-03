import * as React from 'react';
import Svg, { G, Path, Rect } from 'react-native-svg';
import { Colors } from '../../theme';
import { RfH, RfW } from '../../utils/helpers';
import PropTypes from 'prop-types';

const ListMenuSVG = (props) => (
  <Svg width={RfW(28)} height={RfH(28)} xmlns="http://www.w3.org/2000/svg" {...props}>
    <G scale={RfH(1)} fill="none" fillRule="evenodd">
      <Path d="M28 0v28H0V0h28Z" fill="none" />
      <G transform="translate(4 5)" stroke={props.isDarkMode ? Colors.white : Colors.black}>
        <Rect x={0.5} y={0.5} width={19} height={3} rx={1.5} />
        <Rect x={0.5} y={7.5} width={19} height={3} rx={1.5} />
        <Rect x={0.5} y={14.5} width={19} height={3} rx={1.5} />
      </G>
    </G>
  </Svg>
);

ListMenuSVG.propTypes = {
  isDarkMode: PropTypes.bool
};

ListMenuSVG.defaultProps = {
  isDarkMode: false
};

export default ListMenuSVG;
