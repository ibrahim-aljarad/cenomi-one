import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useRef } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import { HeaderSVG } from '../../components';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constant';
import { localize } from '../../locale/utils';
import { Colors, HEIGHT, WIDTH } from '../../theme';
import { botPressonfig } from '../../utils/constants';
import { RfH } from '../../utils/helper';
import BpWidget from './BpWidget';
import WrapperContainer from '../../components/WrapperContainer';

const BotPress = (props) => {
  const { modalVisible, backButtonHandler } = props?.route?.params || {};
  const botpressWebChatRef = useRef();
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      botpressWebChatRef.current?.sendEvent({ type: 'show' });
    }, 700);
  }, []);

  // const sendExampleEvent = () => {
  //   botpressWebChatRef.current?.sendEvent({ type: 'toggle' });
  // };
  // const sendExamplePayload = () => {
  //   botpressWebChatRef.current?.sendPayload({ type: 'text', text: 'hello' });
  // };
  // const changeExampleConfig = () => {
  //   botpressWebChatRef.current?.mergeConfig({ botName: Math.random() });
  // };

  return (
    <SafeAreaView
      style={[
        styles.mainContainer,
        {
          backgroundColor: Colors.transparent,
          height: modalVisible ? SCREEN_HEIGHT : 50,
          width: modalVisible ? SCREEN_WIDTH : 50,
          position: 'absolute',
          zIndex: modalVisible ? 9999 : 1,
          // bottom: Platform.OS === 'ios' ? HEIGHT.H140 : HEIGHT.H120,
          top: modalVisible ? 0 : HEIGHT.H5,
          left: modalVisible ? 0 : WIDTH.W120,
          opacity: modalVisible ? 1 : 0.001
        }
      ]}>
      <WrapperContainer>
        {modalVisible ? (
          <HeaderSVG
            isBackButtonVisible={true}
            titleText={`ChatGPT`}
            titleFont={20}
            // onBackPressHandler={backButtonHandler}
            onBackPressHandler={() => navigation.goBack()}
          />
        ) : null}
        <KeyboardAvoidingView
          enabled={Platform.OS === 'android'} // auto scroll view when user focus inputs, on iOS it is already done by native OS
          behavior="padding"
          keyboardVerticalOffset={10}
          style={{ flex: 1 }}>
          <View style={{ flex: 1, marginBottom: RfH(Platform.OS === 'ios' ? 80 : 20) }}>
            <BpWidget
              ref={botpressWebChatRef}
              botConfig={botPressonfig}
              onMessage={(event) => {
                //   console.log('event from widget', event);
              }}
            />
          </View>
        </KeyboardAvoidingView>
      </WrapperContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.white,
    flex: 1
  }
});

export default BotPress;
