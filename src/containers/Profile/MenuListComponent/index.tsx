import { Colors, CommonStyles, Images } from '../../../theme';
import { CustomImage, CustomText } from '../../../components';
import { RfH, RfW, getColorWithOpacity } from '../../../utils/helper';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { BorderRadius } from '../../../theme/sizes';
import CustomSwitch from '../../../components/CustomSwitch';
import PropTypes from 'prop-types';
import React from 'react';
import { createStructuredSelector } from 'reselect';
import { isDarkModeSelector } from '../../redux/selectors';
import { isEmpty } from 'lodash';
import { isRTL } from '../../../locale/utils';
import { useSelector } from 'react-redux';

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector
});

const MenuListComponent = (props: any) => {
  const {
    element,
    isSensorAvailable,
    biometricSwitch,
    onBiometricEnableHandler,
    onClickItems,
    isLeftIconHide,
    secondRightIconComponent,
    isDisable = false,
    noOfLine
  } = props || {};
  const { isDarkMode } = useSelector(stateSelector);

  const secondRightComponent = () => {
    if (secondRightIconComponent) return secondRightIconComponent();
  };

  return (
    <TouchableOpacity
      disabled={isDisable || isEmpty(element.routeName)}
      style={[
        styles.rowContainer,
        {
          backgroundColor: isDarkMode
            ? Colors.darkModeButton
            : getColorWithOpacity(Colors.blueBayoux, 0.37)
        }
      ]}
      activeOpacity={0.8}
      onPress={() => {
        onClickItems(element.routeName);
      }}>
      {!isLeftIconHide ? (
        <View style={styles.iconbg}>
          <CustomImage
            image={element.icon}
            imageWidth={RfW(30)}
            imageHeight={RfW(30)}
            imageResizeMode={'contain'}
            displayLoader={false}
            styling={{
              overflow: 'hidden'
            }}
            tintColor={isDarkMode ? Colors.white : Colors.white}
          />
        </View>
      ) : null}
      <CustomText
        fontSize={16}
        color={isDarkMode ? Colors.white : Colors.white}
        numberOfLines={noOfLine}
        styling={{
          flex: 1,
          marginLeft: RfW(10),
          lineHeight: RfH(22),
          marginRight: RfW(15),
          ...CommonStyles.regularFont400Style
        }}>
        {element.name}
      </CustomText>
      {element.usedFor === 'biometric' ? (
        <CustomSwitch
          disabled={!isSensorAvailable}
          onValueChange={onBiometricEnableHandler}
          value={biometricSwitch}
        />
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {secondRightComponent()}
          <CustomImage
            image={isRTL() ? Images.arrowLeft : Images.arrowRight}
            imageWidth={RfW(11)}
            imageHeight={RfH(17)}
            imageResizeMode={'contain'}
            displayLoader={false}
            styling={{
              overflow: 'hidden'
            }}
            tintColor={isDarkMode ? Colors.white : Colors.white}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

MenuListComponent.propTypes = {
  element: PropTypes.object,
  isSensorAvailable: PropTypes.bool,
  biometricSwitch: PropTypes.any,
  onBiometricEnableHandler: PropTypes.func,
  onClickItems: PropTypes.func,
  isLeftIconHide: PropTypes.bool,
  secondRightIconComponent: PropTypes.func,
  isDisable: PropTypes.bool,
  noOfLine: PropTypes.number
};

MenuListComponent.defaultProps = {
  element: {},
  isSensorAvailable: false,
  biometricSwitch: null,
  onBiometricEnableHandler: null,
  onClickItems: null,
  isLeftIconHide: false,
  secondRightIconComponent: null,
  isDisable: false,
  noOfLine: 2
};

const styles = StyleSheet.create({
  rowContainer: {
    height: RfH(64),
    flexDirection: 'row',
    borderRadius: BorderRadius.BR12,
    marginVertical: RfH(6),
    marginHorizontal: RfH(2),
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: RfW(16),
    paddingLeft: RfW(8)
  },
  iconbg: {
    height: RfH(48),
    width: RfW(48),
    flexDirection: 'row',
    borderRadius: BorderRadius.BR0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default MenuListComponent;
