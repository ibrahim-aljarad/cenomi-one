import PropTypes from 'prop-types';
import React from 'react';
import { Modal, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { RfH, RfW } from '../../../../utils/helpers';
import styles from './styles';

import { capitalize } from 'lodash';
import { CustomImage, CustomText, IconButtonWrapper } from '../../../../components';
import { isRTL } from '../../../../locale/utils';
import { Colors, CommonStyles, Images } from '../../../../theme';
import { BorderRadius } from '../../../../theme/sizes';
import { getColorWithOpacity } from '../../../../utils/helper';

function AttachmentModal(props) {
  const { isVisible, openModal, onClick, attachments, headerText, isDarkMode } = props;

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
          borderRadius: BorderRadius.BR10
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
          color={Colors.white}
          fontSize={20}
          styling={{
            paddingLeft: RfH(4),
            ...CommonStyles.mediumFontStyle
          }}>
          {capitalize(headerText)}
        </CustomText>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={openModal}
          style={{ marginRight: RfW(-12), padding: RfH(12) }}>
          <IconButtonWrapper
            iconWidth={RfH(18)}
            iconHeight={RfH(18)}
            iconImage={isDarkMode ? Images.crossWhite : Images.crossWhite}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <Modal animationType="none" transparent={true} visible={isVisible} onRequestClose={openModal}>
      <TouchableWithoutFeedback>
        <View style={styles.container}>
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
                    backgroundColor: isDarkMode
                      ? Colors.darkModeBackground
                      : Colors.modalForegroundColor
                  }}>
                  {attachments?.map((item, key) => {
                    const splitedMimeType = item?.mimeType?.split('/');

                    const fileTitle =
                      item?.title ||
                      item?.AttachmentName ||
                      item?.attachmentName ||
                      splitedMimeType[1] + ' file';

                    return (
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
                            flexDirection: 'row',
                            alignItems: 'center'
                          }}>
                          <IconButtonWrapper
                            iconWidth={RfH(16)}
                            iconHeight={RfH(16)}
                            iconImage={
                              isDarkMode ? Images.attachmentFileWhite : Images.attachmentFileWhite
                            }
                          />
                          <CustomText
                            fontSize={16}
                            color={isDarkMode ? Colors.white : Colors.white}
                            styling={{
                              width: '80%',
                              marginLeft: RfW(10),
                              ...CommonStyles.regularFontStyle
                            }}>
                            {fileTitle}
                          </CustomText>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          {item?.badgeCount > 0 && (
                            <View
                              style={{
                                width: RfW(22),
                                height: RfW(22),
                                borderRadius: RfW(22) / 2,
                                backgroundColor: Colors.primary,
                                justifyContent: 'center',
                                alignItems: 'center'
                              }}>
                              <CustomText
                                // fontWeight={'bold'}
                                styling={CommonStyles.semiboldFontStyle}
                                fontSize={item.badgeCount.toString().length < 4 ? 12 : 9}
                                numberOfLines={1}
                                color={Colors.white}>
                                {item.badgeCount}
                              </CustomText>
                            </View>
                          )}
                          <CustomImage
                            image={isRTL() ? Images.arrowLeft : Images.arrowRight}
                            imageWidth={RfW(15)}
                            imageHeight={RfW(15)}
                            imageResizeMode={'contain'}
                            styling={{ marginLeft: RfW(5) }}
                            tintColor={isDarkMode ? Colors.white : Colors.white}
                          />
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

AttachmentModal.propTypes = {
  isVisible: PropTypes.bool,
  openModal: PropTypes.func,
  onClick: PropTypes.func,
  headerText: PropTypes.string,
  attachments: PropTypes.array
};
AttachmentModal.defaultProps = {
  isVisible: false,
  openModal: null,
  onClick: null,
  headerText: ''
};
export default AttachmentModal;
