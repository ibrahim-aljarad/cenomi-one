import { BackHandler, Modal, Platform, SafeAreaView, Text, View } from 'react-native';

import { useFocusEffect } from '@react-navigation/core';
import PropTypes from 'prop-types';
import React, { memo, useCallback, useEffect, useState } from 'react';
import Orientation from 'react-native-orientation';
import Pdf from 'react-native-pdf';
import Video from 'react-native-video';
import { WebView } from 'react-native-webview';
import YoutubePlayer from 'react-native-youtube-iframe';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { isDarkModeSelector } from '../../containers/redux/selectors';
import { localize } from '../../locale/utils';
import { Colors } from '../../theme';
import {
  DOCUMENTS_CSV,
  DOCUMENTS_DOC,
  DOCUMENTS_DOCX,
  DOCUMENTS_IMAGE,
  DOCUMENTS_JPEG,
  DOCUMENTS_JPG,
  DOCUMENTS_OTHERS,
  DOCUMENTS_PDF,
  DOCUMENTS_PNG,
  DOCUMENTS_VIDEO,
  DOCUMENTS_XLS,
  DOCUMENTS_XLSX
} from '../../utils/constants';
import { downloadFile, getImageUrl } from '../../utils/helper';
import { RfH, deviceHeight, deviceWidth, isValidYouTubeUrl } from '../../utils/helpers';
import CustomImage from '../CustomImage';
import HeaderSVG from '../HeaderSVG';
import Loader from '../Loader';
import styles from './styles';
import WrapperContainer from '../WrapperContainer';

const stateStructure = createStructuredSelector({
  isDarkMode: isDarkModeSelector
});

