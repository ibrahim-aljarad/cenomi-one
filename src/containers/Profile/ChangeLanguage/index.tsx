import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Appearance, Pressable, SafeAreaView, StyleSheet, Switch, View } from 'react-native';
import { CustomImage, CustomText, HeaderSVG, Loader } from '../../../components';
import { Colors, CommonStyles, Images } from '../../../theme';
import { RfH, RfW, getColorWithOpacity } from '../../../utils/helper';
import styles from '../../Notifications/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setColorTheme } from '../../redux/actions';
import { createStructuredSelector } from 'reselect';
import { isDarkModeSelector } from '../../redux/selectors';
import { storeData } from '../../../utils/helpers';
import { LANGUAGE_KEY, LOCAL_STORAGE_DATA_KEY } from '../../../utils/constants';
import CustomSwitch from '../../../components/CustomSwitch';
import { changeLanguage, localize } from '../../../locale/utils';
import CustomDropDown from '../../../components/CustomDropdown';
import AppPrimaryButton from '../../../components/AppPrimaryButton';
import { getItem } from '../../../utils/storage';
import WrapperContainer from '../../../components/WrapperContainer';

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector
});

const ChangeLanguage = (props: any) => {
  const { isDarkMode } = useSelector(stateSelector);

  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState();

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    const findedItem = languageList?.findIndex((item) => item?.value === getItem(LANGUAGE_KEY));

    if (findedItem >= 0) {
      setSelectedLanguage(getItem(LANGUAGE_KEY));
    } else {
      setSelectedLanguage('en');
    }
  }, [getItem(LANGUAGE_KEY)]);

  const languageList = [
    {
      label: 'English',
      lableInEnglish: 'English',
      value: 'en'
    },
    {
      label: 'عربي',
      lableInEnglish: 'Arabic',
      value: 'ar'
    }
  ];

  const goBack = () => {
    navigation.goBack();
  };

  const handleOnPress = () => {
    changeLanguage(selectedLanguage || 'en');
  };

  return (
    <WrapperContainer>
      <SafeAreaView
        style={{
          ...styles.mainContainer,
          backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.transparent
        }}>
        <View
          style={{
            flex: 1,
            marginTop: RfH(10),
            backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.transparent
          }}>
          <HeaderSVG
            isRightButtonVisible={true}
            isBackButtonVisible={true}
            titleText={localize('profile.chooseLanguage')}
            titleFont={20}
            onRightButtonClickHandler={() => {}}
            onBackPressHandler={goBack}
            isRight2BtnVisible={true}
            onRight2BtnClick={() => {}}
          />

          <View
            style={{
              flex: 1,
              paddingTop: RfH(10)
            }}>
            {languageList?.map((item) => {
              const isSelected = selectedLanguage === item?.value;
              return (
                <Pressable
                  onPress={() => setSelectedLanguage(item?.value)}
                  style={[
                    styles1.listContainer,
                    isSelected ? { borderColor: Colors.primary } : {}
                  ]}>
                  <CustomImage
                    image={
                      isSelected
                        ? Images.checkboxPrimaryActive
                        : isDarkMode
                        ? Images.checkboxPrimaryInactiveWhite
                        : Images.checkboxPrimaryInactiveWhite
                    }
                    imageHeight={RfH(25)}
                    imageWidth={RfH(25)}
                    submitFunction={() => setSelectedLanguage(item?.value)}
                  />
                  <View>
                    <CustomText
                      color={Colors.white}
                      fontSize={20}
                      styling={{ marginLeft: RfW(15) }}>
                      {item?.label}
                    </CustomText>
                    <CustomText
                      fontSize={15}
                      color={getColorWithOpacity(Colors.white, 0.5)}
                      styling={{ marginLeft: RfW(15) }}>
                      {item?.lableInEnglish}
                    </CustomText>
                  </View>
                </Pressable>
              );
            })}
          </View>
          <View style={{ paddingHorizontal: RfW(32), marginBottom: RfH(20) }}>
            <AppPrimaryButton buttonText={localize('common.apply')} onPress={handleOnPress} />
          </View>
        </View>
        <Loader isLoading={isLoading} />
      </SafeAreaView>
    </WrapperContainer>
  );
};

const styles1 = StyleSheet.create({
  listContainer: {
    paddingHorizontal: RfW(15),
    paddingVertical: RfH(15),
    borderWidth: RfH(2),
    borderRadius: RfH(10),
    marginHorizontal: RfW(20),
    marginTop: RfH(15),
    borderColor: Colors.grayBorder,
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default ChangeLanguage;
