import PropTypes from 'prop-types';
import React from 'react';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { CustomText } from '../../../components';
import { Colors, CommonStyles } from '../../../theme';
import { BorderRadius } from '../../../theme/sizes';
import {
  RfH,
  RfW,
  getColorWithOpacity,
  getDateFormat,
  getImageUrl,
  getTimeFormat
} from '../../../utils/helper';
import styles from './styles';
const ITEM_WIDTH = RfW(327);
const ITEM_HEIGHT = RfH(240);

const EventItem = (props: any) => {
  const { item, onPressItem } = props;

  const imageStyle = {
    width: '100%',
    height: ITEM_HEIGHT
  };

  return (
    <TouchableOpacity
      style={{
        width: ITEM_WIDTH,
        marginTop: RfH(20),
        height: ITEM_HEIGHT, // Set the desired aspect ratio of the view,
        borderRadius: BorderRadius.BR12
      }}
      activeOpacity={0.8}
      onPress={() => onPressItem(item)}>
      <ImageBackground
        style={imageStyle}
        imageStyle={{
          ...imageStyle,
          borderRadius: BorderRadius.BR12
        }}
        resizeMode="cover"
        onError={() => {}}
        onLoadEnd={() => {}}
        onLoadStart={() => {}}
        source={{
          uri: getImageUrl(item?.cardImages?.mobileImage?.url)
        }}>
        <LinearGradient
          style={{ flex: 1, height: RfH(140), borderRadius: BorderRadius.BR12 }}
          locations={[0.5, 1]}
          colors={[
            getColorWithOpacity(Colors.midnightExpress, 0.1),
            getColorWithOpacity(Colors.midnightExpress, 1)
          ]}>
          <View style={styles.titleSubTitleContainer}>
            {item?.subtitle ? (
              <CustomText
                fontSize={12}
                color={Colors.white}
                numberOfLines={1}
                styling={{
                  lineHeight: 14,
                  ...CommonStyles.regularFont500Style,
                  marginLeft: RfW(16),
                  marginBottom: RfH(12)
                }}>
                {item?.subtitle}
              </CustomText>
            ) : null}
            <View style={styles.titleContainer}>
              <CustomText
                fontSize={18}
                color={Colors.darkPurple}
                numberOfLines={2}
                styling={{
                  paddingTop: RfH(8),
                  lineHeight: 21,
                  ...CommonStyles.regularFont500Style
                }}>
                {item?.title}
              </CustomText>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

EventItem.propTypes = {
  item: PropTypes.object,
  onPressItem: PropTypes.func
};
EventItem.defaultProps = {
  item: {},
  onPressItem: null
};
export default EventItem;
