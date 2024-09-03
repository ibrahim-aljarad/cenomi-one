import React from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { CustomImage, CustomText } from '../../../../components';
import { Colors, CommonStyles } from '../../../../theme';
import { getImageUrl } from '../../../../utils/helper';
import { RfH, RfW } from '../../../../utils/helpers';

export const ITEM_WIDTH = RfW(104);
export const ITEM_HEIGHT = RfH(136);

type CorporateCommCardProps = {
  item: any;
  index: number;
  readItems: any;
  handleClick: () => void;
  itemHeight?: number;
  itemWidth?: number;
  isHideTitle?: boolean;
  usedFor?: string;
};

export function CorporateCommCard(props: CorporateCommCardProps): JSX.Element {
  const {
    item,
    readItems = [],
    index,
    itemHeight = ITEM_HEIGHT,
    itemWidth = ITEM_WIDTH,
    handleClick,
    isHideTitle = false,
    usedFor
  } = props;

  let isRead = readItems?.includes(item.id);

  if (item?.isViewMoreEnable) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleClick}
        style={[styles.viewMoreContainer, { height: itemHeight, width: itemWidth - 4 }]}>
        <CustomText
          fontSize={14}
          color={Colors.white}
          styling={{ ...CommonStyles.regularFont500Style }}>
          {'View more'}
        </CustomText>
      </TouchableOpacity>
    );
  }

  if (usedFor === 'homePage') {
    return (
      <TouchableOpacity
        key={index}
        style={[styles.sliderCard]}
        onPress={handleClick}
        activeOpacity={0.8}>
        <ImageBackground
          style={{
            height: itemHeight - 4,
            width: itemWidth - 4,
            backgroundColor: Colors.gainsBoro,
            borderRadius: RfW(12)
          }}
          imageStyle={{
            borderRadius: RfW(12),
            overflow: 'hidden'
          }}
          resizeMode={'cover'}
          onError={() => {}}
          onLoadEnd={() => {}}
          onLoadStart={() => {}}
          source={{ uri: getImageUrl(item?.cardImages?.mobileImage?.url) }}>
          {!isHideTitle ? (
            <View style={styles.labelContainer}>
              <CustomText
                fontSize={12}
                color={Colors.white}
                numberOfLines={2}
                styling={CommonStyles.regularFont400Style}>
                {item.title}
              </CustomText>
            </View>
          ) : null}

          <View
            style={{
              ...styles.iconContainer,
              borderColor: !isRead ? Colors.darkPurple : Colors.white
            }}>
            <CustomImage
              image={getImageUrl(item?.sender?.iconUrl?.url)}
              imageWidth={RfW(14)}
              imageHeight={RfW(14)}
              imageResizeMode={'contain'}
              displayLoader={false}
            />
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      key={index}
      style={[styles.sliderCard]}
      onPress={handleClick}
      activeOpacity={0.8}>
      <ImageBackground
        style={{
          height: itemHeight - 4,
          width: itemWidth - 4,
          backgroundColor: Colors.gainsBoro,
          borderRadius: RfW(12)
        }}
        imageStyle={{
          borderRadius: RfW(12),
          overflow: 'hidden'
        }}
        resizeMode={'cover'}
        onError={() => {}}
        onLoadEnd={() => {}}
        onLoadStart={() => {}}
        source={{ uri: getImageUrl(item?.cardImages?.mobileImage?.url) }}>
        <View
          style={{
            ...styles.iconContainer,
            top: RfH(9),
            left: RfW(9),
            borderColor: !isRead ? Colors.darkPurple : Colors.white
          }}>
          <CustomImage
            image={getImageUrl(item?.sender?.iconUrl?.url)}
            imageWidth={RfW(14)}
            imageHeight={RfW(14)}
            imageResizeMode={'contain'}
            displayLoader={false}
          />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  viewMoreContainer: {
    borderColor: Colors.white,
    borderRadius: RfW(12),
    borderWidth: RfH(2),
    justifyContent: 'center',
    alignItems: 'center'
  },
  sliderCard: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: RfW(6),
    overflow: 'hidden',
    borderColor: '#4F4D6B',
    borderRadius: RfW(12),
    borderWidth: RfH(1.5)
  },
  labelContainer: {
    backgroundColor: '#4F4D6B',
    bottom: -1,
    width: '102%',
    height: RfH(40),
    position: 'absolute',
    justifyContent: 'center',
    borderBottomLeftRadius: RfW(12),
    borderBottomRightRadius: RfW(12),
    paddingHorizontal: RfW(7)
  },
  iconContainer: {
    position: 'absolute',
    top: RfH(9),
    right: RfW(9),
    height: RfW(20),
    width: RfW(20),
    borderRadius: RfW(10),
    backgroundColor: 'white',
    borderWidth: RfH(2),
    alignItems: 'center',
    justifyContent: 'center'
  }
});

// export default CorporateCommCard;
