import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CustomImage, CustomText } from '../../../components';
import { RfH, RfW } from '../../../utils/helper';
import { Colors, CommonStyles, Images } from '../../../theme';

const ExampleAndCapabilites = () => {
  const exampleList = [
    '"I would like to avail my annual leaves. Please guide me on the process."',
    '“Can you guide me on the resignation process.”',
    '"Is Medical Certificate mandatory when taking sick leave"'
  ];

  const capabalitiesList = [
    'Responds currently to questions on HR Policies and Medical Insurance',
    'Trained to decline inappropriate requests'
  ];

  return (
    <View style={styles.innerMainContainer}>
      <CustomImage
        image={Images.purpleChat}
        imageHeight={RfW(25)}
        imageWidth={RfW(25)}
        imageResizeMode={'contain'}
        containerStyling={{ alignSelf: 'center', marginTop: RfH(42) }}
      />
      <CustomText
        fontSize={14}
        color={'rgba(0, 0, 0, 1)'}
        styling={{
          ...CommonStyles.regularFont400Style,
          lineHeight: RfH(24),
          textAlign: 'center',
          marginTop: RfH(27.5)
        }}>
        {'Your trusted support for any HR queries'}
      </CustomText>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: RfW(32.5),
          marginTop: RfH(36)
        }}>
        <CustomImage
          image={Images.blackBulb}
          imageHeight={RfH(20)}
          imageWidth={RfW(15)}
          imageResizeMode={'contain'}
          containerStyling={{ alignSelf: 'center' }}
        />
        <CustomText
          fontSize={16}
          color={Colors.black}
          styling={{
            ...CommonStyles.regularFont500Style,
            lineHeight: RfH(19.2),
            textAlign: 'center',
            marginLeft: RfW(8)
          }}>
          {'Example'}
        </CustomText>
      </View>
      <View
        style={{
          marginHorizontal: RfW(28),
          backgroundColor: Colors.white,
          marginTop: RfH(16)
        }}>
        {exampleList?.map((item, index) => {
          return (
            <>
              <CustomText
                fontSize={14}
                styling={{
                  ...CommonStyles.regularFont400Style,
                  lineHeight: RfH(24),
                  marginHorizontal: RfW(16),
                  marginVertical: RfH(12)
                }}>
                {item}
              </CustomText>
              {index !== exampleList?.length - 1 ? <View style={styles.borderColor} /> : null}
            </>
          );
        })}
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: RfW(32.5),
          marginTop: RfH(36)
        }}>
        <CustomImage
          image={Images.blackSettings}
          imageHeight={RfH(20)}
          imageWidth={RfW(15)}
          imageResizeMode={'contain'}
          containerStyling={{ alignSelf: 'center' }}
        />
        <CustomText
          fontSize={16}
          color={Colors.black}
          styling={{
            ...CommonStyles.regularFont500Style,
            lineHeight: RfH(19.2),
            textAlign: 'center',
            marginLeft: RfW(8)
          }}>
          {'Capabilities'}
        </CustomText>
      </View>
      <View
        style={{
          marginHorizontal: RfW(28),
          backgroundColor: Colors.white,
          marginTop: RfH(16)
        }}>
        {capabalitiesList?.map((item, index) => {
          return (
            <>
              <CustomText
                fontSize={14}
                styling={{
                  ...CommonStyles.regularFont400Style,
                  lineHeight: RfH(24),
                  marginHorizontal: RfW(16),
                  marginVertical: RfH(12)
                }}>
                {item}
              </CustomText>
              {index !== capabalitiesList?.length - 1 ? <View style={styles.borderColor} /> : null}
            </>
          );
        })}
      </View>
    </View>
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

export default ExampleAndCapabilites;
