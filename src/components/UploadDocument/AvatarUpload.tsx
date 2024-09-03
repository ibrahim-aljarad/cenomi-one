import React, { useState } from 'react';
import { FlatList, Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import { Colors, Images } from '../../theme';
import { RfH, RfW, getColorWithOpacity } from '../../utils/helper';
import CustomImage from '../CustomImage';
import { deviceWidth } from '../../utils/helpers';
import AppPrimaryButton from '../AppPrimaryButton';
import { localize } from '../../locale/utils';
import { createStructuredSelector } from 'reselect';
import { getPublicStaticDataSelector, isDarkModeSelector } from '../../containers/redux/selectors';
import { useSelector } from 'react-redux';

const stateSelector = createStructuredSelector({
  publicStaticData: getPublicStaticDataSelector,
  isDarkMode: isDarkModeSelector
});

const AvatarUpload = (props: any) => {
  const { onPressUploadAvatar } = props || {};

  const { publicStaticData, isDarkMode } = useSelector(stateSelector);

  const imageHeight = (deviceWidth() - RfW(70)) / 3;
  const imageWidth = (deviceWidth() - RfW(70)) / 3;
  const [selectedItem, setSelectedItem] = useState(undefined);

  return (
    <>
      <SafeAreaView
        style={{
          backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.modalForegroundColor,
          // marginBottom: RfH(20),
          flex: 1
        }}>
        <FlatList
          numColumns={3}
          data={publicStaticData?.avatars || []}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const isSelected = selectedItem?.name === item?.name;
            return (
              <View>
                <CustomImage
                  image={item?.url}
                  imageWidth={imageWidth}
                  imageHeight={imageHeight}
                  imageResizeMode={'contain'}
                  styling={{ marginRight: RfW(15), marginBottom: RfH(15) }}
                  submitFunction={() => setSelectedItem(item)}
                />
                {isSelected ? (
                  <View
                    style={{
                      height: imageHeight,
                      width: imageWidth,
                      backgroundColor: 'rgba(119, 22, 255, 0.40)',
                      position: 'absolute',
                      alignItems: 'flex-end'
                    }}>
                    <CustomImage
                      image={Images.tickUploadDoc}
                      imageWidth={30}
                      imageHeight={30}
                      imageResizeMode={'contain'}
                      styling={{ marginRight: RfW(1) }}
                    />
                  </View>
                ) : null}
              </View>
            );
          }}
          contentContainerStyle={{
            paddingHorizontal: RfW(20),
            paddingBottom: RfH(Platform.OS === 'ios' ? 100 : 120)
          }}
        />
      </SafeAreaView>
      <View style={styles.continueContainer}>
        <AppPrimaryButton
          disabled={!selectedItem}
          buttonText={localize('common.upload')}
          onPress={() => onPressUploadAvatar(selectedItem)}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  continueContainer: {
    position: 'absolute',
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: RfW(45),
    bottom: RfH(Platform.OS === 'ios' ? 50 : 30)
  }
});

export default AvatarUpload;
