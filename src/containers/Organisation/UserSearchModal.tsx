import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { createStructuredSelector } from 'reselect';
import { isDarkModeSelector } from '../redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { Colors, CommonStyles, Images } from '../../theme';
import { CustomText, IconButtonWrapper, NameWrapper, SearchComponent } from '../../components';
import { RfH, RfW, getColorWithOpacity } from '../../utils/helper';
import { BorderRadius } from '../../theme/sizes';
import { isEmpty } from 'lodash';
import { deviceHeight } from '../../utils/helpers';
import { getUserSearchList } from '../Approvals/redux/actions';
import { getUserSearchListSelector } from '../Approvals/redux/selectors';
import { localize } from '../../locale/utils';

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector,
  userSearchList: getUserSearchListSelector
});

const UserSearchModal = (props: any) => {
  const {
    isVisible,
    onClose,
    modalTitle = localize('organisation.userList'),
    onSelectUser
  } = props || {};

  const dispatch = useDispatch();

  const { isDarkMode, userSearchList } = useSelector(stateSelector);

  const [searchKeyword, setSearchKeyword] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true); // or some other action
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false); // or some other action
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    setUserList([]);
    setSearchKeyword('');
  }, [isVisible]);

  useEffect(() => {
    if (!isEmpty(userSearchList) && searchKeyword.length > 0) {
      setUserList(userSearchList?.data?.results);
    } else {
      setUserList([]);
    }
  }, [userSearchList]);

  useEffect(() => {
    if (!isEmpty(searchKeyword) && searchKeyword.length > 0) {
      dispatch(
        getUserSearchList.trigger({
          autoComplete: true,
          name: searchKeyword
        })
      );
    } else {
      setUserList([]);
    }
  }, [searchKeyword]);

  const onUserSelect = (item) => {
    setSearchKeyword('');
    setUserList([]);
    onSelectUser(item);
  };

  const renderItem = (item) => (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        paddingVertical: RfH(22),
        borderBottomWidth: RfH(1),
        borderBottomColor: isDarkMode ? Colors.darkModeBorder : Colors.grayBorder,
        flexDirection: 'row'
      }}
      activeOpacity={0.4}
      onPress={() => onUserSelect(item)}>
      <NameWrapper
        width={RfW(28)}
        height={RfH(28)}
        fontSize={13}
        name={item.displayName}
        backgroundColor={Colors.grayBorder}
        textStyle={{ ...CommonStyles.mediumFontStyle, color: Colors.app_black }}
      />

      <View
        style={{
          marginLeft: RfW(8),
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
        <View style={{ width: '90%' }}>
          <CustomText
            fontSize={16}
            color={isDarkMode ? Colors.white : Colors.white}
            styling={{ marginTop: RfH(2), ...CommonStyles.regularFont400Style }}>
            {item.displayName}
          </CustomText>
        </View>
        <IconButtonWrapper
          iconImage={isDarkMode ? Images.arrowRightWhite : Images.arrowRight}
          iconWidth={RfW(15)}
          iconHeight={RfH(15)}
          imageResizeMode={'contain'}
        />
      </View>
    </TouchableOpacity>
  );

  const modalHeader = () => (
    <View
      style={[
        styles.header,
        {
          backgroundColor: isDarkMode
            ? Colors.darkModeBackground
            : getColorWithOpacity(Colors.midnightExpress, 0.4)
        }
      ]}>
      <View
        style={{
          width: RfW(50),
          height: RfH(5),
          alignSelf: 'center',
          borderRadius: BorderRadius.BR5,
          backgroundColor: Colors.silverColor
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: RfH(25)
        }}>
        <CustomText
          color={isDarkMode ? Colors.white : Colors.white}
          fontSize={20}
          styling={CommonStyles.mediumFontStyle}>
          {modalTitle}
        </CustomText>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={onClose}
          style={{ marginRight: RfW(-12), padding: RfH(12) }}>
          <IconButtonWrapper
            iconWidth={RfH(18)}
            iconHeight={RfH(18)}
            iconImage={isDarkMode ? Images.crossWhite : Images.crossWhite}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const mainView = () => (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View
        style={[
          styles.innerView,
          {
            backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.transparent
          }
        ]}>
        {modalHeader()}
        <View
          style={{
            flex: 1,
            backgroundColor: isDarkMode
              ? Colors.darkModeBackground
              : getColorWithOpacity(Colors.midnightExpress, 0.4)
          }}>
          <>
            <SearchComponent
              placeholder="Search"
              value={searchKeyword}
              onChangeText={(text) => setSearchKeyword(text)}
              styling={{
                backgroundColor: isDarkMode
                  ? Colors.darkModeDisabledColor
                  : getColorWithOpacity(Colors.white, 0.24)
              }}
              keyboardType={'default'}
            />
            <View
              style={{
                flex: 1,
                paddingHorizontal: RfW(24)
              }}>
              <FlatList
                data={userList || []}
                renderItem={({ item }) => renderItem(item)}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                style={{
                  //   minHeight: RfH(250),
                  height: deviceHeight() - RfH(250)
                  // maxHeight: isKeyboardVisible
                  //   ? deviceHeight() - deviceHeight() / 1.2
                  //   : deviceHeight() - deviceHeight() / 3,
                }}
                ListFooterComponent={() => (
                  <View
                    style={{
                      height: isKeyboardVisible && Platform.OS === 'ios' ? RfH(320) : RfH(50)
                    }}
                  />
                )}
              />
              {/* <ScrollView style={{height:RfH(250)}} showsVerticalScrollIndicator={false}>*/}

              {/* </ScrollView>*/}
            </View>
          </>
        </View>
      </View>
    </View>
  );

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible} onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.select({ android: 'height', ios: 'padding' })}
        enabled>
        <View style={styles.container}>{mainView()}</View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    margin: 0,
    flex: 1,
    backgroundColor: Colors.containerBackgroundColor // Colors.blueTen,
  },
  innerView: {
    // position: 'absolute',
    flex: 1,
    top: RfH(60),
    bottom: 0,
    width: '100%',
    backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadius.BR0,
    borderTopRightRadius: BorderRadius.BR0
  },
  header: {
    paddingTop: RfH(12),
    paddingHorizontal: RfW(24),
    backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadius.BR0,
    borderTopRightRadius: BorderRadius.BR0
  },

  remarkTextView: {
    borderColor: Colors.grayLight,
    borderWidth: RfH(1),
    borderRadius: BorderRadius.BR0,
    height: RfH(87),
    paddingVertical: Platform.OS === 'ios' ? RfH(8) : RfH(0)
  }
});

export default UserSearchModal;
