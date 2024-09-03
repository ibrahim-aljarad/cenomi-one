import { map } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { Modal, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { CustomImage, CustomText, IconButtonWrapper } from '..';
import { localize } from '../../locale/utils';
import { Colors, CommonStyles, Images } from '../../theme';
import { BorderRadius, HEIGHT } from '../../theme/sizes';
import { RfH, RfW } from '../../utils/helpers';
import AppPrimaryButton from '../AppPrimaryButton';
import styles from './styles';
import { createStructuredSelector } from 'reselect';
import { isDarkModeSelector } from '../../containers/redux/selectors';
import { useSelector } from 'react-redux';
import { getColorWithOpacity } from '../../utils/helper';

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector
});

function ImageSpecificationUploadModal(props) {
  const { isVisible, openModal, onClick, module } = props;

  const { isDarkMode } = useSelector(stateSelector);

  const handleOnSubmit = async () => {};
  const modalHeader = () => (
    <View
      style={[
        styles.header,
        {
          backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.modalForegroundColor
        }
      ]}>
      <View
        style={{
          width: RfW(50),
          height: RfH(5),
          backgroundColor: Colors.silverColor,
          alignSelf: 'center',
          borderRadius: BorderRadius.BR0
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          paddingVertical: RfH(30),
          paddingTop: RfH(55)
        }}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => onClick('')}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: RfW(64),
            width: RfW(64),
            backgroundColor: isDarkMode ? Colors.darkModeButton : Colors.iconBgColor
          }}>
          <CustomImage
            image={Images.profileInstruction}
            imageWidth={HEIGHT.H32}
            imageHeight={HEIGHT.H32}
            tintColor={isDarkMode ? Colors.white : Colors.white}
          />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.5} onPress={openModal} style={styles.crossView}>
          <IconButtonWrapper
            iconWidth={RfH(18)}
            iconHeight={RfH(18)}
            iconImage={isDarkMode ? Images.crossWhite : Images.crossWhite}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.headerText}>
        <CustomText color={Colors.white} fontSize={16} styling={CommonStyles.mediumFontStyle}>
          {localize('imageSpecification.title')}
        </CustomText>
      </View>
    </View>
  );

  const mainView = () => (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <TouchableOpacity activeOpacity={0.7} style={{ flex: 1 }} onPress={openModal} />
      <View
        style={[
          styles.innerView,
          {
            backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.transparent
          }
        ]}>
        {modalHeader()}
        <ScrollView
          showsVerticalScrollIndicator={true}
          scrollEnabled={true}
          overScrollMode={'never'}
          style={styles.scrollView}>
          <View
            style={{
              flex: 1,
              paddingHorizontal: RfW(22),
              paddingBottom: RfH(30),
              backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.modalForegroundColor
            }}>
            {map(module, (item, key) => (
              <TouchableOpacity
                key={key}
                style={{
                  paddingVertical: RfH(5),
                  flexDirection: 'row'
                }}
                activeOpacity={0.5}>
                <View
                  style={[
                    styles.dotView,
                    {
                      backgroundColor: isDarkMode ? Colors.white : Colors.white
                    }
                  ]}
                />
                <CustomText
                  fontSize={14}
                  color={Colors.white}
                  styling={{
                    width: '80%',
                    ...CommonStyles.regularFont400Style
                  }}>
                  {item.title}
                </CustomText>
              </TouchableOpacity>
            ))}
            <View style={styles.continueContainer}>
              <AppPrimaryButton
                buttonText={localize('common.continue')}
                onPress={() => onClick('')}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );

  return (
    <Modal animationType="none" transparent={true} visible={isVisible} onRequestClose={openModal}>
      <TouchableWithoutFeedback>
        <View style={styles.container}>{mainView()}</View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

ImageSpecificationUploadModal.propTypes = {
  isVisible: PropTypes.bool,
  openModal: PropTypes.func,
  onClick: PropTypes.func,
  module: PropTypes.array
};
ImageSpecificationUploadModal.defaultProps = {
  isVisible: false,
  openModal: null,
  onClick: null,
  module: []
};
export default ImageSpecificationUploadModal;
