import React from 'react';
import { SvgUri } from 'react-native-svg';

const CustomSVGImage = (props: any) => {
  const { image, imageWidth, imageHeight } = props || {};
  return <SvgUri width={imageWidth} height={imageHeight} uri={image} />;
};

export default CustomSVGImage;
