import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import NavigationRouteNames from "../../routes/ScreenNames";

import Analytics from "../Analytics";
import ApprovalsDetails from "../Approvals/ApprovalsDetails";
import ApprovalsListing from "../Approvals/ApprovalsListing";
import AskGpt from "../AskGpt";
import ClientBenefits from "../Benefits";
import BenefitsDetails from "../Benefits/BenefitsDetails";
import BotPress from "../BotPress";
import Calendar from "../Calendar";
import CorporateCommunicationDetails from "../CorporateCommunicationDetails";
import CorporateCommunicationList from "../CorporateCommunicationList";
import Documents from "../Documents";
import DocumentView from "../Documents/DocumentView";
import Events from "../Events";
import EventDetails from "../Events/EventDetails";
import Faq from "../Faq";
import News from "../News";
import Notifications from "../Notifications";
import Organisation from "../Organisation";
import Profile from "../Profile";
import AppSettings from "../Profile/AppSettings";
import ChangeLanguage from "../Profile/ChangeLanguage";
import ChangeTheme from "../Profile/ChangeTheme";
import DigitalCard from "../Profile/DigitalCard";
import NotificationSetting from "../Profile/NotificationSettings";
import SendWishes from "../SendWishes";
import Surveys from "../Surveys";
import SyncProfile from "../SyncProfile";
import DiscrepancyList from "../DiscrepancyList";
import DiscrepancyDetails from "../DiscrepancyDetails";
const Stack = createStackNavigator();

const HomeStack = () => (
  <>
    <Stack.Screen
      name={NavigationRouteNames.DIGITAL_CARD}
      component={DigitalCard}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={NavigationRouteNames.PROFILE}
      component={Profile}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={NavigationRouteNames.APPROVALS_LISTING}
      component={ApprovalsListing}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={NavigationRouteNames.APPROVALS_DETAILS}
      component={ApprovalsDetails}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={NavigationRouteNames.NOTIFICATIONS}
      component={Notifications}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={NavigationRouteNames.FAQ}
      component={Faq}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={NavigationRouteNames.NOTIFICATIONSSETTINGS}
      component={NotificationSetting}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={NavigationRouteNames.APPSSETTINGS}
      component={AppSettings}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name={NavigationRouteNames.CORPORATECOMMUNICATIONDETAILS}
      component={CorporateCommunicationDetails}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name={NavigationRouteNames.CORPORATECOMMUNICATIONLIST}
      component={CorporateCommunicationList}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name={NavigationRouteNames.CLIENTBENEFITSDETAILS}
      component={BenefitsDetails}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name={NavigationRouteNames.CLIENTBENEFITS}
      component={ClientBenefits}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name={NavigationRouteNames.SYNC_PROFILE}
      component={SyncProfile}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name={NavigationRouteNames.CHANGE_THEME}
      component={ChangeTheme}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name={NavigationRouteNames.SENDWISHES}
      component={SendWishes}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name={NavigationRouteNames.CHANGELANGUAGE}
      component={ChangeLanguage}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name={NavigationRouteNames.ANALYTICS}
      component={Analytics}
      options={{ headerShown: false, animationEnabled: false }}
    />

    <Stack.Screen
      name={NavigationRouteNames.ASK_HR}
      component={AskGpt}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name={NavigationRouteNames.CALENDAR}
      component={Calendar}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name={NavigationRouteNames.BOT_PRESS}
      component={BotPress}
      options={{ headerShown: false, animationEnabled: false }}
    />

    <Stack.Screen
      name={NavigationRouteNames.NEWS}
      component={News}
      options={{ headerShown: false, animationEnabled: false }}
    />

    <Stack.Screen
      name={NavigationRouteNames.SURVEYS}
      component={Surveys}
      options={{ headerShown: false, animationEnabled: false }}
    />

    <Stack.Screen
      name={NavigationRouteNames.EVENT_LIST}
      component={Events}
      options={{ headerShown: false, animationEnabled: false }}
    />

    <Stack.Screen
      name={NavigationRouteNames.EVENT_DETAILS}
      component={EventDetails}
      options={{ headerShown: false, animationEnabled: false }}
    />

    <Stack.Screen
      name={NavigationRouteNames.DOCUMENTS}
      component={Documents}
      options={{ headerShown: false, animationEnabled: false }}
    />

    <Stack.Screen
      name={NavigationRouteNames.DOCUMENT_VIEW}
      component={DocumentView}
      options={{ headerShown: false, animationEnabled: false }}
    />

    <Stack.Screen
      name={NavigationRouteNames.ORGANISATION}
      component={Organisation}
      options={{ headerShown: false, animationEnabled: false }}
    />
    
    <Stack.Screen
      name={NavigationRouteNames.DISCREPANCY_LIST}
      component={DiscrepancyList}
      options={{ headerShown: false, animationEnabled: false }}
    />

    <Stack.Screen
      name={NavigationRouteNames.DISCREPANCY_DETAILS}
      component={DiscrepancyDetails}
      options={{ headerShown: false, animationEnabled: false }}
    />
  </>
);

export { HomeStack };
