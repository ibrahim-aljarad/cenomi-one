import { EVENT_NAME, trackEvent } from '../utils/analytics';
import React, { useEffect } from 'react';
import { isChatWindowVisibleSelector, isDarkModeSelector } from '../containers/redux/selectors';

import BottomTabsComponent from '../components/BottomTabsComponent';
import { OCARoutes } from './BottomTabsRoutes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStructuredSelector } from 'reselect';
import { isEmpty } from 'lodash';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const BottomTab = createBottomTabNavigator();

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector,
  isChatWindowVisible: isChatWindowVisibleSelector
});

const BottomTabStack = () => {
  const { isDarkMode, isChatWindowVisible } = useSelector(stateSelector);

  const route = useRoute();
  let routes = OCARoutes;

  useEffect(() => {
    console.log({ isChatWindowVisible });
  }, [isChatWindowVisible]);

  return isEmpty(routes) ? null : (
    <BottomTab.Navigator
      tabBar={(props) => {
        return isChatWindowVisible ? null : (
          <BottomTabsComponent {...props} isDarkMode={isDarkMode} showChatGptOption={true} />
        );
      }}
      initialRouteName={routes[0]?.name}
      screenOptions={{
        headerShown: false
      }}>
      {routes?.map(({ name, component, icon, options, label, IconComponent }) => (
        <BottomTab.Screen
          {...(options && { options })}
          options={{ tabBarLabel: label }}
          component={component}
          initialParams={{
            icon,
            IconComponent
          }}
          key={name}
          name={name}
          listeners={() => ({
            tabPress: (e) => {
              trackEvent(EVENT_NAME.PRESSED_BOTTOM_TAB + name);
            }
          })}
        />
      ))}
    </BottomTab.Navigator>
  );
};

export default BottomTabStack;
