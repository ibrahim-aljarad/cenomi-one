import React from 'react';
import PropTypes from 'prop-types';
import {
  APPROVAL_STATUS,
  APPROVAL_STATUS_LABEL,
  LEAVE_STATUS,
  LEAVE_STATUS_LABEL
} from '../../utils/constants';
import { Colors, CommonStyles, Images } from '../../theme';
import { Platform, View } from 'react-native';
import CustomImage from '../CustomImage';
import { RfH, RfW } from '../../utils/helper';
import CustomText from '../CustomText';

function RequestStatusBadge({ status }) {
  const getColorAndIcon = () => {
    let color = '';
    let icon = '';
    switch (status) {
      case LEAVE_STATUS.AWAITING:
      case LEAVE_STATUS.PENDING:
      case LEAVE_STATUS.ORA_WDRWL_PEND:
      case APPROVAL_STATUS.INFO_REQUESTED:
        icon = Images.orangeClockIcon;
        color = Colors.shadeOfOrange;
        break;
      case LEAVE_STATUS.COMPLETED:
      case LEAVE_STATUS.SCHEDULED:
      case LEAVE_STATUS.INPROGRESS:
      case LEAVE_STATUS.APPROVED:
      case LEAVE_STATUS.AVAILED:
        icon = Images.greenTickIcon;
        color = Colors.davysGreen;
        break;
      case LEAVE_STATUS.CANCELED:
      case LEAVE_STATUS.REJECTED:
      case LEAVE_STATUS.DENIED:
        icon = Images.redCrossIcon;
        color = Colors.redTwo;
        break;
      default:
        icon = Images.orangeClockIcon;
        color = Colors.shadeOfOrange;
    }

    return { color, icon };
  };

  const { color, icon } = getColorAndIcon();

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <CustomImage image={icon} imageHeight={13} imageWidth={13} />
      <CustomText
        fontSize={12}
        color={color}
        styling={{
          ...CommonStyles.regularFont400Style,
          lineHeight: RfH(14.4),
          marginLeft: RfW(3),
          paddingTop: RfH(Platform.OS === 'android' ? 5 : 0)
        }}>
        {APPROVAL_STATUS_LABEL[status] || LEAVE_STATUS_LABEL[status] || status}
      </CustomText>
    </View>
  );
}

RequestStatusBadge.propTypes = {
  status: PropTypes.string
};

export default RequestStatusBadge;
