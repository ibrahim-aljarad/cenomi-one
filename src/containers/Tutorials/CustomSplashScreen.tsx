import { Colors, Images } from '../../theme';
import { Image, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LOCAL_STORAGE_DATA_KEY } from '../../utils/constants';
import NavigationRouteNames from '../../routes/ScreenNames';
import SplashScreen from 'react-native-splash-screen';
import { createStructuredSelector } from 'reselect';
import { getSaveData } from '../../utils/helpers';
import { isDarkModeSelector } from '../redux/selectors';
import { isLoadingSelector } from '../../appContainer/redux/selectors';
import { isLoggedInSelector } from '../LoginHome/redux/selectors';
import { setSplashScreen } from '../../appContainer/redux/actions';
/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigation } from '@react-navigation/native';

const stateStructure = createStructuredSelector({
  isDarkMode: isDarkModeSelector,
  isLoggedInData: isLoggedInSelector,
  isLoading: isLoadingSelector
});

function CustomSplashScreen() {
  const navigation = useNavigation();
  const { isDarkMode, isLoggedInData, isLoading } = useSelector(stateStructure);
  const [showTutorial, setShowTutorial] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    getSaveData(LOCAL_STORAGE_DATA_KEY.TUTORIAL_SHOWN).then((val) => {
      setShowTutorial(val === null ? false : val === 'true');
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
      onDone();
    }, 3000);
  }, [showTutorial]);

  const onDone = () => {
    if (showTutorial === false) {
      navigation.navigate(NavigationRouteNames.TUTORIAL_SCREEN as never);
    } else if (isLoggedInData === false && !isLoading) {
      // navigation.navigate(NavigationRouteNames.EMAIL_LOGIN_PAGE as never);
      // navigation.navigate(NavigationRouteNames.LOGIN_HOME as never);
    }
    dispatch(setSplashScreen.trigger());
  };

  return (
    <View
      style={[
        styles.splashContainer,
        { backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.white }
      ]}>
      <Image
        source={Images.clientLogo}
        width={200}
        height={106}
        tintColor={isDarkMode ? Colors.white : Colors.app_black}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default CustomSplashScreen;
