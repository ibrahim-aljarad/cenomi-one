import React from 'react';
import RenderHtml from 'react-native-render-html';
import { WIDTH } from '../../theme';
import { deviceWidth } from '../../utils/helpers';
import { RfH } from '../../utils/helper';

const CustomRenderHtml = (props: any) => {
  const { source, tagsStyles, ...restProps } = props;
  const contentWidth = deviceWidth() - WIDTH.W50;

  const htmlSource = {
    html: source
  };

  const enhancedTagsStyles = {
    img: {
      maxWidth: contentWidth,
      width: contentWidth,
      height: 'auto',
      resizeMode: 'contain',
      marginVertical: RfH(10)
    },
    ...tagsStyles
  };

  const renderersProps = {
    img: {
      enableExperimentalPercentWidth: true,
      computeMaxWidth: (availableWidth: number) => {
        return Math.min(contentWidth, availableWidth);
      }
    }
  };

  return (
    <RenderHtml
      contentWidth={contentWidth}
      source={htmlSource}
      tagsStyles={enhancedTagsStyles}
      renderersProps={renderersProps}
      enableExperimentalMarginCollapsing={true}
      {...restProps}
    />
  );
};

export default CustomRenderHtml;
