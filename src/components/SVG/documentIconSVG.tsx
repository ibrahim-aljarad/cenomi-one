import * as React from 'react';
import Svg, { ClipPath, Defs, G, Mask, Path, Rect } from 'react-native-svg';
import { RfH } from '../../utils/helpers';
import PropTypes from 'prop-types';
import { Colors } from '../../theme';
import { createStructuredSelector } from 'reselect';
import { isDarkModeSelector } from '../../containers/redux/selectors';
import { useSelector } from 'react-redux';

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector
});

const DocumentIconSVG = (props) => {
  const { isDarkMode } = useSelector(stateSelector);
  const fillColor = props.isFocused ? Colors.white : isDarkMode ? Colors.white : Colors.white;
  return (
    <Svg
      width={RfH(22)}
      height={RfH(26)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <G clip-path="url(#clip0_4429_56498)">
        <Path
          d="M2.83622 22.3879L2.83573 22.3832L1.68709 11.4559C1.60951 10.7179 2.18818 10.0752 2.93024 10.0752H20.9693C21.7262 10.0752 22.3094 10.7425 22.2081 11.4926L20.7411 22.3467L20.7397 22.3575L20.7385 22.3684C20.7378 22.3749 20.7369 22.3814 20.7359 22.3879H2.83622Z"
          stroke={fillColor}
          stroke-width="1.5"
        />
        <Mask
          id="mask0_4429_56498"
          style="mask-type:alpha"
          maskUnits="userSpaceOnUse"
          x="1"
          y="1"
          width="22"
          height="9">
          <Rect x="1" y="1" width="22" height="9" fill="#D9D9D9" />
        </Mask>
        <G mask="url(#mask0_4429_56498)">
          <Path
            d="M2.90625 10.2222V9.5H9.86328L9.86328 10.2222L9.86328 10.2241C9.86426 10.4836 9.96179 10.7374 10.1428 10.9291C10.3247 11.1216 10.5773 11.236 10.8475 11.2372H10.8496H20.8594V12.4045H1.5V11.2372H1.92187V11.2372L1.924 11.2372C2.19439 11.236 2.44711 11.1213 2.6287 10.9282C2.80939 10.7361 2.90625 10.4818 2.90625 10.2222C2.90625 10.2222 2.90625 10.2222 2.90625 10.2222Z"
            stroke={fillColor}
          />
          <Path
            d="M3.22222 12C2.88611 12 2.59838 11.8803 2.35903 11.641C2.11968 11.4016 2 11.1139 2 10.7778V2.22222C2 1.88611 2.11968 1.59838 2.35903 1.35903C2.59838 1.11968 2.88611 1 3.22222 1H9.94444L13 4.05556V10.7778C13 11.1139 12.8803 11.4016 12.641 11.641C12.4016 11.8803 12.1139 12 11.7778 12H3.22222ZM3.22222 10.7778H11.7778V4.66667H9.33333V2.22222H3.22222V10.7778ZM4.44444 9.55556H10.5556V8.33333H4.44444V9.55556ZM4.44444 4.66667H7.5V3.44444H4.44444V4.66667ZM4.44444 7.11111H10.5556V5.88889H4.44444V7.11111Z"
            fill={fillColor}
          />
          <Path
            d="M13.1111 13C12.8056 13 12.544 12.8912 12.3264 12.6736C12.1088 12.456 12 12.1944 12 11.8889V4.11111C12 3.80556 12.1088 3.54398 12.3264 3.32639C12.544 3.1088 12.8056 3 13.1111 3H19.2222L22 5.77778V11.8889C22 12.1944 21.8912 12.456 21.6736 12.6736C21.456 12.8912 21.1944 13 20.8889 13H13.1111ZM13.1111 11.8889H20.8889V6.33333H18.6667V4.11111H13.1111V11.8889ZM14.2222 10.7778H19.7778V9.66667H14.2222V10.7778ZM14.2222 6.33333H17V5.22222H14.2222V6.33333ZM14.2222 8.55556H19.7778V7.44444H14.2222V8.55556Z"
            fill={fillColor}
          />
        </G>
      </G>
      <Defs>
        <ClipPath id="clip0_4429_56498">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

DocumentIconSVG.propTypes = {
  isFocused: PropTypes.bool
};

DocumentIconSVG.defaultProps = {
  isFocused: false
};

export default DocumentIconSVG;
