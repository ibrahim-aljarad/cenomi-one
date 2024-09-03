import * as React from 'react';
import Svg, { Rect, Path, Circle } from 'react-native-svg';
import PropTypes from 'prop-types';
import { RfH, RfW } from '../../utils/helpers';

const ApprovedStatusSVG = (props) => (
  <Svg
    width={RfW(101)}
    height={RfH(22)}
    viewBox="0 0 101 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Rect width={101} height={22} rx={4} fill="#D2FFC6" />
    <Path
      d="M31.816 15L28.54 6.6h1.392l3.36 8.4h-1.476zm-6.708 0l3.348-8.4h1.404L26.584 15h-1.476zm1.572-2.064V11.7h5.028v1.236H26.68zm8.967-.84v-1.284h1.86c.4 0 .728-.136.984-.408.256-.272.384-.624.384-1.056 0-.296-.068-.552-.204-.768a1.372 1.372 0 00-.54-.528 1.55 1.55 0 00-.804-.18h-1.68V6.6l1.704-.012c.576 0 1.084.12 1.524.36.44.232.784.556 1.032.972.248.408.372.884.372 1.428 0 .528-.116 1-.348 1.416a2.552 2.552 0 01-.972.984c-.408.232-.884.348-1.428.348h-1.884zM34.387 15V6.6h1.392V15h-1.392zm8.385-2.904v-1.284h1.86c.4 0 .728-.136.984-.408.256-.272.384-.624.384-1.056 0-.296-.068-.552-.204-.768a1.372 1.372 0 00-.54-.528 1.55 1.55 0 00-.804-.18h-1.68V6.6l1.704-.012c.576 0 1.084.12 1.524.36.44.232.784.556 1.032.972.248.408.372.884.372 1.428 0 .528-.116 1-.348 1.416a2.552 2.552 0 01-.972.984c-.408.232-.884.348-1.428.348h-1.884zM41.512 15V6.6h1.392V15h-1.392zm8.385-3.096V10.62h1.764c.272 0 .512-.06.72-.18.216-.12.388-.284.516-.492.136-.208.204-.444.204-.708 0-.4-.144-.728-.432-.984-.288-.256-.66-.384-1.116-.384h-1.656V6.6l1.704-.012c.576-.008 1.084.104 1.524.336.44.224.784.536 1.032.936s.372.86.372 1.38c0 .52-.132.98-.396 1.38-.256.4-.612.716-1.068.948a3.465 3.465 0 01-1.548.336h-1.62zM48.637 15V6.6h1.392V15h-1.392zm4.656 0l-1.968-3.408 1.08-.744L54.865 15h-1.572zm6.716.144c-.832 0-1.568-.184-2.208-.552a3.986 3.986 0 01-1.512-1.536c-.36-.656-.54-1.408-.54-2.256 0-.848.18-1.596.54-2.244a4.012 4.012 0 011.5-1.536c.632-.376 1.36-.564 2.184-.564.832 0 1.564.188 2.196.564a3.82 3.82 0 011.488 1.536c.36.648.54 1.396.54 2.244 0 .848-.18 1.6-.54 2.256a3.843 3.843 0 01-1.476 1.536c-.624.368-1.348.552-2.172.552zm0-1.272c.544 0 1.024-.132 1.44-.396.416-.264.74-.624.972-1.08.24-.464.36-.996.36-1.596 0-.592-.12-1.12-.36-1.584a2.655 2.655 0 00-.996-1.08c-.416-.264-.9-.396-1.452-.396a2.69 2.69 0 00-1.452.396 2.769 2.769 0 00-.996 1.08c-.24.456-.36.984-.36 1.584 0 .6.12 1.132.36 1.596a2.85 2.85 0 001.008 1.08c.432.264.924.396 1.476.396zM68.14 15l3.288-8.4h1.488L69.52 15h-1.38zm-.144 0L64.6 6.6h1.476l3.288 8.4h-1.368zm6.023 0V6.6h1.392V15H74.02zm1.104 0v-1.272h4.104V15h-4.104zm0-3.648v-1.248h3.624v1.248h-3.624zm0-3.48V6.6h4.068v1.272h-4.068zM83.738 15v-1.296c.392 0 .76-.072 1.104-.216a2.838 2.838 0 001.5-1.548c.144-.352.216-.732.216-1.14 0-.408-.072-.788-.216-1.14a2.878 2.878 0 00-.6-.924 2.683 2.683 0 00-.9-.612 2.7 2.7 0 00-1.104-.228V6.6c.824 0 1.552.18 2.184.54.64.352 1.14.844 1.5 1.476.368.632.552 1.36.552 2.184 0 .816-.184 1.54-.552 2.172a3.886 3.886 0 01-1.5 1.488c-.632.36-1.36.54-2.184.54zm-1.74 0v-1.296h1.74V15h-1.74zm-.9 0V6.6h1.392V15h-1.392zm.9-7.104V6.6h1.74v1.296h-1.74z"
      fill="#54B339"
    />
    <Circle cx={16.5} cy={11.5} r={4.5} stroke="#14B615" strokeWidth={0.8} />
    <Path
      d="M18.375 10.375l-2.32 2.25L15 11.602"
      stroke="#14B615"
      strokeWidth={0.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

ApprovedStatusSVG.propTypes = {
  isDarkMode: PropTypes.bool
};

ApprovedStatusSVG.defaultProps = {
  isDarkMode: false
};

export default ApprovedStatusSVG;
