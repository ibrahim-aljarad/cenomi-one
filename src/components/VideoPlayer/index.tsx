import { useFocusEffect } from '@react-navigation/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { BackHandler, Modal, Platform, SafeAreaView, View } from 'react-native';
import Orientation from 'react-native-orientation';
import Video from 'react-native-video';
import { Loader } from '..';
import { Colors } from '../../theme';
import { deviceHeight, deviceWidth } from '../../utils/helpers';
import Header from '../Header';
import styles from './styles';

function Mp4VedioPlayer(props) {
  const { vedioUrl, onCloseVideo, isVisible, screenTitle = '' } = props;
  const [loading, setLoading] = useState(false);
  const handleBackPress = () => {
    Orientation.lockToPortrait();
    onCloseVideo();
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

  const renderVideoPlayerView = (safeAreaStyle, isFullscreen) => (
    <SafeAreaView style={safeAreaStyle}>
      <View style={styles.videoPlayerContainer}>
        <Header
          titleText={screenTitle}
          isRightButtonVisible={true}
          isBackButtonVisible={true}
          onBackPressHandler={handleBackPress}
        />
      </View>
      {loading && <Loader isLoading={loading} />}
      <Video
        style={{ flex: 1 }}
        controls={true}
        repeat={true}
        fullscreen={isFullscreen}
        volume={1.0}
        onLoad={() => setLoading(false)}
        onLoadStart={(src) => setLoading(true)}
        onError={(err) => {
          console.error(err);
        }}
        resizeMode="contain"
        source={{ uri: vedioUrl }}
        onBack={onCloseVideo}
      />
    </SafeAreaView>
  );

  return Platform.OS === 'android' ? (
    <>
      {isVisible &&
        renderVideoPlayerView(
          {
            backgroundColor: Colors.white,
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
          },
          false
        )}
    </>
  ) : (
    <View>
      <Modal
        animationIn="slideInDown"
        backdropOpacity={1}
        deviceHeight={deviceHeight()}
        deviceWidth={deviceWidth()}
        isVisible={isVisible}
        onBackButtonPress={onCloseVideo}
        transparent={false}
        propagateSwipe
        style={{ marginHorizontal: 0, marginVertical: 0 }}
        useNativeDriver={true}>
        {renderVideoPlayerView({ flex: 1 }, true)}
        {/* <SafeAreaView>
            <View>
            <Header titleText='Video Player' onBackPressHandler={onCloseVideo} />
        {renderVideoPlayerView({ flex: 1 }, true)}
            </View>
            </SafeAreaView> */}
      </Modal>
    </View>
  );
}

Mp4VedioPlayer.propTypes = {
  onCloseVideo: PropTypes.func.isRequired,
  vedioUrl: PropTypes.string.isRequired,
  isVisible: PropTypes.bool,
  screenTitle: PropTypes.string
};
export default Mp4VedioPlayer;
