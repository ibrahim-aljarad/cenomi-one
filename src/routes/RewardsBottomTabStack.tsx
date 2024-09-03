import { EVENT_NAME, trackEvent } from '../utils/analytics';
import { useDispatch, useSelector } from 'react-redux';

import BottomTabsComponent from '../components/BottomTabsComponent';
import React from 'react';
import { RewardsOCARoutes } from './BottomTabsRoutes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStructuredSelector } from 'reselect';
import { isDarkModeSelector } from '../containers/redux/selectors';
import { isEmpty } from 'lodash';
import { useRoute } from '@react-navigation/native';

const BottomTab = createBottomTabNavigator();

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector
});

const RewardsBottomTabStack = () => {
  const { isDarkMode } = useSelector(stateSelector);

  const route = useRoute();
  let routes = RewardsOCARoutes;
  const dispatch = useDispatch();

  return isEmpty(routes) ? null : (
    <BottomTab.Navigator
      initialRouteName={routes[0]?.name}
      screenOptions={{ headerShown: false }}
      tabBar={(props) => {
        return <BottomTabsComponent {...props} isDarkMode={isDarkMode} showChatGptOption={false} />;
      }}>
      {routes?.map(({ name, component, icon, options, label, IconComponent, uniqueName }) => (
        <BottomTab.Screen
          {...(options && { options })}
          options={{ tabBarLabel: label }}
          component={component}
          initialParams={{
            icon,
            IconComponent,
            uniqueName
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

export default RewardsBottomTabStack;
