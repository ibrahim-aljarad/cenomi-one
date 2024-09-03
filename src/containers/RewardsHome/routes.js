import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NavigationRouteNames from '../../routes/ScreenNames';
import RewardsHome from '.';
import RewardsProfile from './RewardsProfile'
const Stack = createStackNavigator();

const RewardsHomeStack = () => (
  <>
    {/* <Stack.Screen
      name={NavigationRouteNames.DIGITAL_CARD}
      component={DigitalCard}
      options={{ headerShown: false }}
    /> */}
    <Stack.Screen
      name={NavigationRouteNames.REWARDS_MALL}
      component={RewardsHome}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={NavigationRouteNames.REWARDS_PROFILE}
      component={RewardsProfile}
      options={{ headerShown: false }}
    />
  </>
);

export { RewardsHomeStack };
