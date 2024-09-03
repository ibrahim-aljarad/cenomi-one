import { View } from 'react-native';

import PropTypes from 'prop-types';
import React from 'react';
import { CustomRenderHtml } from '../../../../components';
import CustomBottomSheet from '../../../../components/CustomBottomSheet';
import { Colors, CommonStyles } from '../../../../theme';
import { RfW } from '../../../../utils/helpers';

function TermsandConditionsModal(props: any) {
  const { isVisible, onRequestClose, module, title, isDarkMode } = props;

  const mainView = () => (
    <View
      style={{
        paddingHorizontal: RfW(24),
        backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.modalForegroundColor
      }}>
      <CustomRenderHtml
        source={module}
        tagsStyles={{
          body: {
            whiteSpace: 'normal',
            color: isDarkMode ? Colors.white : Colors.white,
            fontSize: 14,
            lineHeight: 22,
            ...CommonStyles.regularFont400Style
          }
        }}
      />
    </View>
  );

  return (
    <CustomBottomSheet title={title || ''} isVisible={isVisible} onRequestClose={onRequestClose}>
      {mainView()}
    </CustomBottomSheet>
  );
}

TermsandConditionsModal.propTypes = {
  isVisible: PropTypes.bool,
  onRequestClose: PropTypes.func,
  title: PropTypes.string,
  module: PropTypes.object
};
TermsandConditionsModal.defaultProps = {
  isVisible: false,
  onRequestClose: null,
  title: '',
  module: {}
};
export default TermsandConditionsModal;
