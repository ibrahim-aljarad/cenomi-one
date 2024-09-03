import { FlatList, Platform, View } from 'react-native';

import PropTypes from 'prop-types';
import React from 'react';
import { Colors } from '../../theme';
import { getColorWithOpacity, getImageUrl } from '../../utils/helper';
import { RfH, RfW } from '../../utils/helpers';
import CustomBottomSheet from '../CustomBottomSheet';
import UsefulAppsItem from '../UsefulAppsItem';
import { createStructuredSelector } from 'reselect';
import { getUsefulAppsSelector } from '../../containers/Home/redux/selectors';
import { useSelector } from 'react-redux';

const stateSelector = createStructuredSelector({
  usefullAppsData: getUsefulAppsSelector
});
function UseFulModal(props: any) {
  const { isVisible, onRequestClose, title, isDarkMode } = props;

  const { usefullAppsData } = useSelector(stateSelector);

  const mainView = () => (
    <View
      style={{
        backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.modalForegroundColor
        // : getColorWithOpacity(Colors.midnightExpress, 0.4)
      }}>
      <FlatList
        key={'_'}
        data={usefullAppsData || []}
        numColumns={3}
        renderItem={({ item }) => (
          <View style={{ width: '33%', paddingHorizontal: RfW(2) }}>
            <UsefulAppsItem
              website={item?.website}
              icon={getImageUrl(item?.logo?.url)}
              text={item.name}
              iconHeight={RfH(48)}
              iconWidth={RfH(48)}
              loading={false}
            />
          </View>
        )}
        style={{ marginTop: RfH(15) }}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <View style={{ height: Platform.OS === 'ios' ? RfH(50) : RfH(100) }} />
        }
        overScrollMode={'never'}
      />
    </View>
  );

  return (
    <CustomBottomSheet title={title || ''} isVisible={isVisible} onRequestClose={onRequestClose}>
      {mainView()}
    </CustomBottomSheet>
  );
}

UseFulModal.propTypes = {
  isVisible: PropTypes.bool,
  onRequestClose: PropTypes.func,
  onClick: PropTypes.func,
  title: PropTypes.string
};
UseFulModal.defaultProps = {
  isVisible: false,
  onRequestClose: null,
  onClick: null,
  title: ''
};
export default UseFulModal;
