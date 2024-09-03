import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavigationRouteNames from '../../routes/ScreenNames';
import { LOCAL_STORAGE_DATA_KEY } from '../../utils/constants';
import { storeData } from '../../utils/helpers';
import { Colors } from '../../theme';
import { createStructuredSelector } from 'reselect';
import { isDarkModeSelector } from '../redux/selectors';
import { useSelector } from 'react-redux';
import TutorialSlider from './TutorialSlider';
import WrapperContainer from '../../components/WrapperContainer';
import { getColorWithOpacity } from '../../utils/helper';

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector
});

function TutorialScreen(): JSX.Element {
  const navigation = useNavigation();

  const { isDarkMode } = useSelector(stateSelector);

  const onDone = () => {
    storeData(LOCAL_STORAGE_DATA_KEY.TUTORIAL_SHOWN, JSON.stringify(true));
    navigation.reset({
      index: 0,
      routes: [{ name: NavigationRouteNames.LOGIN_HOME as never }]
    });
  };

  return (
    <WrapperContainer>
      <View
        style={[
          styles.mainContainer,
          { backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.transparent }
        ]}>
        <TutorialSlider
          isDarkMode={isDarkMode}
          bulletsSelectedColor={isDarkMode ? Colors.white : Colors.white}
          bulletsUnSelectedColor={
            isDarkMode ? Colors.ButtonGrey : getColorWithOpacity(Colors.white, 0.5)
          }
          onStarted={onDone}
        />
      </View>
    </WrapperContainer>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  }
});

export default TutorialScreen;
