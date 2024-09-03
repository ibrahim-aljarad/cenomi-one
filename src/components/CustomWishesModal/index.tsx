import React, { useState } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  ScrollView,
  Platform
} from 'react-native';
import { deviceHeight, deviceWidth } from '../../utils/helpers';
import { RfH, RfW } from '../../utils/helper';
import CustomImage from '../CustomImage';
import { Colors, CommonStyles, Images } from '../../theme';
import CustomText from '../CustomText';
import AppPrimaryButton from '../AppPrimaryButton';
import { BorderRadius } from '../../theme/sizes';
import { createStructuredSelector } from 'reselect';
import { isDarkModeSelector } from '../../containers/redux/selectors';
import { useSelector } from 'react-redux';
import SelfBirthday from './SelfBirthday';
import OthersBirthday from './OthersBirthday';
import Anniversary from './Anniversary';
import { wisheshForEnum } from '../../utils/constants';
import OthersAnniversary from './OthersAnniversary';
import NewJoiners from './NewJoiners';

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector
});

const CustomWishesModal = (props: any) => {
  const { modalInfo, onRequestClose, children } = props || {};

  const { isDarkMode } = useSelector(stateSelector);

  const mainSection = () => {
    if (modalInfo?.usedFor === wisheshForEnum.SELFBIRTHDAY) {
      return <SelfBirthday modalInfo={modalInfo} isDarkMode={isDarkMode} />;
    }
    if (modalInfo?.usedFor === wisheshForEnum.OTHERSBIRTHDAY) {
      return <OthersBirthday modalInfo={modalInfo} isDarkMode={isDarkMode} />;
    }
    if (modalInfo?.usedFor === wisheshForEnum.SELFANNIVERSARY) {
      return <Anniversary modalInfo={modalInfo} isDarkMode={isDarkMode} />;
    }
    if (modalInfo?.usedFor === wisheshForEnum.OTHERSANNIVERSARY) {
      return <OthersAnniversary modalInfo={modalInfo} isDarkMode={isDarkMode} />;
    }
    if (modalInfo?.usedFor === wisheshForEnum.NEWJOINER) {
      return <NewJoiners modalInfo={modalInfo} isDarkMode={isDarkMode} />;
    }
    return null;
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalInfo?.isVisible}
        onRequestClose={onRequestClose}>
        <View style={{ ...styles.centeredView }}>
          <View
            style={[
              styles.modalView,
              {
                backgroundColor: isDarkMode
                  ? Colors.darkModeBackground
                  : Colors.primaryContainerColor,
                paddingTop: RfH(Platform.OS === 'ios' ? 35 : 0)
              }
            ]}>
            {children ? (
              children
            ) : (
              <>
                <View style={styles.headerContainer}>
                  <CustomImage
                    image={Images.clientLogoBlack}
                    imageWidth={66}
                    imageHeight={27}
                    imageResizeMode={'contain'}
                    displayLoader={false}
                    containerStyling={{}}
                    tintColor={isDarkMode ? Colors.white : Colors.app_black}
                  />

                  <CustomImage
                    image={isDarkMode ? Images.crossWhite : Images.cross}
                    imageWidth={15}
                    imageHeight={15}
                    imageResizeMode={'contain'}
                    displayLoader={false}
                    containerStyling={{ paddingTop: RfH(6), paddingLeft: RfH(6) }}
                    submitFunction={onRequestClose}
                  />
                </View>
                <View style={styles.bodyContainer}>
                  {mainSection()}
                  {/* <SelfBirthday /> */}
                  {/* <OthersBirthday /> */}
                  {/* <Anniversary /> */}
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: Colors.white
  },
  modalView: {
    width: deviceWidth(),
    height: deviceHeight(),
    backgroundColor: 'white',
    borderRadius: BorderRadius.BR0
  },
  headerContainer: {
    paddingHorizontal: RfW(26),
    paddingTop: RfH(35),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  bodyContainer: {
    paddingTop: RfH(20)
  }
});

export default CustomWishesModal;