function DocumentsViewModal(props) {
  const { isVisible, onRequestClose, documentInfo } = props;
  const [isError, setIsError] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isCorrectFileExtension, setIsCorrectFileExtension] = useState(true);

  const { isDarkMode } = useSelector(stateStructure);

  const handleBackPress = () => {
    Orientation.lockToPortrait();

    setTimeout(() => {
      onRequestClose();
    }, 500);

    return true;
  };

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      };
    }, [])
  );

  const loadingFalse = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  };

  const loadingStart = () => {
    setTimeout(() => {
      setIsLoading(true);
    }, 200);
  };

  useEffect(() => {
    if (isVisible) {
      loadingStart();
    }
    if (isCorrectFileExtension === false) {
      loadingFalse();
    }
  }, [isVisible, isCorrectFileExtension]);

  useEffect(() => {
    if (documentInfo?.fileType) {
      const temp = isFileExtentions();
      setIsCorrectFileExtension(temp || false);
    }
  }, [documentInfo?.fileType]);

  useEffect(() => {
    if (isError) {
      loadingFalse();
    }
  }, [isError]);

  const onStateChange = useCallback((state) => {
    if (state === 'ended') {
      setPlaying(false);
      loadingFalse();
    } else if (state === 'unstarted') {
      console.log(state);
      loadingStart();
    } else {
      loadingFalse();
    }
  }, []);

  const renderImageView = () => (
    <View
      style={[
        styles.documentViewContainer,
        { backgroundColor: isDarkMode ? Colors.darkModeButton : Colors.white }
      ]}>
      {/* <ImageBackground
        imageStyle={
          {
            // overflow: 'hidden'
          }
        }
        resizeMode={'cover'}
        onError={() => {}}
        onLoadEnd={() => {}}
        onLoadStart={() => {}}
        source={{
          uri: getImageUrl(url)
        }}
      /> */}
      <CustomImage
        image={''}
        sourceObject={{
          uri: getImageUrl(documentInfo?.url),
          headers: documentInfo?.headers
        }}
        imageHeight={deviceHeight() - RfH(200)}
        imageWidth={deviceWidth()}
        imageResizeMode={'contain'}
        onLoadCompleted={() => loadingFalse()}
        onGettingError={() => {
          loadingFalse();
        }}
        isLoadingIndicator={false}
      />
    </View>
  );

  const renderPdfView = () => (
    <View
      style={{
        // flex: 1,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
        // paddingTop: RfH(Platform.OS === 'ios' ? 100 : 0)
      }}>
      {!isError && (
        <Pdf
          trustAllCerts={false}
          source={{
            uri: getImageUrl(documentInfo?.url),
            headers: documentInfo?.headers
          }}
          onLoadComplete={(numberOfPages, path) => {
            // onLoadComplete(numberOfPages, path);
            loadingFalse();
          }}
          onLoadProgress={() => loadingStart()}
          onError={(error) => {
            // onLoadComplete();
            loadingFalse();
            setIsError(true);
          }}
          style={[styles.pdf, { paddingBottom: RfH(Platform.OS === 'ios' ? 0 : 80) }]}
        />
      )}
      {isError && (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Text>{localize('common.someThingWentWrong')}</Text>
        </View>
      )}
    </View>
  );
  const getYoutubeVedioId = (url) => {
    return url?.split('v=')[1]?.trim();
  };
  const isFileExtentions = () => {
    let type = documentInfo?.url?.split('.');
    const fileExtention = type?.length > 0 ? type[type?.length - 1].toLowerCase() : '';

    if (
      fileExtention === DOCUMENTS_XLS.toLowerCase() ||
      fileExtention === DOCUMENTS_XLSX.toLowerCase() ||
      fileExtention === DOCUMENTS_CSV.toLowerCase() ||
      fileExtention === DOCUMENTS_DOC.toLowerCase() ||
      fileExtention === DOCUMENTS_DOCX.toLowerCase() ||
      fileExtention === DOCUMENTS_IMAGE.toLowerCase() ||
      fileExtention === DOCUMENTS_JPG.toLowerCase() ||
      fileExtention === DOCUMENTS_JPEG.toLowerCase() ||
      fileExtention === DOCUMENTS_PNG.toLowerCase() ||
      fileExtention === DOCUMENTS_PDF.toLowerCase() ||
      fileExtention === DOCUMENTS_VIDEO.toLowerCase()
    ) {
      return true;
    } else {
      return false;
    }
  };

  const renderYoutubeView = () => (
    <View style={styles.documentViewContainer}>
      <YoutubePlayer
        height={RfH(300)}
        play={playing}
        // videoId={'iee2TATGMyI'}
        videoId={getYoutubeVedioId(documentInfo?.url)}
        onChangeState={onStateChange}
        onError={() => {
          loadingFalse();
        }}
      />
    </View>
  );

  function getUrlExtension(url) {
    return url.split(/[#?]/)[0].split('.').pop().trim();
  }

  const renderWebView = () => {
    let finalURL = { uri: getImageUrl(documentInfo?.url) };

    return (
      <View style={styles.documentViewContainer}>
        <WebView
          domStorageEnabled={true}
          javaScriptEnabled={true}
          onNavigationStateChange={onStateChange}
          renderError={(err) => {
            loadingFalse();
            setIsError(true);
          }}
          onLoad={() => {}}
          onLoadStart={() => loadingStart()}
          onLoadEnd={() => loadingFalse()}
          source={finalURL}
          startInLoadingState={true}
        />

        {isError && (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{localize('common.somethingWentWrong')}</Text>
          </View>
        )}
      </View>
    );
  };

  const fileNotSupportedSection = () => {
    if (isLoading) {
      loadingFalse();
    }
    return (
      <View
        style={{
          height: '100%',
          paddingTop: '75%',
          alignItems: 'center',
          backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.white
        }}>
        <Text style={{ color: isDarkMode ? Colors.white : Colors.black }}>
          {localize('components.thisFileCantBePreview')}
        </Text>
      </View>
    );
  };

  const renderOtherFileType = () => {
    if (isCorrectFileExtension) {
      if (Platform.OS === 'android') {
        downloadFile(getImageUrl(documentInfo?.url), 'cenomi-one', true);

        handleBackPress();

        return <></>;
      } else {
        return renderWebView();
      }
    } else {
      setTimeout(() => {
        setIsLoading(true);
      }, 500);
      return (
        <View
          style={{
            height: '100%',
            paddingTop: '75%',
            alignItems: 'center',
            backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.white
          }}>
          <Text style={{ color: isDarkMode ? Colors.white : Colors.black }}>
            {localize('components.thisFileCantBePreview')}
          </Text>
        </View>
      );
    }
  };

  const renderVideoPlayer = (videoUrl) => {
    Orientation.unlockAllOrientations();

    return (
      <Video
        style={{ flex: 1 }}
        controls={true}
        repeat={false}
        volume={1.0}
        rate={1.0}
        onLoad={() => setIsLoading(false)}
        onLoadStart={(src) => {}}
        onProgress={(value) => {}}
        onEnd={() => setIsLoading(false)}
        onError={(err) => {
          console.error(err);
        }}
        resizeMode={'contain'}
        source={{ uri: videoUrl }}
        fullscreenOrientation={'all'}
        fullscreenAutorotate={true}
        fullscreen={true}
      />
    );
  };

  const documentSection = (fileType: any) => {
    switch (fileType?.toLowerCase()) {
      case DOCUMENTS_IMAGE.toLowerCase():
      case DOCUMENTS_JPG.toLowerCase():
      case DOCUMENTS_JPEG.toLowerCase():
      case DOCUMENTS_PNG.toLowerCase():
        return renderImageView();
      case DOCUMENTS_PDF.toLowerCase():
        return renderPdfView();
      case DOCUMENTS_VIDEO.toLowerCase():
        // return isValidYouTubeUrl(documentInfo?.url) ? renderYoutubeView() : renderWebView();
        return isValidYouTubeUrl(documentInfo?.url)
          ? renderYoutubeView()
          : renderVideoPlayer(documentInfo?.url);

      case DOCUMENTS_OTHERS.toLowerCase():
        return renderOtherFileType();
      default:
        return fileNotSupportedSection();
    }
  };

  const mainView = () => (
    <View
      style={{
        justifyContent: 'center',
        flex: 1
      }}>
      {documentSection(documentInfo?.fileType)}
    </View>
  );

  return (
    <Modal
      visible={isVisible}
      animationType={'slide'}
      backdropOpacity={1}
      transparent={true}
      onRequestClose={handleBackPress}>
      <WrapperContainer>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.transparent
          }}>
          <HeaderSVG
            isRightButtonVisible={false}
            isBackButtonVisible={true}
            titleText={documentInfo?.title || ''}
            titleFont={20}
            onRightButtonClickHandler={() => {}}
            onBackPressHandler={handleBackPress}
            isRight2BtnVisible={false}
          />
          {mainView()}
          {isError && (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text>{localize('common.somethingWentWrong')}</Text>
            </View>
          )}

          {isLoading ? <Loader isLoading={isLoading} /> : <></>}
        </SafeAreaView>
      </WrapperContainer>
    </Modal>
  );
}

DocumentsViewModal.propTypes = {
  isVisible: PropTypes.bool,
  onRequestClose: PropTypes.func,
  onClick: PropTypes.func,
  documentInfo: PropTypes.object
};
DocumentsViewModal.defaultProps = {
  isVisible: false,
  onRequestClose: null,
  onClick: null
};
export default memo(DocumentsViewModal);
