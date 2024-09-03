import { useNavigation } from '@react-navigation/native';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { isLoadingSelector } from '../../appContainer/redux/selectors';
import { CustomImage, CustomText, HeaderSVG, IconButtonWrapper } from '../../components';
import EmptyListComponent from '../../components/EmptyListComponent';
import { NotificationListSkeleton } from '../../components/SkeletonLoader';
import { localize } from '../../locale/utils';
import { Colors, CommonStyles, Images } from '../../theme';
import { EVENT_NAME, trackEvent } from '../../utils/analytics';
import { RfH, RfW, getColorWithOpacity } from '../../utils/helper';
import { isDarkModeSelector } from '../redux/selectors';
import NoticeListItems from './NotificationItem';
import {
  getNotification,
  markallReadNotification,
  resetMarkReadNotificationFlag,
  setNotificationPayload
} from './redux/actions';
import {
  getNotificationSelector,
  isAllReadNotificationSelector,
  isReadNotificationSelector
} from './redux/selectors';
import styles from './styles';
import { setNotificationCount } from '../Home/redux/actions';
import WrapperContainer from '../../components/WrapperContainer';

const stateStructure = createStructuredSelector({
  notification: getNotificationSelector,
  isLoading: isLoadingSelector,
  isReadNotification: isReadNotificationSelector,
  isAllReadNotification: isAllReadNotificationSelector,
  isDarkMode: isDarkModeSelector
});

const Notifications = () => {
  const { notification, isLoading, isReadNotification, isAllReadNotification, isDarkMode } =
    useSelector(stateStructure);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const size = 100000;

  const [notificationList, setNotificationList] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (!isEmpty(notification?.results) && notification?.results?.length > 0) {
      if (page === 1) {
        setNotificationList(notification?.results);
      } else {
        setNotificationList([...notificationList, ...notification?.results]);
      }
    }

    setLoader(false);
  }, [notification]);

  const fetchNotification = ({ page }) => {
    dispatch(getNotification.trigger({ page, size }));
  };

  useEffect(() => {
    trackEvent(EVENT_NAME.SCREEN_NOTIFICATION_LIST);
    setLoader(true);
    fetchNotification({ page });
  }, []);

  useEffect(() => {
    if (isReadNotification) {
      dispatch(resetMarkReadNotificationFlag.trigger());
      fetchNotification({ page: page });
    }
  }, [isReadNotification]);

  useEffect(() => {
    if (isAllReadNotification) {
      dispatch(resetMarkReadNotificationFlag.trigger());

      setPage(1);
      fetchNotification({ page: 1 });
    }
  }, [isAllReadNotification]);

  const isUnreadNotifications = () => {
    const notificationObj = notificationList.find((item) => item?.isRead === false);
    if (notificationObj) {
      return true;
    }

    return false;
  };

  const handleOnclickItem = (item: any) => {
    // const { payload: { action = '', payload = {} } = {}, featureModule, isRead } = item || {};
    // const { id, number } = payload || {};

    item?.isRead === false &&
      dispatch(setNotificationCount.trigger(parseInt(notification?.unreadCount) - 1));

    dispatch(setNotificationPayload.success({ payload: item }));
  };

  const onPressMarkAllAsRead = () => {
    const findedItem = notificationList?.filter((item) => !item?.isRead);
    if (findedItem?.length > 0) {
      dispatch(markallReadNotification.trigger());
    }
  };

  const handleOnEndReached = () => {
    if (parseInt(notificationList?.length) < parseInt(notification?.paginator?.totalCount)) {
      fetchNotification({ page: page + 1 });
      setPage(page + 1);
    }
  };

  const notificationRenderItem = ({ item }) => {
    // const filtereditem = item?.fil
    return <NoticeListItems item={item} isDarkMode={isDarkMode} onPress={handleOnclickItem} />;
  };

  const footerComponent = () => {
    return (
      <View
        style={{
          marginBottom: RfH(50),
          paddingTop: RfH(15),
          alignItems: 'center'
        }}>
        {parseInt(notificationList?.length) === parseInt(notification?.paginator?.totalCount) &&
        page > 1 ? (
          <CustomText color={Colors.grayTwo} styling={{ ...CommonStyles.regularFont400Style }}>
            {localize('notification.noMoreNotification')}
          </CustomText>
        ) : null}
      </View>
    );
  };

  const mainSection = () => {
    if (loader) {
      return <NotificationListSkeleton isDarkMode={isDarkMode} />;
    }
    return (
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.transparent,
          flex: 1
        }}>
        {notificationList?.length > 0 ? (
          <View>
            <View style={styles.item_con}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
                onPress={onPressMarkAllAsRead}>
                <CustomImage
                  image={isUnreadNotifications() ? Images.MarkBlueTick : Images.MarkGrayTick}
                  imageWidth={RfW(24)}
                  imageHeight={RfH(24)}
                  imageResizeMode={'contain'}
                  submitFunction={onPressMarkAllAsRead}
                  tintColor={
                    isUnreadNotifications()
                      ? isDarkMode
                        ? Colors.white
                        : Colors.white
                      : getColorWithOpacity(Colors.white, 0.5)
                  }
                />
                <CustomText
                  fontSize={15}
                  styling={{
                    lineHeight: RfH(20),
                    marginLeft: RfW(4),
                    ...CommonStyles.regularFont400Style,
                    color: isUnreadNotifications()
                      ? Colors.white
                      : getColorWithOpacity(Colors.white, 0.5)
                  }}>
                  {localize('notification.markAllAsRead')}
                </CustomText>
              </TouchableOpacity>
            </View>
            <FlatList
              data={notificationList}
              renderItem={notificationRenderItem}
              keyExtractor={(_, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={null}
              ListFooterComponent={footerComponent}
              onEndReached={handleOnEndReached}
              onEndReachedThreshold={0.2}
              contentContainerStyle={{ paddingBottom: RfH(110) }}
            />
          </View>
        ) : (
          !isLoading && (
            <EmptyListComponent
              errorText={localize('common.NoNotifications')}
              errorSubText={''}
              icon={Images.NoNotification}
            />
          )
        )}
      </View>
    );
  };

  return (
    <WrapperContainer>
      <SafeAreaView
        style={{
          ...styles.mainContainer,
          backgroundColor: isDarkMode ? Colors.darkModeBackground : Colors.transparent
        }}>
        <View
          style={{
            flex: 1,
            paddingTop: RfH(10)
          }}>
          <HeaderSVG
            isBackButtonVisible={true}
            titleText={localize('notification.notifications')}
            titleFont={20}
            onBackPressHandler={() => navigation.goBack()}
          />
          {mainSection()}
        </View>
      </SafeAreaView>
    </WrapperContainer>
  );
};

export default Notifications;
