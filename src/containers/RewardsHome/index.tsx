import React from 'react';
import { Platform, ScrollView, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Colors } from '../../theme';
import { RfH, deviceHeight, deviceWidth } from '../../utils/helpers';
import { checkUserDataSelector, getMyProfileDetailsSelector } from '../LoginHome/redux/selectors';
import { isDarkModeSelector } from '../redux/selectors';
import { HomeMainHeader } from './components/HomeMainHeader';
import WebView from 'react-native-webview';
import { getWebViewUrl } from './seriliazer';
import { rewardsBottomTabsName } from '../../utils/constants';

const stateSelector = createStructuredSelector({
  myProfileData: getMyProfileDetailsSelector,
  isDarkMode: isDarkModeSelector,
  checkUserData: checkUserDataSelector
});

const RewardsHome = (props) => {
  const { myProfileData, isDarkMode, checkUserData } = useSelector(stateSelector);

  // newly added code
  const injectedJavaScript = `
    (function(){
      const style = document.createElement('style');
      style.innerHTML = 'app-malls, app-partners {padding-bottom: 40px;} .sticky-banner, app-footer, .profile-navigator, .btn-sign-in {display: none;} ';
      document.head.appendChild(style);
      true;
    })();
    `;

  //   const runfirst = `;
  // let selector = document.queryselector("div#_ngcontent-jym-c185")

  // selector.style.display = "none"

  //       true; // note: this is required, or you'll sometimes get silent failures
  //     `;

  return (
    <View>
      <HomeMainHeader
        profileData={
          checkUserData?.userType === 'guest_user'
            ? { firstName: 'Guest', lastName: 'User' }
            : myProfileData?.profile
        }
      />

      <ScrollView
        overScrollMode={'never'}
        bounces={true}
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.white,
          marginBottom: Platform.OS === 'ios' ? RfH(120) : RfH(60)
        }}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.white
          }}>
          <WebView
            nestedScrollEnabled={true}
            source={{
              uri: getWebViewUrl(props?.route?.params?.uniqueName || rewardsBottomTabsName.MALLS)
            }}
            onMessage={(event) => {}}
            ref={() => {}}
            contentMode={'mobile'}
            injectedJavaScript={injectedJavaScript}
            style={{ flex: 1, height: deviceHeight(), width: deviceWidth() }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default RewardsHome;
