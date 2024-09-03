import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import CustomImage from '../CustomImage';
import { Colors, HEIGHT, Images, WIDTH } from '../../theme';

const SearchIcon = (props: any) => {
  const { isDarkMode, submitFunction, containerStyle = {} } = props;
  return (
    <TouchableOpacity
      style={{ alignItems: 'flex-end', ...containerStyle }}
      onPress={submitFunction}>
      <CustomImage
        image={Images.search}
        imageWidth={WIDTH.W18}
        imageHeight={HEIGHT.H18}
        containerStyling={{
          alignSelf: 'center',
          padding: HEIGHT.H10,
          borderRadius: HEIGHT.H20,
          marginBottom: HEIGHT.H3,
          right: 0,
          backgroundColor: Colors.darkPurple
        }}
        submitFunction={submitFunction}
        tintColor={isDarkMode ? Colors.white : Colors.white}
      />
    </TouchableOpacity>
  );
};

export default SearchIcon;
