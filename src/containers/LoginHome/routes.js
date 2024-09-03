import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import NavigationRouteNames from '../../routes/ScreenNames';
import Faq from '../Faq';
import { LoginHome } from './index';

const Stack = createStackNavigator();

const LoginRoutes = () => (
  <>
    <Stack.Screen
      name={NavigationRouteNames.LOGIN_HOME}
      component={LoginHome}
      options={{ headerShown: false }}
      initialParams={{ hideTopBar: true, gestureEnabled: false }}
    />

    <Stack.Screen
      name={NavigationRouteNames.FAQ}
      component={Faq}
      options={{ headerShown: false }}
      initialParams={{ hideTopBar: true, gestureEnabled: false }}
    />
  </>
);

export { LoginRoutes };
