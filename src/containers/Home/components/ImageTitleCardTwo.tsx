// ImageTitleCardTwo

// renderOCAAdvantages
// renderOffersRequest

import { capitalize } from 'lodash';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CustomImage, CustomText, IconButtonWrapper } from '../../../components';
import { Colors, CommonStyles } from '../../../theme';
import { BorderRadius } from '../../../theme/sizes';
import { RfH, RfW, getImageUrl } from '../../../utils/helper';
import { isDarkModeSelector } from '../../redux/selectors';

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector
});

const ImageTitleCardTwo = (props: any) => {
  const { isDarkMode } = useSelector(stateSelector);

  const { item, index, showIcon, onItemClick } = props;

  return (
    // <Shadow
    //   key={index.toString()}
    //   startColor={isDarkMode ? Colors.darkModeShadow : Colors.lightModeShadow}
    //   offset={[0, RfH(5)]}
    //   paintInside={true}
    //   style={{ width: '100%' }}
    //   containerStyle={{
    //     marginHorizontal: RfW(8),
    //     marginBottom: RfH(20)
    //   }}>
    <TouchableOpacity
      onPress={() => {
        onItemClick();
      }}
      activeOpacity={0.7}
      style={{
        ...styles.offerCardContainerImage,
        backgroundColor: isDarkMode ? Colors.darkModeButton : Colors.white
      }}>
      <CustomImage
        imageHeight={RfH(165)}
        imageWidth={RfW(150)}
        image={getImageUrl(item?.cardImages?.mobileImage?.url)}
        imageResizeMode={'cover'}
        containerStyling={{
          backgroundColor: Colors.white,
          borderRadius: BorderRadius.BR12,
          overflow: 'hidden'
        }}
      />
      {showIcon && (
        <View style={styles.advantageLogoView}>
          {/* <IconButtonWrapper
            iconWidth={RfH(20)}
            iconHeight={RfH(20)}
            iconImage={}
            imageResizeMode={'contain'}
            containerStyling={{
              overflow: 'hidden',
              padding: RfH(2),
              alignSelf: 'center'
            }}
          /> */}
        </View>
      )}
      <View
        style={{
          position: 'absolute',
          // marginLeft: RfW(16),
          // marginRight: RfW(3),
          bottom: 0,
          width: '100%'
          // marginVertical: RfH(16)
        }}>
        <CustomText
          color={Colors.white}
          fontSize={12}
          styling={{
            ...CommonStyles.regularFont500Style,
            paddingLeft: RfW(11),
            paddingBottom: RfH(7)
          }}>
          {item?.count + ' ' + capitalize(item.name)}
        </CustomText>
        <View
          style={{
            backgroundColor: Colors.white,
            margin: RfW(5),
            paddingVertical: RfH(7),
            borderRadius: BorderRadius.BR10
          }}>
          <CustomText
            color={isDarkMode ? Colors.white : Colors.darkPurple}
            fontSize={14}
            numberOfLines={1}
            styling={{
              ...CommonStyles.regularFont400Style,
              textAlign: 'center'
            }}>
            {capitalize(item.name)}
          </CustomText>
        </View>
      </View>
    </TouchableOpacity>
    // </Shadow>
  );
};
const styles = StyleSheet.create({
  offerCardContainerImage: {
    borderRadius: BorderRadius.BR12,
    width: RfW(150),
    height: RfH(165),
    marginHorizontal: RfW(8),
    marginBottom: RfH(20)
  },
  advantageLogoView: {
    position: 'absolute',
    top: RfH(80),
    right: RfW(12),
    zIndex: 1,
    backgroundColor: Colors.white,
    borderColor: Colors.black,
    borderWidth: RfH(1),
    borderRadius: BorderRadius.BR0,
    overflow: 'hidden',
    height: RfH(30),
    width: RfH(30),
    justifyContent: 'center',
    alignItems: 'center',
    padding: RfH(2)
  }
});

export default ImageTitleCardTwo;
