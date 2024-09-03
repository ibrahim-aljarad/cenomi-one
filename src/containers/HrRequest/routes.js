import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import NavigationRouteNames from '../../routes/ScreenNames';
import ApplyLeave from './ApplyLeave';
import EducationClaimDetails from './EducationClaimDetails';

import LeaveDetails from './LeaveDetails';
import PayslipDetails from './PayslipDetails';
const Stack = createStackNavigator();

const HrRequestStack = () => (
  <>
    <Stack.Screen
      name={NavigationRouteNames.LEAVEDETAILS}
      component={LeaveDetails}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name={NavigationRouteNames.EDUCATIONCLAIMDETAILS}
      component={EducationClaimDetails}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name={NavigationRouteNames.PAYSLIPDETAILS}
      component={PayslipDetails}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name={NavigationRouteNames.APPLYLEAVE}
      component={ApplyLeave}
      options={{headerShown: false}}
    />
  </>
);

export {HrRequestStack};
