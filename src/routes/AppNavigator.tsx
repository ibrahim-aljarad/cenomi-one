/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors, FontSize, Fonts, Images } from '../theme';
import { RfH, RfW } from '../utils/helper';
import TabIcon from '../components/TabIcon';
// import DashboardStack from '../containers/routes';
import NavigationRouteNames from './ScreenNames';
import Home from '../containers/Home';
import Analytics from '../containers/Analytics';
import TechRequest from '../containers/HrRequest';
import MoreOptions from '../containers/MoreOptions';
import Approvals from '../containers/Approvals';
import { localize } from '../locale/utils';
import { BorderRadius } from '../theme/sizes';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        headerTitleAlign: 'center',
        //tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.black,
        tabBarInactiveTintColor: Colors.textGrey,
        tabBarStyle: {
          height: RfH(100),
          shadowOffset: {
            width: RfW(12),
            height: RfH(12)
          },
          borderTopLeftRadius: BorderRadius.BR0,
          borderTopRightRadius: BorderRadius.BR0,
          shadowOpacity: 0.6,
          shadowRadius: 16.0,
          elevation: 24,
          position: 'absolute',
          bottom: 0,
          width: '100%',
          zIndex: 0,
          shadowColor: Colors.black
        },
        tabBarItemStyle: {
          marginVertical: Platform.OS === 'ios' ? RfH(2) : RfH(6.25)
        },
        tabBarIconStyle: {
          marginTop: Platform.OS === 'ios' ? RfH(5) : 0
        },
        tabBarLabelStyle: { fontFamily: Fonts.medium, fontSize: FontSize[14] }
      }}>
      <Tab.Screen
        name={NavigationRouteNames.HOME}
        component={Home}
        options={{
          tabBarLabel: `${localize('bottombar.home')}`,
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={Images.menu3} />
        }}
      />
      <Tab.Screen
        name={NavigationRouteNames.APPROVALS}
        component={Approvals}
        options={{
          tabBarLabel: `${localize('bottombar.events')}`,
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={Images.menu2} />
        }}
      />
      {/* <Tab.Screen
        name={NavigationRouteNames.TECH_REQUEST}
        component={TechRequest}
        options={{
          tabBarLabel: `${localize('bottombar.menu2')}`,
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={Images.menu3} />
        }}
      /> */}
      {/* <Tab.Screen
        name={NavigationRouteNames.ANALYTICS}
        component={Analytics}
        options={{
          tabBarLabel: `${localize('bottombar.menu3')}`,
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={Images.menu3} />
        }}
      /> */}
      <Tab.Screen
        name={NavigationRouteNames.MORE_OPTIONS}
        component={MoreOptions}
        options={{
          tabBarLabel: `${localize('bottombar.more')}`,
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={Images.dots3} />
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
