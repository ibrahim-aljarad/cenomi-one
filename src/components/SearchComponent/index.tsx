import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { I18nManager, Image, Keyboard, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors, HEIGHT, Images, WIDTH } from '../../theme';
import { RfH } from '../../utils/helpers';
import IconButtonWrapper from '../IconButtonWrapper';
import styles from './style';
import { createStructuredSelector } from 'reselect';
import { isDarkModeSelector } from '../../containers/redux/selectors';
import { useSelector } from 'react-redux';
import { RfW, getColorWithOpacity } from '../../utils/helper';
import CustomImage from '../CustomImage';

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector
});

function SearchComponent(props) {
  const { placeholder, onChangeText, value, cancelSearch, styling, keyboardType } = props;
  const { isDarkMode } = useSelector(stateSelector);
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode
            ? Colors.darkModeDisabledColor
            : getColorWithOpacity(Colors.midnightExpress, 0.24)
        },
        styling
      ]}>
      {/* <CustomImage
        image={Images.search}
        imageWidth={RfH(8)}
        imageHeight={RfH(8)}
        styling={{
          height: RfW(28),
          width: RfW(28),
          borderRadius: RfW(15),
          backgroundColor: Colors.darkPurple
        }}
        tintColor={Colors.white}
      /> */}
      <CustomImage
        image={Images.search}
        imageWidth={WIDTH.W16}
        imageHeight={WIDTH.W16}
        containerStyling={{
          height: RfW(28),
          width: RfW(28),
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: HEIGHT.H20,
          marginBottom: HEIGHT.H3,
          backgroundColor: Colors.darkPurple
        }}
        tintColor={isDarkMode ? Colors.white : Colors.white}
      />
      <TextInput
        style={[
          styles.textStyle,
          { color: Colors.white, textAlign: I18nManager.isRTL ? 'right' : 'left' }
        ]}
        underlineColorAndroid="transparent"
        placeholder={placeholder}
        placeholderTextColor={getColorWithOpacity(Colors.white)}
        autoCorrect={false}
        autoCapitalize={'none'}
        keyboardType={keyboardType ?? 'number-pad'}
        autoCompleteType={'off'}
        value={value}
        onBlur={() => {
          Keyboard.dismiss();
        }}
        onChangeText={onChangeText}
        autoFocus={false}
        returnKeyType="done"
        onSubmitEditing={() => {
          Keyboard.dismiss();
        }}
      />
      {!isEmpty(value) && (
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center'
          }}
          activeOpacity={1}
          onPress={() => {
            onChangeText('');
            cancelSearch ? cancelSearch() : true;
          }}>
          <Image source={Images.close_search} style={styles.iconStyle} />
        </TouchableOpacity>
      )}
      {/* {cancelSearch && <TouchableOpacity onPress={()=>{
                onChangeText('');
                cancelSearch();
}
                }>
                <CustomText
                    styling={{ padding: 5 }}
                    fontSize={14}
                    fontWeight="bold"
                    color={Colors.purple}
                >{'CANCEL'}</CustomText>
            </TouchableOpacity>} */}
    </View>
  );
}

SearchComponent.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func,
  cancelSearch: PropTypes.func,
  styling: PropTypes.any,
  keyboardType: PropTypes.string
};

SearchComponent.defaultProps = {
  value: '',
  placeholder: 'Search ...',
  cancelSearch: null
};

export default React.memo(SearchComponent);
