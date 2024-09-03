import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { Colors } from '../../theme';
import { RfH, RfW } from '../../utils/helpers';
import PropTypes from 'prop-types';

const SearchSVG = (props) => (
  <Svg
    width={RfW(18)}
    height={RfH(18)}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}>
    <G scale={RfH(1)} id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
      <G
        id="Dark-theme-New-OCA-App-Assets"
        transform="translate(-482.000000, -2157.000000)"
        fill={props?.isDarkMode ? Colors.white : Colors.black}
        fillRule="nonzero">
        <Path
          d="M499.834772,2174.04023 L494.860163,2169.06563 C495.957038,2167.78594 496.593367,2166.13008 496.593367,2164.3125 C496.593367,2160.27305 493.319265,2157 489.280867,2157 C485.242468,2157 482,2160.2741 482,2164.3125 C482,2168.3509 485.273757,2171.625 489.280867,2171.625 C491.097742,2171.625 492.756063,2170.95844 494.033991,2169.86191 L499.008601,2174.83652 C499.149226,2174.94375 499.293367,2175 499.437508,2175 C499.581648,2175 499.725366,2174.94509 499.835125,2174.83519 C500.056257,2174.6168 500.056257,2174.2582 499.834773,2174.04023 L499.834772,2174.04023 Z M489.312508,2170.5 C485.87071,2170.5 483.125007,2167.72266 483.125007,2164.3125 C483.125007,2160.90234 485.87071,2158.125 489.312508,2158.125 C492.754304,2158.125 495.500008,2160.8707 495.500008,2164.3125 C495.500008,2167.7543 492.722664,2170.5 489.312508,2170.5 Z"
          id="Shape-Copy-2"
        />
      </G>
    </G>
  </Svg>
);

SearchSVG.propTypes = {
  isDarkMode: PropTypes.bool
};

SearchSVG.defaultProps = {
  isDarkMode: false
};

export default SearchSVG;
