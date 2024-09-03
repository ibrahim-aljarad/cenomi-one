import PropTypes from 'prop-types';
import React, { memo, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ImageStyle,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native';
import { getIconImageStyle } from './style';

import { Colors, HEIGHT, Images, WIDTH } from '../../theme';
import { getImageSource } from '../../utils/helper';
import { isEmpty, isNumber } from 'lodash';
import CustomSVGImage from '../CustomSVGImage';

type CustomImageProps = {
  submitFunction: () => void;
  image: number | string;
  imageHeight: number;
  styling?: ImageStyle;
  imageResizeMode?: any;
  imageWidth: number;
  placeHolderImage?: number;
  containerStyling?: ViewStyle;
  onLoadCompleted?: () => void;
  onGettingError?: () => void;
  tintColor?: string;
  isLoadingIndicator?: boolean;
  sourceObject?: any;
};

function CustomImage(props: CustomImageProps) {
  const {
    submitFunction,
    image,
    imageHeight,
    styling,
    imageResizeMode,
    imageWidth,
    placeHolderImage,
    containerStyling,
    onLoadCompleted,
    onGettingError,
    tintColor,
    isLoadingIndicator,
    sourceObject
  } = props;

  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const imageObject = image ? getImageSource(image) : placeHolderImage;
  const sourceImage = isError ? getImageSource(placeHolderImage!) : imageObject;

  const splitedImage = !isNumber(image) ? image?.split('.') : null;
  const isSvg =
    splitedImage && splitedImage?.length > 0
      ? splitedImage[splitedImage?.length - 1] === 'svg'
      : false;

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={!submitFunction}
        onPress={submitFunction}
        style={[containerStyling, {}]}>
        {loading && isLoadingIndicator && (
          <View
            style={[
              {
                position: 'absolute',
                left: imageWidth / 2 - WIDTH.W10,
                top: imageHeight / 2 - HEIGHT.H10,
                zIndex: 9999
              },
              styling
            ]}>
            <ActivityIndicator color={Colors.primary} />
          </View>
        )}
        {!isSvg ? (
          <Image
            source={!isEmpty(sourceObject) ? sourceObject : sourceImage}
            onError={() => {
              setIsError(true);
              setLoading(false);
              onGettingError && onGettingError();
            }}
            tintColor={tintColor}
            onLoadStart={() => setLoading(true)}
            onLoad={() => {
              setTimeout(() => {
                onLoadCompleted && onLoadCompleted();
                setLoading(false);
              }, 200);
            }}
            onLoadEnd={() => {
              setTimeout(() => {
                onLoadCompleted && onLoadCompleted();
                setLoading(false);
              }, 200);
            }}
            style={StyleSheet.flatten([
              getIconImageStyle(imageHeight, imageWidth),
              styling,
              { resizeMode: imageResizeMode }
            ])}
          />
        ) : (
          <CustomSVGImage image={image} imageHeight={imageHeight} imageWidth={imageWidth} />
        )}
      </TouchableOpacity>
    </View>
  );
}

CustomImage.propTypes = {
  backgroundColor: PropTypes.string,
  containerStyling: PropTypes.object,
  displayLoadingImage: PropTypes.bool,
  imageHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  image: PropTypes.any,
  imageWidth: PropTypes.number,
  imageResizeMode: PropTypes.string,
  placeHolderImage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  styling: PropTypes.any,
  submitFunction: PropTypes.func,
  onLoadCompleted: PropTypes.func,
  sourceObject: PropTypes.object
};

CustomImage.defaultProps = {
  backgroundColor: Colors.black,
  imageHeight: 50,
  imageWidth: 50,
  imageResizeMode: 'contain',
  styling: {},
  image: Images.paintIcon, //change to default
  containerStyling: {},
  submitFunction: null,
  placeHolderImage: '', //change to placeholder
  displayLoader: false,
  onLoadCompleted: null,
  onGettingError: null,
  isLoadingIndicator: false,
  sourceObject: {}
};

export default memo(CustomImage);
