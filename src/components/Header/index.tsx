import { useFocusEffect } from '@react-navigation/core';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { BackHandler, Text, TouchableOpacity, View } from 'react-native';
import { Colors, HEIGHT, Images, WIDTH } from '../../theme';
import { RfH, RfW } from '../../utils/helper';
import IconButtonWrapper from '../IconButtonWrapper';
import styles from './styles';
import CustomImage from '../CustomImage';
import { isRTL } from '../../locale/utils';

function Header(props) {
  const {
    titleText,
    onBackPressHandler,
    isRightButtonVisible,
    onRightButtonClickHandler,
    isBackButtonVisible,
    subTitle,
    rightButtonImage,
    rightIconHeight,
    rightIconWidth,
    screen,
    backGroundColor,
    titleTextColor,
    titleContainerStyle
  } = props;

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        onBackPressHandler();
        return true;
      };
      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
      return () => backHandler.remove();
    }, [])
  );

  return (
    <View style={[styles.headerContainer, { backgroundColor: backGroundColor }]}>
      {isBackButtonVisible && (
        // <IconButtonWrapper
        //   iconImage={backGroundColor === Colors.white && Images.rightArrow}
        //   iconWidth={HEIGHT.H18}
        //   iconHeight={HEIGHT.H18}
        //   containerStyling={{
        //     justifyContent: 'center',
        //     paddingTop: HEIGHT.H10,
        //     paddingBottom: HEIGHT.H14,
        //     paddingLeft: WIDTH.W16
        //   }}
        //   submitFunction={onBackPressHandler}
        // />
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.leftContainer}
          onPress={onBackPressHandler}>
          <CustomImage
            image={isRTL() ? Images.arrowRight : Images.arrowLeft}
            imageHeight={RfW(18)}
            imageWidth={RfH(16)}
            imageResizeMode={'contain'}
            // tintColor={isDarkMode ? Colors.white : Colors.black}
          />
        </TouchableOpacity>
      )}

      <View
        style={[
          {
            flex: 1,
            alignItems: 'center',
            paddingTop: HEIGHT.H10,
            paddingBottom: HEIGHT.H14,
            marginRight: isRightButtonVisible ? RfW(0) : WIDTH.W50,
            marginLeft: isBackButtonVisible ? RfW(0) : WIDTH.W50,
            justifyContent: 'center'
          },
          { ...titleContainerStyle }
        ]}>
        <Text
          style={[
            styles.headerText,
            { color: titleTextColor },
            backGroundColor === Colors.black && { color: Colors.white }
          ]}>
          {titleText}
        </Text>
        {!isEmpty(subTitle) ? <Text style={styles.subTitleText}>{subTitle}</Text> : null}
      </View>
      {isRightButtonVisible && (
        <View style={{ alignItems: 'flex-end' }}>
          <IconButtonWrapper
            iconImage={rightButtonImage}
            iconWidth={rightIconWidth || WIDTH.W24}
            iconHeight={rightIconHeight || HEIGHT.H24}
            containerStyling={{
              alignSelf: 'center',
              paddingTop: HEIGHT.H10,
              paddingBottom: HEIGHT.H14,
              right: WIDTH.W16
            }}
            submitFunction={onRightButtonClickHandler}
          />
        </View>
      )}
      <View />
    </View>
  );
}

Header.propTypes = {
  titleText: PropTypes.string.isRequired,
  isRightButtonVisible: PropTypes.bool,
  isBackButtonVisible: PropTypes.bool,
  onBackPressHandler: PropTypes.func.isRequired,
  rightButtonImage: PropTypes.any,
  rightIconWidth: PropTypes.any,
  rightIconHeight: PropTypes.any,
  onRightButtonClickHandler: PropTypes.func,
  subTitle: PropTypes.string,
  screen: PropTypes.string,
  backGroundColor: PropTypes.any,
  titleTextColor: PropTypes.any,
  titleContainerStyle: PropTypes.any
};

Header.defaultProps = {
  isRightButtonVisible: true,
  isBackButtonVisible: true,
  screen: 'default',
  backGroundColor: Colors.white,
  titleTextColor: Colors.black,
  titleContainerStyle: null,
  rightIconHeight: null,
  rightIconWidth: null
};

export default Header;
