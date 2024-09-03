import { map } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CustomImage, CustomText, IconButtonWrapper } from '../../components';
import { getApprovalTasksCountSelector } from '../../containers/Approvals/redux/selectors';
import { Colors, CommonStyles, Images } from '../../theme';
import { RfH, RfW } from '../../utils/helpers';
// import CustomBottomSheet from '../CustomBottomSheet';
import { isDarkModeSelector } from '../../containers/redux/selectors';
import { isRTL } from '../../locale/utils';
import { BorderRadius } from '../../theme/sizes';
import CustomBottomSheet from '../../components/CustomBottomSheet';
import UserListComponent from './UserListComponent';
import { getColorWithOpacity } from '../../utils/helper';

const countStateSelector = createStructuredSelector({
  approvalTasksCountData: getApprovalTasksCountSelector,
  isDarkMode: isDarkModeSelector
});

function UserListModal(props: any) {
  const { isVisible, onRequestClose, onPressItem = () => {}, module, token } = props;
  const { approvalTasksCountData, isDarkMode } = useSelector(countStateSelector);

  const renderListItem = ({ item }) => {
    return (
      <UserListComponent
        userToken={token}
        item={item}
        containerStyle={{ marginHorizontal: RfW(20), marginBottom: RfH(15) }}
        onPressItem={() => onPressItem(item?.userId)}
      />
    );
  };

  const mainView = () => {
    return (
      <FlatList
        data={module?.list || []}
        keyExtractor={(_, index) => index?.toString()}
        renderItem={renderListItem}
      />
    );
  };

  return (
    <CustomBottomSheet title={module?.title} isVisible={isVisible} onRequestClose={onRequestClose}>
      <View
        style={{
          paddingBottom: RfH(100),
          backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.modalForegroundColor
        }}>
        {mainView()}
      </View>
    </CustomBottomSheet>
  );
}

UserListModal.propTypes = {
  isVisible: PropTypes.bool,
  onRequestClose: PropTypes.func,
  onClick: PropTypes.func,
  module: PropTypes.object,
  token: PropTypes.string
};
UserListModal.defaultProps = {
  isVisible: false,
  onRequestClose: null,
  onClick: null,
  module: {},
  token: ''
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    margin: 0,
    flex: 1,
    backgroundColor: Colors.containerBackgroundColor // Colors.blueTen,
  },
  innerView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadius.BR0,
    borderTopRightRadius: BorderRadius.BR0
    // paddingBottom: RfH(30)
  },
  header: {
    paddingTop: RfH(12),
    paddingHorizontal: RfW(24),
    backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadius.BR0,
    borderTopRightRadius: BorderRadius.BR0
    // elevation:2,
  },
  scrollView: {
    // flex: 1,
    // maxHeight: deviceHeight() - deviceHeight() / 4,
  }
});

export default UserListModal;
