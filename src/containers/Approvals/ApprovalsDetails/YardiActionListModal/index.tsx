import PropTypes from 'prop-types';
import React from 'react';
import { Modal, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { RfH, RfW } from '../../../../utils/helpers';
import styles from './styles';

import { capitalize, isEmpty, map } from 'lodash';
import { CustomImage, CustomText, IconButtonWrapper } from '../../../../components';
import { Colors, CommonStyles, Images } from '../../../../theme';
import { BorderRadius } from '../../../../theme/sizes';
import { localize } from '../../../../locale/utils';

function YardiActionListModal(props) {
  const { isVisible, onClose, onClick, actionList, headerText, isDarkMode } = props;

  const actionListSection = () => {
    if (!isEmpty(actionList)) {
      return map(actionList, (item, key) => (
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
          <View
            style={{
              flexDirection: 'row'
            }}>
            <CustomText
              fontSize={16}
              color={Colors.blackFive}
              styling={{
                width: '80%',
                paddingLeft: RfW(4),
                ...CommonStyles.regularFontStyle
              }}>
              {item?.Next_Step_Name}
            </CustomText>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <IconButtonWrapper
              iconImage={isDarkMode ? Images.arrowRightWhite : Images.arrowRight}
              iconWidth={RfW(15)}
              iconHeight={RfH(15)}
              imageResizeMode={'contain'}
              styling={{ marginLeft: RfW(5) }}
            />
          </View>
        </TouchableOpacity>
      ));
    } else {
      return (
        <CustomText
          fontSize={16}
          color={Colors.blackFive}
          styling={{
            width: '80%',
            paddingLeft: RfW(4),
            ...CommonStyles.regularFontStyle,
            paddingBottom: RfH(20)
          }}>
          {localize('common.noActionAvailable')}
        </CustomText>
      );
    }
  };

  const modalHeader = () => (
    <View
      style={[
        styles.header,
        {
          backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.primaryContainerColor
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
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: RfH(25)
        }}>
        <CustomText
          color={Colors.blackFour}
          fontSize={20}
          styling={{
            paddingLeft: RfH(4),
            ...CommonStyles.mediumFontStyle
          }}>
          {capitalize(headerText)}
        </CustomText>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={onClose}
          style={{ marginRight: RfW(-12), padding: RfH(12) }}>
          <CustomImage
            imageWidth={RfH(18)}
            imageHeight={RfH(18)}
            image={Images.crossBlack}
            tintColor={isDarkMode ? Colors.white : Colors.black}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const mainView = () => (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <TouchableOpacity activeOpacity={0.7} style={{ flex: 1 }} onPress={onClose} />
      <View
        style={[
          styles.innerView,
          {
            backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.primaryContainerColor
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
              paddingBottom: RfH(30)
            }}>
            {actionListSection()}
          </View>
        </ScrollView>
      </View>
    </View>
  );

  return (
    <Modal animationType="none" transparent={true} visible={isVisible} onRequestClose={onClose}>
      <TouchableWithoutFeedback>
        <View style={styles.container}>{mainView()}</View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

YardiActionListModal.propTypes = {
  isVisible: PropTypes.bool,
  onClose: PropTypes.func,
  onClick: PropTypes.func,
  headerText: PropTypes.string,
  actionList: PropTypes.array,
  isDarkMode: PropTypes.bool
};
YardiActionListModal.defaultProps = {
  isVisible: false,
  onClose: null,
  onClick: null,
  headerText: '',
  isDarkMode: false
};
export default YardiActionListModal;
