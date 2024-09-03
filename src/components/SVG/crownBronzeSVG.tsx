import * as React from 'react';
import Svg, { Circle, Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { RfH, RfW } from '../../utils/helpers';
import PropTypes from 'prop-types';
import { Colors } from '../../theme';

const CrownBronzeSVG = (props) => (
  <Svg
    width={RfW(17)}
    height={RfH(17)}
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Circle cx={8.5} cy={8.5} r={8} fill="#fff" stroke="#DCDCDC" />
    <Path
      d="M8.869 5.988L9.871 8.01c.158.316.58.404.844.193l1.582-1.265a.677.677 0 01-.14-.422c0-.387.298-.704.702-.704.387 0 .703.317.703.704a.694.694 0 01-.703.703h-.017l-.809 4.43c-.088.527-.563.914-1.107.914h-4.87c-.544 0-1.02-.387-1.107-.915l-.809-4.43a.684.684 0 01-.703-.702c0-.387.3-.704.703-.704a.705.705 0 01.563 1.125l1.564 1.266c.282.211.686.123.844-.193l1.02-2.022a.665.665 0 01-.334-.597c0-.387.299-.704.703-.704a.702.702 0 01.37 1.3z"
      fill="url(#paint0_linear_2293_28641)"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_2293_28641"
        x1={2.54851}
        y1={8.74553}
        x2={10.9105}
        y2={5.0694}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#824B1B" />
        <Stop offset={1} stopColor="#BD8743" />
      </LinearGradient>
    </Defs>
  </Svg>
);

CrownBronzeSVG.propTypes = {
  isDarkMode: PropTypes.bool
};

CrownBronzeSVG.defaultProps = {
  isDarkMode: false
};

export default CrownBronzeSVG;
