import React, { useEffect, useState } from 'react';
import { I18nManager, Platform, StyleSheet, TextInput, View } from 'react-native';
import { Colors, CommonStyles } from '../../theme';
import { BorderRadius } from '../../theme/sizes';
import { RfH, getColorWithOpacity } from '../../utils/helper';
import { alertBox, RfW } from '../../utils/helpers';
import CustomText from '../CustomText';
import { createStructuredSelector } from 'reselect';
import { isDarkModeSelector } from '../../containers/redux/selectors';
import { useSelector } from 'react-redux';
import { localize } from '../../locale/utils';
import { useTheme } from '../../theme/context';

const stateSructure = createStructuredSelector({
  isDarkMode: isDarkModeSelector
});

const CustomEditComment = (props: any) => {
  const {
    value = '',
    label,
    onCommentChange,
    placeholder,
    selectedDate,
    usedForLeaveForm,
    backgroundColor,
    containerStyle = {},
    topRightComponent = null,
    disable = false,
    isHideHederSection = false,
    labelStyle = {},
    textInputStyle = {}
  } = props;

  const { isDarkMode } = useSelector(stateSructure);
  const { useNewStyles } = useTheme();

  const getNewStyles = () => {
    if (useNewStyles) {
        return {
          labelColor: isDarkMode ? Colors.darkModeSubText : Colors.black,
          counterColor: isDarkMode ? Colors.darkModeSubText : Colors.blackCoral,
          inputBgColor: backgroundColor || getColorWithOpacity(Colors.grey, 0.37),
          placeholderColor: Colors.blackCoral,
          textColor: isDarkMode ? Colors.white : Colors.black
        };
      }
      return {
        labelColor: Colors.white,
        counterColor: isDarkMode ? Colors.darkModeSubText : Colors.grayLight,
        inputBgColor: backgroundColor || getColorWithOpacity(Colors.blueBayoux, 0.37),
        placeholderColor: Colors.grayLight,
        textColor: isDarkMode ? Colors.white : Colors.white
      };
  }

  const newStyles = getNewStyles();

  const [commentValue, setCommentValue] = useState(value || '');
  // const [isDarkMode, setisDarkMode] = useState(false);
  const onChangeTextComment = (value) => {
    if (value?.length > 400) {
      alertBox(
        localize('components.characterLimitExceeded'),
        localize('components.characterLimitMsg')
      );
      return;
    }
    setCommentValue(value);
    onCommentChange(value);
  };

  useEffect(() => {
    setCommentValue(value);
  }, [value]);

  return (
    <View
      style={{
        marginTop: RfH(19),
        // marginBottom: RfH(50),
        paddingHorizontal: RfW(24),
        ...containerStyle
      }}>
      {!isHideHederSection ? (
        <>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <CustomText
              fontSize={usedForLeaveForm ? 20 : 12}
              color={
                isDarkMode
                  ? Colors.darkModeSubText
                  : usedForLeaveForm
                  ? Colors.app_black
                  : Colors.grayTwo
              }
              styling={{
                marginBottom: RfH(10),
                color: newStyles.labelColor,
                ...CommonStyles.regularFont400Style
              }}>
              {label}
            </CustomText>

            {topRightComponent ? (
              topRightComponent()
            ) : (
              <CustomText
                fontSize={12}
                color={newStyles.counterColor}
                styling={{
                  marginBottom: RfH(10),
                  ...CommonStyles.regularFontStyle
                }}>
                {commentValue?.length + '/400'}
              </CustomText>
            )}
          </View>

          {usedForLeaveForm ? (
            <View
              style={{
                height: RfH(1),
                marginBottom: RfH(20),
                marginTop: RfH(5),
                backgroundColor: Colors.grayBorder
              }}
            />
          ) : null}
        </>
      ) : null}

      <View
        style={{
          borderWidth: RfH(0),
          borderRadius: BorderRadius.BR10,
          height: RfH(87),
          paddingVertical: Platform.OS === 'ios' ? RfH(8) : RfH(0),
          backgroundColor: newStyles.inputBgColor,
          borderColor: isDarkMode ? Colors.darkModeBorder : Colors.grayLight
        }}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={newStyles.placeholderColor}
          value={commentValue}
          multiline={true}
          style={[
            CommonStyles.inputStyle,
            {
              flex: 1,
              textAlignVertical: 'top',
              color: newStyles.textColor,
              textAlign: I18nManager.isRTL ? 'right' : 'left'
            }
          ]}
          onChangeText={(value) => {
            onChangeTextComment(value);
          }}
          editable={!disable}
        />
      </View>
    </View>
  );
};

export default CustomEditComment;
const commentStyles = StyleSheet.create({
  mainview: {
    height: 40,
    borderBottomWidth: 1,

    borderColor: Colors.grayLight
  },
  dropdownCard: {
    marginTop: 5,
    height: 64,
    backgroundColor: 'white',
    borderRadius: BorderRadius.BR0,
    padding: 12,
    shadowColor: Colors.hexBlack,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2
  },
  icon: {
    marginRight: 5
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textItem: {
    flex: 1,
    fontSize: 16
  },
  placeholderStyle: {
    fontSize: 14,
    color: Colors.grayTwo
  },
  selectedTextStyle: {
    fontSize: 14,
    color: Colors.app_black
  },
  iconStyle: {
    width: 20,
    height: 20
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16
  }
});
