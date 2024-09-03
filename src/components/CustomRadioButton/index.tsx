import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, CommonStyles } from '../../theme';
import { RfH, RfW } from '../../utils/helper';
import CustomText from '../CustomText';
import IconButtonWrapper from '../IconButtonWrapper';
import CustomImage from '../CustomImage';
import { createStructuredSelector } from 'reselect';
import { isDarkModeSelector } from '../../containers/redux/selectors';
import { useSelector } from 'react-redux';

type Props = {
  icon: string;
  labelText: string;
  labelSize: number;
  containerStyle: object;
  onSelect: Function;
};

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector
});

const CustomRadioButton = (props: Props) => {
  const { icon, labelText, containerStyle = {}, onSelect, labelSize = 14 } = props;
  const { isDarkMode } = useSelector(stateSelector);
  const onPress = () => {
    onSelect && onSelect();
  };
  return (
    <TouchableOpacity style={{ ...styles.container, ...containerStyle }} onPress={onPress}>
      {icon ? (
        <CustomImage
          image={icon}
          imageWidth={RfW(20)}
          imageHeight={RfW(20)}
          imageResizeMode={'contain'}
          styling={{ marginRight: RfW(5) }}
          // tintColor={isDarkMode ? Colors.white : Colors.black}
        />
      ) : (
        <></>
      )}
      <CustomText
        fontSize={labelSize}
        styling={{
          ...CommonStyles.regularFont400Style,
          lineHeight: RfH(22),
          color: Colors.grayTwo
        }}>
        {labelText}
      </CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center'
  }
});

export default CustomRadioButton;
