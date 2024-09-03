import React from 'react';
import RenderHtml from 'react-native-render-html';
import { WIDTH } from '../../theme';
import { deviceWidth } from '../../utils/helpers';
import { RfH } from '../../utils/helper';

const CustomRenderHtml = (props: any) => {
  const { source, tagsStyles, ...restProps } = props;
  const htmlSource = {
    html: source //`<div style='text-align:left'>${source}</div>`,
  };

  return (
    <RenderHtml
      contentWidth={deviceWidth() - WIDTH.W16}
      source={htmlSource}
      tagsStyles={{
        ul: {
          paddingLeft: -RfH(20)
        },
        li: {
          marginTop: -RfH(13),
          paddingLeft: RfH(5)
        },
        ...tagsStyles
      }}
      {...restProps}
    />
  );
};

export default CustomRenderHtml;
