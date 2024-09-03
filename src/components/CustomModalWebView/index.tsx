import React, { useState } from 'react';
import { Modal, Platform, SafeAreaView, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { WebView } from 'react-native-webview';
import { Colors, Images } from '../../theme';
import { localize } from '../../locale/utils';
import Loader from '../Loader';
import Header from '../Header';
import CustomModal from '../CustomModal';
import HeaderSVG from '../HeaderSVG';
import WrapperContainer from '../WrapperContainer';

function CustomModalWebView(props) {
  const {
    isDarkMode,
    headerText,
    url,
    backButtonHandler,
    onLoadComplete,
    modalVisible,
    onNavigationStateChange,
    subTitle,
    rightButtonVisible,
    rightButtonImage,
    rightIconHeight,
    rightIconWidth,
    rightButtonClickHandler,
    showLoader,
    successModalTitle = '',
    isSuccessModal,
    onRequestActionButton,
    onRequestClose
  } = props;

  const rightButtonClick = () => {
    rightButtonClickHandler(url);
  };
  const [isError, setError] = useState(false);

  return (
    <Modal
      visible={modalVisible}
      animationType={'slide'}
      // backdropOpacity={1}
      transparent={true}
      onRequestClose={() => backButtonHandler()}>
      <WrapperContainer>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.transparent
          }}>
          <HeaderSVG
            isRightButtonVisible={false}
            isBackButtonVisible={true}
            titleText={headerText || ''}
            titleFont={20}
            onRightButtonClickHandler={() => {}}
            onBackPressHandler={() => backButtonHandler()}
            isRight2BtnVisible={false}
          />
          <WebView
            domStorageEnabled={true}
            javaScriptEnabled={true}
            onNavigationStateChange={onNavigationStateChange}
            renderError={() => {
              setError(true);
              onLoadComplete();
            }}
            onLoad={() => {
              onLoadComplete();
            }}
            renderLoading={() => (
              <Loader isLoading={showLoader} text={localize('components.pleaseWait')} />
            )}
            source={{ uri: url }}
            startInLoadingState={true}
            style={{ backgroundColor: Colors.transparent }}
          />
          {isError && (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text>{localize('common.somethingWentWrong')}</Text>
            </View>
          )}

          {/* {showLoader && Platform.OS === 'android' ? <Loader isLoading={showLoader} /> : <></>} */}
          {isSuccessModal ? (
            <CustomModal
              title={successModalTitle}
              modalVisible={isSuccessModal}
              onRequestClose={() => onRequestClose(false)}
              onRequestActionButton={() => {
                onRequestActionButton();
              }}
            />
          ) : null}
        </SafeAreaView>
      </WrapperContainer>
    </Modal>
  );
}

CustomModalWebView.propTypes = {
  headerText: PropTypes.string,
  url: PropTypes.string,
  backButtonHandler: PropTypes.func,
  onLoadComplete: PropTypes.func,
  modalVisible: PropTypes.bool,
  onNavigationStateChange: PropTypes.func,
  subTitle: PropTypes.string,
  rightButtonImage: PropTypes.any,
  rightIconWidth: PropTypes.any,
  rightIconHeight: PropTypes.any,
  rightButtonClickHandler: PropTypes.func,
  showLoader: PropTypes.bool,
  rightButtonVisible: PropTypes.bool,
  isDarkMode: PropTypes.bool
};

CustomModalWebView.defaultProps = {
  headerText: '',
  url: '',
  modalVisible: false,
  rightButtonVisible: false,
  rightButtonImage: Images.whatsApp,
  rightIconWidth: null,
  rightIconHeight: null,
  showLoader: false,
  backButtonHandler: null,
  onLoadComplete: () => {},
  rightButtonClickHandler: null,
  isDarkMode: false
};

export default CustomModalWebView;
