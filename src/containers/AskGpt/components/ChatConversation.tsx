import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CustomImage, CustomText } from '../../../components';
import { Colors, CommonStyles, Images } from '../../../theme';
import { RfH, RfW } from '../../../utils/helper';

const ChatConversation = () => {
  return (
    <View>
      <View style={styles.otherChatContainer}>
        <CustomText
          fontSize={14}
          styling={{
            ...CommonStyles.regularFont400Style,
            lineHeight: RfH(20),
            textAlign: 'left'
          }}>
          {
            'Error 2: Unable to fetch responce from ChatGPT API. Please check settings for a valid API key or your Open API'
          }
        </CustomText>
        <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
          <CustomImage
            image={Images.thumbsUpIcon}
            imageHeight={RfH(20)}
            imageWidth={RfW(20)}
            styling={{ marginRight: RfW(9) }}
            tintColor={Colors.primary}
          />
          <CustomImage image={Images.thumbsDownIcon} imageHeight={RfH(20)} imageWidth={RfW(20)} />
        </View>
      </View>

      <View style={styles.selfChatContainer}>
        <CustomText
          fontSize={14}
          styling={{
            ...CommonStyles.regularFont400Style,
            lineHeight: RfH(20),
            textAlign: 'right'
          }}>
          {
            'Error 2: Unable to fetch responce from ChatGPT API. Please check settings for a valid API key or your Open API'
          }
        </CustomText>
      </View>

      <View style={styles.otherChatContainer}>
        <CustomText
          fontSize={14}
          styling={{
            ...CommonStyles.regularFont400Style,
            lineHeight: RfH(20),
            textAlign: 'left'
          }}>
          {
            'Error 2: Unable to fetch responce from ChatGPT API. Please check settings for a valid API key or your Open API'
          }
        </CustomText>
        <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
          <CustomImage
            image={Images.thumbsUpIcon}
            imageHeight={RfH(20)}
            imageWidth={RfW(20)}
            styling={{ marginRight: RfW(9) }}
            tintColor={Colors.primary}
          />
          <CustomImage image={Images.thumbsDownIcon} imageHeight={RfH(20)} imageWidth={RfW(20)} />
        </View>
      </View>

      <View style={styles.selfChatContainer}>
        <CustomText
          fontSize={14}
          styling={{
            ...CommonStyles.regularFont400Style,
            lineHeight: RfH(20),
            textAlign: 'right'
          }}>
          {
            'Error 2: Unable to fetch responce from ChatGPT API. Please check settings for a valid API key or your Open API'
          }
        </CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  //
  selfChatContainer: {
    marginLeft: RfW(80),
    backgroundColor: 'rgba(119, 22, 255, 0.1)',
    paddingHorizontal: RfW(16),
    paddingVertical: RfH(12),
    borderTopStartRadius: RfW(12),
    borderTopEndRadius: RfW(12),
    borderBottomStartRadius: RfW(12),
    marginBottom: RfH(24)
  },
  otherChatContainer: {
    marginRight: RfW(80),
    marginBottom: RfH(24)
  }
});

export default ChatConversation;
