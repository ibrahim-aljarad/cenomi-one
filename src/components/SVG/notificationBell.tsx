import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { RfH } from '../../utils/helpers';
import PropTypes from 'prop-types';
import { Colors } from '../../theme';

const NotificationBell = (props) => (
  <Svg width={RfH(20)} height={RfH(24)} xmlns="http://www.w3.org/2000/svg">
    <Path
      scale={RfH(1)}
      d="M0 15.7692V14.7692H1.61537V6.84615C1.61537 5.53975 2.02884 4.39072 2.85577 3.39905C3.68269 2.40737 4.73077 1.78973 6 1.54615V1C6 0.722217 6.097 0.4861 6.291 0.29165C6.485 0.0972171 6.72058 0 6.99775 0C7.2749 0 7.51123 0.0972171 7.70673 0.29165C7.90224 0.4861 8 0.722217 8 1V1.54615C9.26923 1.78973 10.3173 2.40737 11.1442 3.39905C11.9712 4.39072 12.3846 5.53975 12.3846 6.84615V14.7692H14V15.7692H0ZM6.9966 18.3846C6.55143 18.3846 6.17148 18.2265 5.85673 17.9101C5.54199 17.5938 5.38463 17.2135 5.38463 16.7692H8.61537C8.61537 17.2167 8.45687 17.5978 8.13987 17.9125C7.82286 18.2273 7.44177 18.3846 6.9966 18.3846ZM2.61537 14.7692H11.3846V6.84615C11.3846 5.63077 10.9577 4.59615 10.1039 3.7423C9.25 2.88847 8.21538 2.46155 7 2.46155C5.78462 2.46155 4.75 2.88847 3.89615 3.7423C3.0423 4.59615 2.61537 5.63077 2.61537 6.84615V14.7692Z"
      fill={props?.isDarkMode ? Colors.white : Colors.white}
      fillRule="nonzero"
    />
  </Svg>
);

NotificationBell.propTypes = {
  isDarkMode: PropTypes.bool
};

NotificationBell.defaultProps = {
  isDarkMode: false
};

export default NotificationBell;
