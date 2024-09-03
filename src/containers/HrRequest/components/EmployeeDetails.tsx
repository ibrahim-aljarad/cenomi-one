import React from 'react';
import { View } from 'react-native';
import { CustomImage, CustomText } from '../../../components';
import AppPrimaryButton from '../../../components/AppPrimaryButton';
import { Colors, CommonStyles, Images } from '../../../theme';
import { RfH, RfW } from '../../../utils/helpers';
import styles from '../styles';
import { createStructuredSelector } from 'reselect';
import { getMyProfileDetailsSelector } from '../../LoginHome/redux/selectors';
import { useSelector } from 'react-redux';
import { BorderRadius } from '../../../theme/sizes';
import { localize } from '../../../locale/utils';

const stateSelector = createStructuredSelector({
  myProfileDetails: getMyProfileDetailsSelector
});

const EmployeeDetails = (props) => {
  const { isDarkMode, containerStyle = {} } = props || {};
  const { myProfileDetails } = useSelector(stateSelector);

  const { profile: { employeeId, displayName, workRelationships } = {} } = myProfileDetails || {};

  const { legalEntityId, assignments }: any =
    workRelationships?.length > 0 ? workRelationships[0] : {};

  const { assignmentName, departmentName }: any = assignments?.length > 0 ? assignments[0] : {};

  return (
    <View
      style={{
        backgroundColor: isDarkMode ? Colors.darkModeButton : Colors.white,
        marginHorizontal: RfW(24),
        marginTop: RfW(17),
        borderRadius: BorderRadius.BR0,
        ...containerStyle
      }}>
      <CustomImage
        image={Images.app_icon}
        imageWidth={50}
        imageHeight={20}
        imageResizeMode={'contain'}
        displayLoader={false}
        containerStyling={{
          paddingLeft: RfW(22),
          paddingTop: RfH(13)
        }}
        tintColor={isDarkMode ? Colors.white : Colors.white}
      />

      <View
        style={{
          borderTopColor: Colors.grayBorder,
          borderTopWidth: 1,
          marginBottom: RfW(14),
          marginTop: RfH(11.47)
        }}>
        <View style={{ flexDirection: 'row', marginTop: RfH(2) }}>
          <CustomText
            fontSize={14}
            color={isDarkMode ? Colors.white : Colors.white}
            styling={{
              ...styles.empDetailsLeftView,
              ...CommonStyles.regularFont400Style
            }}>
            {localize('hrRequest.employeeName')}
          </CustomText>
          <CustomText
            fontSize={14}
            color={isDarkMode ? Colors.white : Colors.white}
            styling={{
              ...styles.empDetailsRightView,
              ...CommonStyles.regularFont400Style,
              lineHeight: RfH(22)
            }}>
            {displayName || ''}
          </CustomText>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <CustomText
            fontSize={14}
            color={isDarkMode ? Colors.white : Colors.white}
            styling={{
              ...styles.empDetailsLeftView,
              ...CommonStyles.regularFont400Style
            }}>
            {localize('hrRequest.employeeNumber')}
          </CustomText>
          <CustomText
            fontSize={14}
            color={isDarkMode ? Colors.white : Colors.white}
            styling={{
              ...styles.empDetailsRightView,
              ...CommonStyles.regularFont400Style,
              lineHeight: RfH(22)
            }}>
            {employeeId || ''}
          </CustomText>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <CustomText
            fontSize={14}
            color={isDarkMode ? Colors.white : Colors.white}
            styling={{
              ...styles.empDetailsLeftView,
              ...CommonStyles.regularFont400Style
            }}>
            {localize('hrRequest.designation')}
          </CustomText>
          <CustomText
            fontSize={14}
            color={isDarkMode ? Colors.white : Colors.white}
            styling={{
              ...styles.empDetailsRightView,
              ...CommonStyles.regularFont400Style,
              lineHeight: RfH(22)
            }}>
            {assignmentName || ''}
          </CustomText>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <CustomText
            fontSize={14}
            color={isDarkMode ? Colors.white : Colors.white}
            styling={{
              ...styles.empDetailsLeftView,
              ...CommonStyles.regularFont400Style
            }}>
            {localize('hrRequest.department')}
          </CustomText>
          <CustomText
            fontSize={14}
            color={isDarkMode ? Colors.white : Colors.white}
            styling={{
              ...styles.empDetailsRightView,
              ...CommonStyles.regularFont400Style,
              lineHeight: RfH(22)
            }}>
            {departmentName || ''}
          </CustomText>
        </View>
      </View>
    </View>
  );
};

export default EmployeeDetails;
