import * as React from 'react';
import Svg, { G, Path, Ellipse } from 'react-native-svg';
import { RfH } from '../../utils/helpers';
import PropTypes from 'prop-types';
import { Colors } from '../../theme';

const RedeemOfferSVG = (props) => (
  <Svg width={RfH(97)} height={RfH(120)} xmlns="http://www.w3.org/2000/svg" {...props}>
    <G fill="none" fillRule="evenodd" scale={RfH(1)}>
      <G transform="rotate(-5 98.476 4.09)">
        <Path
          d="M43.315 31.14c-14.9-2.05-23.506-6.151-25.818-12.302C14.028 9.612 25.589-2.304 34.452.387c5.908 1.793 8.863 12.044 8.863 30.752Z"
          fill={props?.isDarkMode ? Colors.white : Colors.blueNine}
        />
        <Path
          d="M39.477 27.102c-8.032-1.19-12.671-3.569-13.918-7.137-1.87-5.353 4.362-12.267 9.14-10.706 3.185 1.04 4.778 6.989 4.778 17.843Z"
          fill={props?.isDarkMode ? Colors.blueNine : Colors.white}
        />
        <Path
          d="M45.989 30.93c14.89 2.126 24.295.551 28.217-4.725 5.883-7.915-1.937-22.549-11.2-22.4-6.176.1-11.848 9.142-17.017 27.125Z"
          fill={props?.isDarkMode ? Colors.white : Colors.blueNine}
        />
        <Path
          d="M52.809 27.881c7.364.975 12.046.05 14.044-2.775 2.997-4.238-.735-11.886-5.332-11.715-3.064.114-5.968 4.944-8.712 14.49Z"
          fill={props?.isDarkMode ? Colors.blueNine : Colors.white}
        />
        <Path
          d="m14.296 28.618 61.649 5.38c6.052.53 10.53 5.864 10 11.916-.027.315-.068.63-.122.941-.965 5.513-2.156 8.931-3.574 10.253-3.373 3.147-46.867 15.898-65.821 8.786C6.27 62.082 1.58 53.11 2.356 38.977 2.688 32.91 7.874 28.26 13.94 28.593a11 11 0 0 1 .356.025Z"
          fill="#6CBFF4"
        />
        <Path
          d="M47.243 29.385 32.737 39.884c-2.295 1.737-2.14 3.216.467 4.44 2.608 1.222 4.286 3.041 5.036 5.456 1.189 1.87 2.607 1.223 4.256-1.942 1.65-3.166 3.826-8.381 6.53-15.647l1.738-4.671-3.52 1.865Z"
          fill={props?.isDarkMode ? Colors.white : Colors.blueNine}
        />
        <Path
          d="m49.013 31.88 14.5 14.373c2.28 2.357 1.828 3.932-1.358 4.725-3.185.793-5.428 2.424-6.73 4.892-1.696 1.787-3.185.793-4.466-2.982-1.28-3.775-2.777-9.884-4.49-18.328l-1.102-5.428 3.646 2.747Z"
          fill={props?.isDarkMode ? Colors.white : Colors.blueNine}
        />
        <Ellipse
          fill={Colors.blueNine}
          transform="rotate(5 45.52 28.83)"
          cx={45.52}
          cy={28.831}
          rx={8.028}
          ry={4.505}
        />
        <Ellipse
          fill={Colors.white}
          transform="rotate(5 45.52 28.83)"
          cx={45.52}
          cy={28.831}
          rx={4.46}
          ry={2.503}
        />
        <Path
          d="m57.202 109.736-38.32-3.344a10.463 10.463 0 0 1-9.139-7.511 7.135 7.135 0 0 1 4.938-8.858C55.492 78.648 75.519 77.29 74.759 85.95c-.454 5.182-1.52 10.064-3.196 14.645a13.996 13.996 0 0 1-14.36 9.141Z"
          fill="#6CBFF4"
        />
        <Ellipse
          fill={props?.isDarkMode ? Colors.white : Colors.blueNine}
          transform="rotate(5 17.569 77.639)"
          cx={17.569}
          cy={77.639}
          rx={3.512}
          ry={3.504}
        />
        <Ellipse
          fill={props?.isDarkMode ? Colors.white : Colors.blueNine}
          transform="rotate(5 34.825 76.13)"
          cx={34.825}
          cy={76.13}
          rx={3.512}
          ry={3.504}
        />
        <Ellipse
          fill={props?.isDarkMode ? Colors.white : Colors.blueNine}
          transform="rotate(5 51.169 73.537)"
          cx={51.169}
          cy={73.537}
          rx={3.512}
          ry={3.504}
        />
        <Ellipse
          fill={props?.isDarkMode ? Colors.white : Colors.blueNine}
          transform="rotate(5 69.512 71.119)"
          cx={69.512}
          cy={71.119}
          rx={3.512}
          ry={3.504}
        />
      </G>
    </G>
  </Svg>
);

RedeemOfferSVG.propTypes = {
  isDarkMode: PropTypes.bool
};

RedeemOfferSVG.defaultProps = {
  isDarkMode: false
};

export default RedeemOfferSVG;
