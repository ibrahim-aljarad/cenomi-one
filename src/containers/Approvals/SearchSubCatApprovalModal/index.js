import {
  Modal,
  SafeAreaView,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles';
import { RfH, RfW } from '../../../utils/helpers';
import { CustomText, IconWrapper } from '../../../components';
import { Colors, Images, CommonStyles } from '../../../theme';
import { isEmpty } from 'lodash';

function SearchSubCatApprovalModal(props) {
  const [searchText, setSearchText] = useState('');
  const { isVisible, openModal, onClick, modules } = props;
  const [data, setData] = useState([]);
  const [original, setOriginal] = useState([]);

  useEffect(() => {
    setData(modules);
    setOriginal(modules);
    return function cleanup() {
      setData([]);
      setOriginal([]);
      setSearchText('');
    };
  }, [isVisible]);

  const updateSearch = (text) => {
    try {
      if (!isEmpty(text)) {
        const filterData = original.filter(function (item) {
          return item.name.toLowerCase().includes(text.toLowerCase());
        });
        setData(filterData);
      } else {
        setData(original);
      }
      setSearchText(text);
    } catch (error) {
      // handleError(error);
    }
  };

  const mainView = () => (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={styles.innerView}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
          <CustomText fontSize={20} color={Colors.blackFour} styling={CommonStyles.mediumFontStyle}>
            {'Search Approvals'}
          </CustomText>
          <TouchableOpacity activeOpacity={0.75} onPress={openModal} style={{ padding: RfH(5) }}>
            <IconWrapper iconWidth={RfW(16)} iconHeight={RfH(16)} iconImage={Images.crossBlack} />
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.searchContainer,
            {
              backgroundColor: 'rgba(48,47,76,0.05)'
            }
          ]}>
          <IconWrapper iconImage={Images.searchIcon} iconWidth={RfW(16)} iconHeight={RfH(22)} />
          <TextInput
            style={[styles.textStyle, { color: Colors.blackFour }]}
            underlineColorAndroid="transparent"
            placeholder={'Enter keywords'}
            placeholderTextColor={Colors.grayLight}
            autoCorrect={false}
            autoCapitalize={'none'}
            autoCompleteType={'off'}
            value={searchText}
            onChangeText={(search) => updateSearch(search)}
            autoFocus={true}
          />
          {!isEmpty(searchText) && (
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: RfH(5),
                paddingHorizontal: RfW(5)
              }}
              activeOpacity={0.75}
              onPress={() => {
                setSearchText('');
                updateSearch('');
              }}>
              <Image source={Images.clear} />
            </TouchableOpacity>
          )}
        </View>

        <View style={{ flex: 1 }}>
          {data.length > 0 ? (
            <FlatList
              data={data}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  key={index.toString()}
                  style={{
                    alignItems: 'center',
                    paddingVertical: RfH(22),
                    borderBottomWidth: RfH(0.8),
                    borderBottomColor: Colors.grayBorder,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}
                  activeOpacity={0.75}
                  onPress={() => {
                    setTimeout(() => {
                      setData(modules);
                    }, 400);
                    onClick(item);
                  }}>
                  <CustomText
                    fontSize={16}
                    color={Colors.blackFive}
                    styling={{
                      width: '80%',
                      ...CommonStyles.regularFontStyle
                    }}>
                    {item.name}
                  </CustomText>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {item.badgeCount > 0 && (
                      <View
                        style={{
                          width: RfW(22),
                          height: RfW(22),
                          borderRadius: RfW(22) / 2,
                          backgroundColor: Colors.safetyOrange,
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}>
                        <CustomText
                          // fontWeight={'bold'}
                          styling={CommonStyles.semiboldFontStyle}
                          fontSize={item.badgeCount.toString().length < 4 ? 12 : 9}
                          numberOfLines={1}
                          color={Colors.white}>
                          {item.badgeCount}
                        </CustomText>
                      </View>
                    )}
                    <IconWrapper
                      iconImage={Images.arrowRight}
                      iconWidth={RfW(15)}
                      iconHeight={RfH(15)}
                      imageResizeMode={'contain'}
                      styling={{ marginLeft: RfW(5) }}
                    />
                  </View>
                </TouchableOpacity>
              )}
              extraData={modules}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={<View style={{ height: RfH(50) }} />}
              overScrollMode={'never'}
              keyboardShouldPersistTaps="handled"
            />
          ) : (
            <CustomText
              styling={{
                alignSelf: 'center',
                marginTop: RfH(100),
                ...CommonStyles.mediumFontStyle
              }}
              fontSize={16}
              color={Colors.grayOne}>
              {'No approval found'}
            </CustomText>
          )}
        </View>
      </View>
    </View>
  );
  return (
    <SafeAreaView>
      <Modal animationType="fade" transparent={true} visible={isVisible} onRequestClose={openModal}>
        <View
          style={[
            styles.container,
            {
              backgroundColor: Colors.white
            }
          ]}>
          {mainView()}
        </View>
      </Modal>
    </SafeAreaView>
  );
}

SearchSubCatApprovalModal.propTypes = {
  isVisible: PropTypes.bool,
  openModal: PropTypes.func,
  onClick: PropTypes.func,
  modules: PropTypes.any
};
SearchSubCatApprovalModal.defaultProps = {
  isVisible: false,
  openModal: null,
  onClick: null
};
export default SearchSubCatApprovalModal;
