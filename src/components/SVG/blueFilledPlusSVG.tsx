import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import { RfH, RfW } from '../../utils/helpers';

const BlueFilledPlusSVG = (props) => (
  <Svg
    width={RfW(21)}
    height={RfH(21)}
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M10.5 20.5a9.97 9.97 0 01-10-10c0-5.508 4.453-10 10-10 5.508 0 10 4.492 10 10 0 5.547-4.492 10-10 10zm-.938-6.563c0 .547.391.938.938.938.508 0 .938-.39.938-.938v-2.5h2.5c.507 0 .937-.39.937-.937a.95.95 0 00-.938-.938h-2.5v-2.5a.95.95 0 00-.937-.937.925.925 0 00-.938.938v2.5h-2.5a.925.925 0 00-.937.937c0 .547.39.938.938.938h2.5v2.5z"
      fill="#06C"
    />
  </Svg>
);

BlueFilledPlusSVG.propTypes = {
  isDarkMode: PropTypes.bool
};

BlueFilledPlusSVG.defaultProps = {
  isDarkMode: false
};

export default BlueFilledPlusSVG;
