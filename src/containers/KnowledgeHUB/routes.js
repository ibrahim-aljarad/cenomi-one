import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import NavigationRouteNames from '../../routes/ScreenNames';

import KnowledgeHUB from './index';
import SubcategoryList from './KnowledgehubDocumentsList';
const Stack = createStackNavigator();

const KnowledgeHUBStack = () => (
  <>
    <Stack.Screen
      name={NavigationRouteNames.KNOWLEDGEHUBLIST}
      component={KnowledgeHUB}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name={NavigationRouteNames.KNOWLEDGEHUB_SUBCATEGORYLIST}
      component={SubcategoryList}
      options={{headerShown: false}}
    />
  </>
);

export {KnowledgeHUBStack};
