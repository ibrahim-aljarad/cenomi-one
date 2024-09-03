import LottieView from 'lottie-react-native';
import React from 'react';
import {
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { localize } from '../../locale/utils';
import { Colors, CommonStyles, FontSize, HEIGHT, Images, WIDTH } from '../../theme';
import { BorderRadius } from '../../theme/sizes';
import { LOTTIE_JSON_FILES } from '../../utils/constants';
import { RfH, RfW } from '../../utils/helper';
import CustomImage from '../CustomImage';
import CustomText from '../CustomText';

type BiometricProps = {
  isFaceIdEnable: boolean;
  biometricModelVisible: boolean;
  cancelButtonClick: () => void;
  biometricEnableButtonClick: () => void;
  isDarkMode: boolean;
};

function Biometric(props: BiometricProps) {
  const {
    isFaceIdEnable,
    biometricModelVisible,
    cancelButtonClick,
    biometricEnableButtonClick,
    isDarkMode
  } = props;

  function getBiometricButtonText() {
    if (Platform.OS === 'ios') {
      if (isFaceIdEnable) {
        return localize('biometric.enableFaceID');
      } else {
        return localize('biometric.enableTouchID');
      }
    } else {
      return localize('biometric.enableBiometric');
    }
  }

  function getBiometricDescriptionText() {
    if (Platform.OS === 'ios') {
      if (isFaceIdEnable) {
        return localize('biometric.faceIdDescription');
      } else {
        return localize('biometric.touchIdDescription');
      }
    } else {
      return localize('biometric.biometricDescription');
    }
  }

  function getLottieJSONFile() {
    // if (Platform.OS === 'ios') {
    if (isFaceIdEnable) {
      return LOTTIE_JSON_FILES.faceId;
    } else {
      return LOTTIE_JSON_FILES.touchId;
    }
    // } else {
    //   return LOTTIE_JSON_FILES.lock;
    // }
  }

  return (
    <Modal visible={biometricModelVisible} transparent={true}>
      <ScrollView
        style={[
          styles.container,
          { backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.white }
        ]}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.primaryContainerColor
          }}>
          <View style={{ marginTop: RfH(87), paddingHorizontal: WIDTH.W36 }}>
            <CustomText
              fontSize={20}
              styling={{
                ...CommonStyles.regularFont500Style,
                lineHeight: RfH(30),
                textAlign: 'center'
              }}>
              {getBiometricButtonText()}
            </CustomText>
            <CustomText
              fontSize={14}
              styling={{
                ...CommonStyles.regularFont400Style,
                lineHeight: RfH(24),
                paddingTop: RfH(25),
                textAlign: 'center'
              }}>
              {localize('biometric.permission')}
            </CustomText>
          </View>
          {/* {isFaceIdEnable ? ( */}
          <CustomImage
            image={isFaceIdEnable ? Images.faceID : Images.touchID}
            imageHeight={HEIGHT.H228}
            imageWidth={HEIGHT.H228}
            styling={styles.faceIDImageView}
          />
          {/* ) : (
          <LottieView
            style={styles.touchImageView}
            source={getLottieJSONFile()}
            resizeMode="contain"
            loop={true}
            autoPlay
          />
        )} */}
          <View style={styles.descriptionContainer}>
            <CustomText
              fontSize={14}
              styling={{
                ...CommonStyles.regularFont400Style,
                lineHeight: RfH(24),
                textAlign: 'center'
              }}>
              {getBiometricDescriptionText()}
            </CustomText>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={biometricEnableButtonClick}
              activeOpacity={0.5}
              style={styles.enableButton}>
              <Text style={[styles.buttonTextStyle, CommonStyles.regularFont400Style]}>
                {localize('biometric.enableBiometricC')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={cancelButtonClick}
              activeOpacity={0.5}
              style={[
                styles.laterButton,
                { borderColor: isDarkMode ? Colors.white : Colors.app_black }
              ]}>
              <CustomText
                fontSize={14}
                styling={{
                  ...CommonStyles.regularFont400Style,
                  lineHeight: RfH(17),
                  textAlign: 'center'
                }}>
                {localize('biometric.cancel')}
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  textStyle: {
    fontSize: FontSize[20],
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.app_black
  },
  textStyle1: {
    fontSize: FontSize[14],
    lineHeight: 24,
    textAlign: 'center',
    color: Colors.app_black,
    marginTop: HEIGHT.H30
  },
  textStyle2: {
    fontSize: FontSize[14],
    textAlign: 'center',
    lineHeight: 24,
    color: Colors.app_black
  },
  buttonTextStyle: {
    fontSize: FontSize[14],
    letterSpacing: 0,
    textAlign: 'left',
    color: Colors.white
  },
  buttonContainer: {
    flex: 1,
    paddingBottom: HEIGHT.H20
  },
  enableButton: {
    marginHorizontal: WIDTH.W32,
    height: HEIGHT.H50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.BR0,
    backgroundColor: Colors.app_black,
    marginTop: HEIGHT.H30
  },
  laterButton: {
    marginTop: HEIGHT.H16,
    marginHorizontal: WIDTH.W32,
    height: HEIGHT.H50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.BR0,
    borderColor: Colors.app_black,
    borderWidth: 1
  },
  touchImageView: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: HEIGHT.H50,
    height: RfH(114),
    width: RfW(114)
  },
  faceIDImageView: {
    alignSelf: 'center',
    marginTop: HEIGHT.H50
  },
  descriptionContainer: {
    marginTop: HEIGHT.H72,
    paddingHorizontal: WIDTH.W40
  }
});

export default Biometric;
