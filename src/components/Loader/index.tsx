import React, { memo } from 'react';
import { Modal, View, Platform } from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';
import LottieView from 'lottie-react-native';
import { LOTTIE_JSON_FILES } from '../../utils/constants';
import { Colors } from '../../theme';
import { createStructuredSelector } from 'reselect';
import { isDarkModeSelector } from '../../containers/redux/selectors';
import { useSelector } from 'react-redux';
import { localize } from '../../locale/utils';

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector
});
function Loader(props) {
  const { isLoading } = props;
  const { isDarkMode } = useSelector(stateSelector);
  return (
    <>
      {isLoading ? (
        <>
          <View style={[styles.modalBackground, { backgroundColor: Colors.lightGrey0 }]}>
            <LottieView
              style={styles.lottieView}
              source={
                // isDarkMode ? LOTTIE_JSON_FILES.loaderDarkModeJson : LOTTIE_JSON_FILES.loaderJson
                isDarkMode
                  ? LOTTIE_JSON_FILES.loaderDarkModeJson
                  : LOTTIE_JSON_FILES.loaderDarkModeJson
              }
              resizeMode="contain"
              loop={true}
              autoPlay
            />
          </View>
          {/* {Platform.OS === 'ios' ? (
            <View style={[styles.modalBackground, { backgroundColor: Colors.lightGrey0 }]}>
              <LottieView
                style={styles.lottieView}
                source={
                  isDarkMode ? LOTTIE_JSON_FILES.loaderDarkModeJson : LOTTIE_JSON_FILES.loaderJson
                }
                resizeMode="contain"
                loop={true}
                autoPlay
              />
            </View>
          ) : (
            <Modal
              style={{ zIndex: 99999 }}
              visible={isLoading}
              animationType={'fade'}
              backdropOpacity={1}
              transparent={true}>
            <View style={[styles.modalBackground, { backgroundColor: Colors.lightGrey0 }]}>
              <LottieView
                style={styles.lottieView}
                source={
                  isDarkMode ? LOTTIE_JSON_FILES.loaderDarkModeJson : LOTTIE_JSON_FILES.loaderJson
                }
                resizeMode="contain"
                loop={true}
                autoPlay
              />
            </View>
            </Modal>
          )} */}
        </>
      ) : null}
    </>
  );
}

Loader.propTypes = {
  isLoading: PropTypes.bool,
  text: PropTypes.string
};

Loader.defaultProps = {
  isLoading: false,
  text: localize('components.pleaseWait')
};

export default memo(Loader);
