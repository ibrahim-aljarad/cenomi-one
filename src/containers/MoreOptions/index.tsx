import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import { RfH, RfW } from "../../utils/helper";
import {
  getFeatueModuleDataInfo,
  getUserConfigData,
} from "../../utils/helpers";

import { Colors } from "../../theme";
import { BorderRadius } from "../../theme/sizes";
import { CONFIG_CONSTANT } from "../../utils/constants";
// import styles from './styles';
import { useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { HeaderSVG } from "../../components";
import CustomPopupModal from "../../components/CustomPopupModal";
import WrapperContainer from "../../components/WrapperContainer";
import { localize } from "../../locale/utils";
import NavigationRouteNames from "../../routes/ScreenNames";
import { getFeatureModuleDataSelector } from "../Home/redux/selectors";
import { getMyProfileDetailsSelector } from "../LoginHome/redux/selectors";
import MenuListComponent from "../Profile/MenuListComponent";
import { isDarkModeSelector } from "../redux/selectors";

const stateSelector = createStructuredSelector({
  isDarkMode: isDarkModeSelector,
  featureModuleData: getFeatureModuleDataSelector,
  myProfileDetails: getMyProfileDetailsSelector,
});
const MoreOptions = () => {
  const navigation = useNavigation();
  const { isDarkMode, featureModuleData, myProfileDetails } =
    useSelector(stateSelector);
  const isFocused = useIsFocused();

  const [isShowComingSoonModal, setisShowComingSoonModal] = useState(false);

  let menuList = [];
  if (
    getUserConfigData(
      myProfileDetails?.config?.config,
      CONFIG_CONSTANT?.EVENTS,
      featureModuleData
    )
  ) {
    menuList = [
      ...menuList,
      {
        name: `Events`,
        routeName: NavigationRouteNames.EVENT_LIST,
        featureName: "events",
      },
    ];
  }

  // if (
  //   getUserConfigData(
  //     myProfileDetails?.config?.config,
  //     CONFIG_CONSTANT?.DOCUMENTS,
  //     featureModuleData
  //   )
  // ) {
  //   menuList = [
  //     ...menuList,
  //     {
  //       name: `Documents`,
  //       routeName: NavigationRouteNames.DOCUMENTS,
  //       featureName: 'documents'
  //     }
  //   ];
  // }

  if (
    getUserConfigData(
      myProfileDetails?.config?.config,
      CONFIG_CONSTANT?.OFFERS,
      featureModuleData
    )
  ) {
    menuList = [
      ...menuList,
      {
        name: localize("home.benefits"),
        routeName: NavigationRouteNames.CLIENTBENEFITS,
        featureName: "offers",
      },
    ];
  }

  if (
    getUserConfigData(
      myProfileDetails?.config?.config,
      CONFIG_CONSTANT?.NEWS,
      featureModuleData
    )
  ) {
    menuList = [
      ...menuList,
      {
        name: localize("home.news"),
        routeName: NavigationRouteNames.NEWS,
        featureName: "news",
      },
    ];
  }

  if (
    getUserConfigData(
      myProfileDetails?.config?.config,
      CONFIG_CONSTANT?.CORPORATE_COMMUNICATION,
      featureModuleData
    )
  ) {
    menuList = [
      ...menuList,
      {
        name: localize("home.corporateCommunication"),
        routeName: NavigationRouteNames.CORPORATECOMMUNICATIONLIST,
        featureName: "corporate_communication",
      },
    ];
  }

  if (
    getUserConfigData(
      myProfileDetails?.config?.config,
      CONFIG_CONSTANT?.CALENDAR,
      featureModuleData
    )
  ) {
    menuList = [
      ...menuList,
      {
        name: localize("home.attendance"),
        routeName: NavigationRouteNames.CALENDAR,
        featureName: "calendar",
      },
    ];
  }

  if (
    getUserConfigData(
      myProfileDetails?.config?.config,
      CONFIG_CONSTANT?.SEND_WISHES,
      featureModuleData
    )
  ) {
    menuList = [
      ...menuList,
      {
        name: localize("home.sendWishes"),
        routeName: NavigationRouteNames.SENDWISHES,
        featureName: "send_wishes",
      },
    ];
  }

  // if (
  //   getUserConfigData(
  //     myProfileDetails?.config?.config,
  //     CONFIG_CONSTANT?.KUDOS,
  //     featureModuleData
  //   )
  // ) {
  //   menuList = [
  //     ...menuList,
  //     {
  //       name: localize("home.kudos"),
  //       routeName: NavigationRouteNames.KUDOS,
  //       featureName: "kudos",
  //     },
  //   ];
  // }

  if (
    getUserConfigData(
      myProfileDetails?.config?.config,
      CONFIG_CONSTANT?.ANALYTICS,
      featureModuleData
    )
  ) {
    menuList = [
      ...menuList,
      {
        name: localize("home.analytics"),
        routeName: NavigationRouteNames.ANALYTICS,
        featureName: "analytics",
      },
    ];
  }


//   if (
//     getUserConfigData(
//       myProfileDetails?.config?.config,
//       CONFIG_CONSTANT?.CALENDAR,
//       featureModuleData
//     )
//   ) {
//     menuList = [
//       ...menuList,
//       {
//         name: localize("home.discrepancy"),
//         routeName: NavigationRouteNames.DISCREPANCY_LIST,
//         featureName: "send_wishes",
//       },
//     ];
//   }
  useEffect(() => {
    if (isFocused) {
      try {
      } catch (e) {}
    }
  }, [isFocused]);

  const onClickItems = (routesName, isLive) => {
    // For testing purpose
    // if (routesName === NavigationRouteNames.ORGANISATION) {
    //   navigation.navigate(routesName as never);
    //   return;
    // }

    if (routesName) {
      if (isLive) {
        navigation.navigate(routesName as never, {
          navigateFrom: "moreOption",
        });
        return;
      }
      setisShowComingSoonModal(true);
    }
  };

  const renderMenuListItem = ({ item }) => {
    return (
      <MenuListComponent
        element={{
          ...item,
          icon: getFeatueModuleDataInfo(featureModuleData, item.featureName)
            ?.iconUrl,
        }}
        onClickItems={() => {
          onClickItems(
            item.routeName,
            getFeatueModuleDataInfo(featureModuleData, item.featureName)?.isLive
          );
        }}
      />
    );
  };

  return (
    <WrapperContainer isHideExtraPadding={true}>
      <SafeAreaView
        style={[
          styles.mainContainer,
          {
            backgroundColor: isDarkMode
              ? Colors.darkModeBackground
              : Colors.transparent,
          },
        ]}
      >
        <HeaderSVG
          isBackButtonVisible={false}
          titleText={localize("home.more")}
          titleFont={20}
          titleStyle={{ marginLeft: -RfW(60) }}
        />
        <View
          style={{
            flex: 1,

            backgroundColor: isDarkMode
              ? Colors.darkModeBackground
              : Colors.transparent,
          }}
        >
          <FlatList
            data={menuList}
            keyExtractor={(_, index) => index?.toString()}
            renderItem={renderMenuListItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: RfW(24),
              paddingTop: RfH(15),
              paddingBottom: RfH(15),
            }}
          />
        </View>

        {isShowComingSoonModal && (
          <CustomPopupModal
            isVisible={isShowComingSoonModal}
            messageInfo={{
              title: localize("common.ComingSoon"),
              description: "",
            }}
            pressedPopupButton={() => setisShowComingSoonModal(false)}
            buttonText={localize("common.okay")}
          />
        )}
      </SafeAreaView>
    </WrapperContainer>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  rowContainer: {
    backgroundColor: Colors.white,
    height: RfH(64),
    flexDirection: "row",
    // flex: 1,
    borderRadius: BorderRadius.BR0,
    marginVertical: RfH(6),
    marginHorizontal: RfH(2),
    alignItems: "center",
    justifyContent: "center",
    paddingRight: RfW(16),
    paddingLeft: RfW(8),
  },
  iconbg: {
    // backgroundColor: Colors.voiletLight,
    height: RfH(48),
    width: RfW(48),
    flexDirection: "row",
    borderRadius: BorderRadius.BR0,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MoreOptions;
