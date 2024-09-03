import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { RfH } from '../../utils/helpers';
import PropTypes from 'prop-types';
import { Colors } from '../../theme';

const IncidentsIconSVG = (props) => (
  <Svg width={RfH(26)} height={RfH(26)}>
    <G scale={RfH(1)} fill="none" fillRule="evenodd">
      <Path fill="none" d="M0 24h24V0H0z" />
      <G
        strokeWidth={props?.isFocused ? 0 : 1.5}
        stroke={props?.isFocused ? Colors.mediumSlateBlue : Colors.philippineGray}
        strokeLinecap="round"
        strokeLinejoin="round">
        <Path
          d="m23.578 18.234-5.86-5.812c-.702-.75-1.687-1.078-2.624-1.078-.75 0-1.453.187-2.063.61L9 7.921V4.5L3 0 0 3l4.5 6h3.422l4.031 3.984a3.76 3.76 0 0 0 .469 4.735l5.86 5.86c.28.28.655.42 1.03.42s.797-.14 1.079-.42l3.187-3.188a1.589 1.589 0 0 0 0-2.157Z"
          fill={props?.isFocused ? Colors.primary : 'none'}
        />
      </G>
      <Path d="M7.5 7.5H5.25L1.969 3.14 3.14 1.97 7.5 5.25z" />
      <Path
        d="M10.547 17.719c-.235-.422-.844-.516-1.172-.188l-4.313 4.313c-.703.703-1.828.89-2.625.328a2.073 2.073 0 0 1-.328-3.188l6.328-6.328c.282-.281.282-.75 0-1.078-.328-.281-.796-.281-1.078 0l-6.328 6.328a3.652 3.652 0 0 0 0 5.063 3.68 3.68 0 0 0 3 .984c.844-.094 1.547-.516 2.156-1.125l4.22-4.219c.234-.234.327-.609.14-.89Zm1.64-13.547c.188-.375.47-.703.797-1.031C14.016 2.062 15.422 1.5 16.922 1.5c.281 0 .61.047.937.094l-3.234 3.234.656 3.89 3.89.657 3.235-3.234c.328 1.78-.234 3.562-1.547 4.875a2.467 2.467 0 0 1-.656.562c-.375.281-.375.797-.094 1.125h.047c.235.281.656.281.938.094.328-.235.562-.469.843-.703 1.782-1.782 2.438-4.313 1.829-6.75a1.156 1.156 0 0 0-.891-.89c-.469-.095-.89 0-1.219.327l-3 3-2.11-.375-.327-2.062 3-3c.328-.328.468-.797.328-1.219-.14-.469-.469-.797-.938-.89a6.986 6.986 0 0 0-6.703 1.827 8.719 8.719 0 0 0-.984 1.313.71.71 0 0 0 .094.89c.328.329.937.282 1.171-.093ZM3 20.25c0 .422.328.75.75.75a.74.74 0 0 0 .75-.75.74.74 0 0 0-.75-.75.74.74 0 0 0-.75.75Z"
        fill={props?.isFocused ? Colors.primary : Colors.philippineGray}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

IncidentsIconSVG.propTypes = {
  isFocused: PropTypes.bool
};

IncidentsIconSVG.defaultProps = {
  isFocused: false
};

export default IncidentsIconSVG;
