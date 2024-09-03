import React, { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { CustomImage, CustomText, CustomTextInput, HeaderSVG } from '../../components';
import { localize } from '../../locale/utils';
import { Colors, CommonStyles, HEIGHT, Images, WIDTH } from '../../theme';
import { createStructuredSelector } from 'reselect';
import { isDarkModeSelector } from '../redux/selectors';
import { useSelector } from 'react-redux';
import { RfH, RfW } from '../../utils/helper';
import ExampleAndCapabilites from './components/ExampleAndCapabilites';
import ChatConversation from './components/ChatConversation';

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector
});

const AskGpt = () => {
  const { isDarkMode } = useSelector(stateSelector);
  const [text, setText] = useState('');

  const conversationButtonSection = () => {
    return (
      <View
        style={{
          borderWidth: RfH(1),
          padding: RfH(9),
          borderColor: Colors.grayBorder,
          backgroundColor: Colors.white,
          marginHorizontal: RfW(16),
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: RfH(20)
        }}>
        <View style={{ width: '85%' }}>
          <CustomTextInput
            inputwrapperStyle={{ borderBottomWidth: 0 }}
            inputLabelStyle={{ color: Colors.grayTwo }}
            placeholder={'Start Conversation...'}
            textInputStyle={styles.textInputSty}
            value={text}
            onChangeHandler={(value) => setText(value)}
            returnKeyType={'next'}
            autoCapitalize={'none'}
            topMargin={0}
            containerStyle={{ paddingLeft: RfW(10) }}
            multiline
            showClearButton={false}
          />
        </View>
        <Pressable style={{ padding: RfH(2), alignSelf: 'flex-end' }} onPress={() => {}}>
          <CustomImage
            image={Images.sendIcon}
            imageHeight={RfH(40)}
            imageWidth={RfW(40)}
            imageResizeMode={'contain'}
            submitFunction={() => {}}
          />
        </Pressable>
      </View>
    );
  };

  const chatConversationSection = () => {
    return (
      <View style={{ marginHorizontal: RfW(16) }}>
        <CustomText
          fontSize={10}
          styling={{
            ...CommonStyles.regularFont500Style,
            lineHeight: RfH(12),
            textAlign: 'center',
            marginVertical: RfH(36)
          }}>
          {'Today, June 08'}
        </CustomText>
        <ChatConversation />
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        ...styles.mainContainer,
        backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.transparent
      }}>
      <HeaderSVG
        isBackButtonVisible={true}
        isRightButtonVisible={false}
        titleText={localize('gpt.askHr')}
        titleFont={20}
      />
      <ScrollView>
        {/* <ExampleAndCapabilites /> */}
        {chatConversationSection()}
      </ScrollView>
      {conversationButtonSection()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  innerMainContainer: {
    flex: 1,
    paddingBottom: RfH(40)
  },
  borderColor: { width: '100%', height: RfH(1), backgroundColor: Colors.grayBorder },
  textInputSty: {
    fontSize: 14,
    color: Colors.app_black,
    ...CommonStyles.regularFont400Style,
    paddingBottom: -10
  }
});

export default AskGpt;
