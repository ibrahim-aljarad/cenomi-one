import { ScrollView, TouchableOpacity, View } from 'react-native';
import { CustomImage, CustomText } from '..';
import { Colors, CommonStyles, Images } from '../../theme';
import { RfH, RfW } from '../../utils/helpers';

import { map } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getApprovalTasksCountSelector } from '../../containers/Approvals/redux/selectors';
import { isDarkModeSelector } from '../../containers/redux/selectors';
import { isRTL } from '../../locale/utils';
import CustomBadge from '../CustomBadge';
import CustomBottomSheet from '../CustomBottomSheet';
import styles from './styles';

const countStateSelector = createStructuredSelector({
  approvalTasksCountData: getApprovalTasksCountSelector,
  isDarkMode: isDarkModeSelector
});

function ApprovalRequestModal(props: any) {
  const { isVisible, onRequestClose, onClick, module } = props;
  const { approvalTasksCountData, isDarkMode } = useSelector(countStateSelector);

  const getTaskCountBySubModule = (submodule) => {
    if (approvalTasksCountData?.data?.length > 0) {
      const item = approvalTasksCountData?.data?.find((item) => {
        return submodule === item?.subModule;
      });

      return item?.count;
    }
    return 0;
  };

  const mainView = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={true}
        scrollEnabled={true}
        overScrollMode={'never'}
        style={[
          styles.scrollView,
          {
            backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.modalForegroundColor
          }
        ]}>
        <View
          style={{
            // flex: 1,
            paddingHorizontal: RfW(22),
            paddingBottom: RfH(30)
          }}>
          {map(module.subModules, (item, key) => (
            <TouchableOpacity
              key={key}
              style={{
                alignItems: 'center',
                paddingVertical: RfH(22),
                borderBottomWidth: RfH(0.8),
                borderBottomColor: Colors.grayBorder,
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
              activeOpacity={0.5}
              onPress={() => onClick(item)}>
              <CustomText
                fontSize={16}
                color={isDarkMode ? Colors.white : Colors.white}
                styling={{
                  width: '80%',
                  ...CommonStyles.regularFontStyle
                }}>
                {item.name}
              </CustomText>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {getTaskCountBySubModule(item.name) > 0 ? (
                  <View style={{ right: RfW(35), bottom: RfH(2) }}>
                    <CustomBadge
                      count={getTaskCountBySubModule(item.name)}
                      isDarkMode={isDarkMode}
                    />
                  </View>
                ) : (
                  <></>
                )}
                <CustomImage
                  image={isRTL() ? Images.arrowLeft : Images.arrowRight}
                  imageWidth={RfW(18)}
                  imageHeight={RfH(16)}
                  imageResizeMode={'contain'}
                  styling={{ marginLeft: RfW(5) }}
                  tintColor={isDarkMode ? Colors.white : Colors.white}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  };

  return (
    <CustomBottomSheet title={module?.name} isVisible={isVisible} onRequestClose={onRequestClose}>
      {mainView()}
    </CustomBottomSheet>
  );
}

ApprovalRequestModal.propTypes = {
  isVisible: PropTypes.bool,
  onRequestClose: PropTypes.func,
  onClick: PropTypes.func,
  module: PropTypes.object
};
ApprovalRequestModal.defaultProps = {
  isVisible: false,
  onRequestClose: null,
  onClick: null,
  module: {}
};
export default ApprovalRequestModal;
