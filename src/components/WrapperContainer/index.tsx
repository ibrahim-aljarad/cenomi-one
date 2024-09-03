import { ImageBackground, Platform } from 'react-native';

import React from 'react';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { isDarkModeSelector } from '../../containers/redux/selectors';
import { Images } from '../../theme';
import { RfH } from '../../utils/helper';
import { deviceHeight } from '../../utils/helpers';

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector
});

const WrapperContainer = (props: any) => {
  const { children, isHideExtraPadding = false } = props || {};
  const { isDarkMode } = useSelector(stateSelector);

  return (
    // <View
    //   style={{
    //     flex: 1,
    //     backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.white
    //   }}>
    //   {children}
    // </View>

    <ImageBackground
      style={{
        height: deviceHeight(),
        paddingBottom: isHideExtraPadding ? RfH(Platform.OS === 'ios' ? 111 : 111) : 0
      }}
      resizeMode="stretch"
      source={Images.backgroundImage}>
      {children}
    </ImageBackground>
  );
};

export default WrapperContainer;
