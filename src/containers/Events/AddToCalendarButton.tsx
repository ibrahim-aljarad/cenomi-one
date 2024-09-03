import moment from 'moment';
import React, { useEffect } from 'react';
import { Linking, PermissionsAndroid, Platform, View } from 'react-native';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import * as Permissions from 'react-native-permissions';
import RNCalendarEvents from 'react-native-calendar-events';
import AppPrimaryButton from '../../components/AppPrimaryButton';
import { useIsFocused } from '@react-navigation/core';
import { alertBox } from '../../utils/helpers';
import { localize } from '../../locale/utils';

const AddToCalendarButton = (props: any) => {
  const { containerStyle = {}, eventData } = props || {};
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      checkPermission();
    }
  }, [isFocused]);

  const eventConfig = {
    startDate: eventData?.startDate ? new Date(eventData?.startDate)?.toISOString() : '',
    endDate: eventData?.endDate ? new Date(eventData?.endDate)?.toISOString() : '',
    location: eventData?.address,
    title: eventData?.title,
    url: eventData?.mapAddress
    // and other options
  };

  const openSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.sendIntent('android.settings.SETTINGS');
    }
  };

  const checkPermission = async () => {
    let status;

    if (Platform?.OS === 'android') {
      const granted = Permissions.RESULTS.GRANTED;

      const writePermission = await Permissions.check(
        Permissions.PERMISSIONS.ANDROID.WRITE_CALENDAR
      );
      const readPermission = await Permissions.check(Permissions.PERMISSIONS.ANDROID.READ_CALENDAR);
      let requestWriteCalendarStatus;
      let requestReadCalendarStatus;

      if (writePermission !== granted) {
        requestWriteCalendarStatus = await Permissions.request(
          Permissions.PERMISSIONS.ANDROID.WRITE_CALENDAR
        );
      }

      if (readPermission !== granted) {
        requestReadCalendarStatus = await Permissions.request(
          Permissions.PERMISSIONS.ANDROID.READ_CALENDAR
        );
      }

      if (requestWriteCalendarStatus === granted && requestReadCalendarStatus === granted) {
        status = granted;
      } else if (readPermission === granted && writePermission === granted) {
        status = granted;
      }
    } else if (Platform?.OS === 'ios') {
      status = await RNCalendarEvents.checkPermissions(false);
      status = await RNCalendarEvents.requestPermissions(true);
    }

    return status;
  };

  const handleOnPressAddToCalendar = async () => {
    const permissionStatus = await checkPermission();
    if (permissionStatus === Permissions.RESULTS.GRANTED) {
      if (Platform.OS === 'android') {
        try {
          AddCalendarEvent.presentEventCreatingDialog(eventConfig)
            .then((eventInfo: { calendarItemIdentifier: string; eventIdentifier: string }) => {
              // handle success - receives an object with `calendarItemIdentifier` and `eventIdentifier` keys, both of type string.
              // These are two different identifiers on iOS.
              // On Android, where they are both equal and represent the event id, also strings.
              // when { action: 'CANCELED' } is returned, the dialog was dismissed
              console.warn(JSON.stringify(eventInfo));
            })
            .catch((error: string) => {
              // handle error such as when user rejected permissions
              console.warn(error);
            });
        } catch (error) {
          console.log('Error adding event to calendar:', error);
        }
      } else {
        // iOS: Requires # of seconds from January 1 2001 of the date you want to open calendar on
        const referenceDate = moment.utc('2001-01-01');
        const secondsSinceRefDateiOS =
          moment.utc(moment(eventData?.startDate).format('YYYY-MM-DD')).unix() -
          referenceDate.unix();
        try {
          // await RNCalendarEvents.checkPermissions(false);
          // await RNCalendarEvents.requestPermissions(true);

          await RNCalendarEvents.saveEvent(eventData?.title, eventConfig);
          Linking.openURL(`calshow:${secondsSinceRefDateiOS}`);
        } catch (error) {
          console.log('error=====>', error);
          return null;
        }
      }
    } else {
      alertBox(
        localize('event.changeCalendarSettings'),
        localize('event.youNeedToAllowCalendarSettings'),
        {
          positiveText: localize('common.settings'),
          cancelable: true,
          negativeText: localize('common.cancel'),
          onPositiveClick: () => openSettings()
        }
      );
    }
  };

  return (
    <View style={{ ...containerStyle }}>
      <AppPrimaryButton
        buttonText={localize('event.addToCalendar')}
        onPress={handleOnPressAddToCalendar}
      />
    </View>
  );
};

export default AddToCalendarButton;
